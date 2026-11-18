import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import {
  createExampleChapter,
  createExampleWorld,
  matchThemeFromPrompt,
} from './src/data/exampleWorlds.ts';
import type {
  CharacterTone,
  DreamWorld,
  RealmTheme,
  StoryChapter,
} from './src/types/dream.ts';
import { moderateKidInput } from './src/utils/moderation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function withTransientRetry<T>(fn: () => Promise<T>, maxAttempts = 2): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const isTransient = /503|429|UNAVAILABLE|RESOURCE_EXHAUSTED|high demand/i.test(msg);
      if (!isTransient || attempt === maxAttempts) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
    }
  }
  throw lastErr;
}

const VALID_THEMES: RealmTheme[] = [
  'dinosaur',
  'space',
  'forest',
  'underwater',
  'superhero',
  'custom',
];

const VALID_TONES: CharacterTone[] = [
  'amber',
  'sky',
  'emerald',
  'teal',
  'coral',
  'indigo',
];

const KID_SAFE_SYSTEM_INSTRUCTION = `You are Dream Builder, a warm, whimsical storybook author creating interactive fantasy worlds for children ages 5-11 and their families.
Safety and tone rules:
- Every world, character, and story chapter must be joyful, kind, imaginative, and strictly G-rated.
- Never include violence, scary monsters, weapons, injury, bullying, mean insults, adult themes, or personal data.
- Write vivid, playful prose using short, readable paragraphs (3-4 sentences per chapter) easy for families to read aloud together.
- Always celebrate curiosity, friendship, empathy, and creative problem solving.
- If the user prompt contains unsafe or unfriendly elements, gently redirect to a bright, safe, playful interpretation without lecturing.`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    const aiConfigured = Boolean(getGeminiClient());
    res.json({ ok: true, aiConfigured });
  });

  app.post('/api/world/create', async (req, res) => {
    const rawPrompt = typeof req.body?.prompt === 'string' ? req.body.prompt : '';
    const preferredTheme = VALID_THEMES.includes(req.body?.preferredTheme)
      ? (req.body.preferredTheme as RealmTheme)
      : undefined;
    const requestedMode = req.body?.mode === 'example' ? 'example' : 'auto';
    const variant = Number(req.body?.variant || 0);

    const mod = moderateKidInput(rawPrompt);
    if (!mod.safe) {
      res.status(400).json({
        error: mod.reason,
        suggestion: mod.gentleSuggestion,
        moderationBlocked: true,
      });
      return;
    }

    const ai = requestedMode === 'example' ? null : getGeminiClient();

    if (!ai) {
      const exampleWorld = createExampleWorld(
        rawPrompt,
        preferredTheme,
        variant
      );
      res.json({
        world: exampleWorld,
        source: 'example',
        aiConfigured: false,
      });
      return;
    }

    try {
      const themeHint =
        preferredTheme && preferredTheme !== 'custom'
          ? preferredTheme
          : matchThemeFromPrompt(rawPrompt);

      const response = await withTransientRetry(() =>
        ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Create a magical interactive story world from this child's idea: "${rawPrompt.trim()}".
Preferred visual theme hint: "${themeHint}".
Pick illustrationTheme from: dinosaur, space, forest, underwater, superhero, or custom (choose the closest visual match, or custom for general sky-island/treehouse fantasy).
Create 3 distinct friendly characters and Chapter 1 with 3 exciting, kid-friendly choices for what happens next.`,
        config: {
          systemInstruction: KID_SAFE_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              safeToCreate: {
                type: Type.BOOLEAN,
                description:
                  'True if the prompt can become a joyful, G-rated kids story.',
              },
              safetyRedirectMessage: {
                type: Type.STRING,
                description:
                  'Friendly suggestion if safeToCreate is false; empty string otherwise.',
              },
              worldName: { type: Type.STRING },
              worldDescription: { type: Type.STRING },
              settingVibe: { type: Type.STRING },
              illustrationTheme: { type: Type.STRING },
              storyMoral: { type: Type.STRING },
              characters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    personality: { type: Type.STRING },
                    specialGift: { type: Type.STRING },
                    colorTone: { type: Type.STRING },
                  },
                  required: [
                    'name',
                    'role',
                    'personality',
                    'specialGift',
                    'colorTone',
                  ],
                },
              },
              chapter: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  narrative: { type: Type.STRING },
                  choices: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        label: { type: Type.STRING },
                        consequenceHint: { type: Type.STRING },
                      },
                      required: ['label', 'consequenceHint'],
                    },
                  },
                },
                required: ['title', 'narrative', 'choices'],
              },
            },
            required: [
              'safeToCreate',
              'worldName',
              'worldDescription',
              'settingVibe',
              'illustrationTheme',
              'storyMoral',
              'characters',
              'chapter',
            ],
          },
        },
        })
      );

      const parsed = JSON.parse((response.text ?? '{}').trim());

      if (parsed.safeToCreate === false) {
        res.status(400).json({
          error:
            parsed.safetyRedirectMessage ||
            "Let's pick a brighter, friendlier adventure idea to explore together!",
          moderationBlocked: true,
        });
        return;
      }

      const safeTheme: RealmTheme = VALID_THEMES.includes(
        parsed.illustrationTheme
      )
        ? parsed.illustrationTheme
        : themeHint;

      const characters = (Array.isArray(parsed.characters)
        ? parsed.characters
        : []
      )
        .slice(0, 3)
        .map((c: Record<string, string>, idx: number) => ({
          id: `char-${Date.now()}-${idx}`,
          name: c.name || `Explorer ${idx + 1}`,
          role: c.role || 'Dream Companion',
          personality: c.personality || 'Kind, curious, and ready to help',
          specialGift: c.specialGift || 'Finds bright solutions to tricky puzzles',
          colorTone: VALID_TONES.includes(c.colorTone as CharacterTone)
            ? (c.colorTone as CharacterTone)
            : VALID_TONES[idx % VALID_TONES.length],
        }));

      const rawChoices = Array.isArray(parsed.chapter?.choices)
        ? parsed.chapter.choices
        : [];
      const choices = rawChoices.slice(0, 3).map(
        (ch: Record<string, string>, idx: number) => ({
          id: `choice-1-${idx}-${Date.now()}`,
          label: ch.label || `Explore path ${idx + 1}`,
          consequenceHint:
            ch.consequenceHint || 'See what friendly surprise awaits ahead.',
        })
      );

      while (choices.length < 3) {
        choices.push({
          id: `choice-1-pad-${choices.length}`,
          label: 'Follow the glowing lantern trail together',
          consequenceHint: 'Discover a cozy surprise along the path.',
        });
      }

      const world: DreamWorld = {
        id: `world-${Date.now()}`,
        prompt: rawPrompt.trim(),
        worldName: parsed.worldName || 'Wonderland Horizon',
        worldDescription:
          parsed.worldDescription ||
          'A bright storybook realm shaped by imagination.',
        settingVibe:
          parsed.settingVibe || 'Sunlit skies and friendly magic',
        theme: safeTheme,
        source: 'ai',
        characters,
        chapters: [
          {
            chapterNumber: 1,
            title: parsed.chapter?.title || 'The First Spark of Adventure',
            narrative:
              parsed.chapter?.narrative ||
              'A bright new journey began as soon as the explorers arrived.',
            illustrationTheme: safeTheme,
            choices,
          },
        ],
        storyMoral:
          parsed.storyMoral ||
          'Imagination shines brightest when we share it with friends.',
        createdAt: new Date().toISOString(),
      };

      res.json({
        world,
        source: 'ai',
        aiConfigured: true,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to reach AI storyteller.';
      console.error('Gemini create world error:', message);
      res.status(502).json({
        error:
          'Our live AI storyteller had trouble connecting right now. You can retry or switch to Sample Story Mode to keep playing right away.',
        details: message,
        canFallbackToExample: true,
      });
    }
  });

  app.post('/api/world/chapter', async (req, res) => {
    const world = req.body?.world as DreamWorld | undefined;
    const chosenLabel =
      typeof req.body?.chosenLabel === 'string'
        ? req.body.chosenLabel.trim()
        : '';
    const choiceId =
      typeof req.body?.choiceId === 'string' ? req.body.choiceId : undefined;
    const regenerate = Boolean(req.body?.regenerate);

    if (!world || !Array.isArray(world.chapters)) {
      res.status(400).json({ error: 'Missing story world context.' });
      return;
    }

    const actionText =
      chosenLabel ||
      world.chapters[world.chapters.length - 1]?.chosenAction ||
      'Continue exploring together';

    const mod = moderateKidInput(actionText);
    if (!mod.safe) {
      res.status(400).json({
        error: mod.reason,
        suggestion: mod.gentleSuggestion,
        moderationBlocked: true,
      });
      return;
    }

    const targetChapterNumber = regenerate
      ? Math.max(1, world.chapters.length)
      : world.chapters.length + 1;

    const ai = world.source === 'example' ? null : getGeminiClient();

    if (!ai) {
      const nextChapter = createExampleChapter({
        world,
        chosenLabel: actionText,
        choiceId,
        regenerate,
        targetChapterNumber,
      });
      res.json({
        chapter: nextChapter,
        source: 'example',
        regenerate,
      });
      return;
    }

    try {
      const priorSummary = world.chapters
        .slice(0, regenerate ? -1 : undefined)
        .map(
          (ch) =>
            `Chapter ${ch.chapterNumber} (${ch.title}): ${ch.narrative}${
              ch.chosenAction ? ` [Choice made: ${ch.chosenAction}]` : ''
            }`
        )
        .join('\n\n');

      const charSummary = world.characters
        .map((c) => `${c.name} (${c.role}): ${c.personality}. Gift: ${c.specialGift}`)
        .join('\n');

      const promptText = regenerate
        ? `Rewrite Chapter ${targetChapterNumber} of "${world.worldName}" with a fresh, joyful twist while keeping the characters and earlier story consistent.
World Description: ${world.worldDescription}
Characters:
${charSummary}
Earlier Chapters:
${priorSummary || 'Opening chapter of the adventure.'}
${
  targetChapterNumber > 1
    ? `Choice leading into this chapter: "${actionText}"`
    : `Original story spark: "${world.prompt}"`
}
Provide a fresh chapter title, engaging 3-4 sentence narrative, and 3 new kid-friendly choices.`
        : `Write Chapter ${targetChapterNumber} of "${world.worldName}" continuing seamlessly from the child's choice!
World Description: ${world.worldDescription}
Characters:
${charSummary}
Story so far:
${priorSummary}
The child just chose: "${actionText}"
Show the fun, heartwarming outcome of their choice in 3-4 vivid sentences, and give 3 exciting new choices for what happens next.`;

      const response = await withTransientRetry(() =>
        ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: promptText,
        config: {
          systemInstruction: KID_SAFE_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              safeToContinue: { type: Type.BOOLEAN },
              safetyRedirectMessage: { type: Type.STRING },
              title: { type: Type.STRING },
              narrative: { type: Type.STRING },
              choices: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    consequenceHint: { type: Type.STRING },
                  },
                  required: ['label', 'consequenceHint'],
                },
              },
            },
            required: ['safeToContinue', 'title', 'narrative', 'choices'],
          },
        },
        })
      );

      const parsed = JSON.parse((response.text ?? '{}').trim());

      if (parsed.safeToContinue === false) {
        res.status(400).json({
          error:
            parsed.safetyRedirectMessage ||
            "Let's pick a kinder, brighter next step for our explorers!",
          moderationBlocked: true,
        });
        return;
      }

      const rawChoices = Array.isArray(parsed.choices) ? parsed.choices : [];
      const choices = rawChoices.slice(0, 3).map(
        (ch: Record<string, string>, idx: number) => ({
          id: `choice-${targetChapterNumber}-${idx}-${Date.now()}`,
          label: ch.label || `Try idea ${idx + 1}`,
          consequenceHint:
            ch.consequenceHint || 'See where this gentle path leads.',
        })
      );

      while (choices.length < 3) {
        choices.push({
          id: `choice-${targetChapterNumber}-pad-${choices.length}`,
          label: 'Share a celebratory snack with your companions',
          consequenceHint: 'Rest and plan the next friendly discovery.',
        });
      }

      const nextChapter: StoryChapter = {
        chapterNumber: targetChapterNumber,
        title: parsed.title || `Chapter ${targetChapterNumber}: New Horizons`,
        narrative:
          parsed.narrative ||
          'The explorers laughed together as a bright new clue shimmered ahead.',
        chosenAction: targetChapterNumber > 1 ? actionText : undefined,
        illustrationTheme: world.theme,
        choices,
      };

      res.json({
        chapter: nextChapter,
        source: 'ai',
        regenerate,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to generate chapter.';
      console.error('Gemini chapter error:', message);
      res.status(502).json({
        error:
          'We could not reach the live AI storyteller for the next chapter. You can try again or continue in Sample Story Mode.',
        details: message,
        canFallbackToExample: true,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dream Builder server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
