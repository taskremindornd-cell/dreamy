import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { InteractiveStorySection } from './components/InteractiveStorySection.tsx';
import { PresetWorldsSection } from './components/PresetWorldsSection.tsx';
import { StoryCardSection } from './components/StoryCardSection.tsx';
import { WorldShowcaseSection } from './components/WorldShowcaseSection.tsx';
import {
  createExampleChapter,
  createExampleWorld,
} from './data/exampleWorlds.ts';
import type {
  DreamWorld,
  PresetRealmMeta,
  RealmTheme,
  StoryChoice,
} from './types/dream.ts';
import { moderateKidInput } from './utils/moderation.ts';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aiConfigured, setAiConfigured] = useState<boolean | null>(null);
  const [activeWorld, setActiveWorld] = useState<DreamWorld>(() =>
    createExampleWorld(
      'A sunny valley where baby dinosaurs run a musical berry picnic',
      'dinosaur'
    )
  );
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isCreatingWorld, setIsCreatingWorld] = useState(false);
  const [isGeneratingChapter, setIsGeneratingChapter] = useState(false);

  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuggestion, setCreateSuggestion] = useState<string | null>(null);
  const [canFallbackCreate, setCanFallbackCreate] = useState(false);

  const [chapterError, setChapterError] = useState<string | null>(null);
  const [chapterSuggestion, setChapterSuggestion] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    chosenLabel: string;
    choiceId?: string;
    regenerate?: boolean;
  } | null>(null);

  const [variantCounter, setVariantCounter] = useState(0);
  const imaginationInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setAiConfigured(Boolean(data?.aiConfigured));
      })
      .catch(() => {
        setAiConfigured(false);
      });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartNewDream = () => {
    setCreateError(null);
    setCreateSuggestion(null);
    setCanFallbackCreate(false);
    scrollToSection('top');
    setTimeout(() => {
      imaginationInputRef.current?.focus();
    }, 300);
  };

  const buildWorld = async (
    rawText: string,
    options?: {
      preferredTheme?: RealmTheme;
      mode?: 'auto' | 'example';
      variant?: number;
    }
  ) => {
    const mod = moderateKidInput(rawText);
    if (!mod.safe) {
      setCreateError(mod.reason ?? 'Please try a different idea.');
      setCreateSuggestion(mod.gentleSuggestion ?? null);
      setCanFallbackCreate(false);
      return;
    }

    setCreateError(null);
    setCreateSuggestion(null);
    setCanFallbackCreate(false);
    setChapterError(null);
    setChapterSuggestion(null);
    setIsCreatingWorld(true);

    try {
      const response = await fetch('/api/world/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: rawText,
          preferredTheme: options?.preferredTheme,
          mode: options?.mode ?? 'auto',
          variant: options?.variant ?? 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCreateError(
          data.error || 'Could not create your world right now.'
        );
        setCreateSuggestion(data.suggestion || null);
        setCanFallbackCreate(Boolean(data.canFallbackToExample));
        return;
      }

      setActiveWorld(data.world);
      setActiveChapterIndex(0);
      setTimeout(() => scrollToSection('world-creation'), 100);
    } catch {
      setCreateError(
        'Connection trouble reaching the story studio. Try again or use Sample Story Mode.'
      );
      setCanFallbackCreate(true);
    } finally {
      setIsCreatingWorld(false);
    }
  };

  const handleSelectPreset = async (preset: PresetRealmMeta) => {
    setPrompt(preset.promptSeed);
    await buildWorld(preset.promptSeed, {
      preferredTheme: preset.id,
      mode: aiConfigured ? 'auto' : 'example',
    });
  };

  const handleFallbackCreateExample = () => {
    const text = prompt.trim() || 'A friendly dragon who runs a cloud bakery';
    const example = createExampleWorld(text, undefined, variantCounter);
    setActiveWorld(example);
    setActiveChapterIndex(0);
    setCreateError(null);
    setCreateSuggestion(null);
    setCanFallbackCreate(false);
    setTimeout(() => scrollToSection('world-creation'), 100);
  };

  const requestChapterUpdate = async (params: {
    chosenLabel: string;
    choiceId?: string;
    regenerate?: boolean;
    forceExample?: boolean;
  }) => {
    const mod = moderateKidInput(params.chosenLabel);
    if (!mod.safe) {
      setChapterError(mod.reason ?? 'Let us try a gentler story step.');
      setChapterSuggestion(mod.gentleSuggestion ?? null);
      return;
    }

    setChapterError(null);
    setChapterSuggestion(null);
    setPendingAction({
      chosenLabel: params.chosenLabel,
      choiceId: params.choiceId,
      regenerate: params.regenerate,
    });
    setIsGeneratingChapter(true);

    const isRegen = Boolean(params.regenerate);
    const currentDisplayChapter = activeWorld.chapters[activeChapterIndex];

    // If user is branching from an earlier chapter, slice history up to that chapter
    const baseChapters = isRegen
      ? activeWorld.chapters
      : activeWorld.chapters.slice(0, activeChapterIndex + 1);

    const worldPayload: DreamWorld = {
      ...activeWorld,
      source: params.forceExample ? 'example' : activeWorld.source,
      chapters: baseChapters,
    };

    try {
      const response = await fetch('/api/world/chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          world: worldPayload,
          chosenLabel: params.chosenLabel,
          choiceId: params.choiceId,
          regenerate: isRegen,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setChapterError(
          data.error || 'Could not write the next chapter right now.'
        );
        setChapterSuggestion(data.suggestion || null);
        return;
      }

      if (isRegen) {
        // Replace latest chapter (or chapter 1) cleanly
        const updatedChapters = [...activeWorld.chapters];
        updatedChapters[updatedChapters.length - 1] = data.chapter;
        setActiveWorld({
          ...worldPayload,
          chapters: updatedChapters,
        });
        setActiveChapterIndex(updatedChapters.length - 1);
      } else {
        const updatedChapters = [...baseChapters, data.chapter];
        setActiveWorld({
          ...worldPayload,
          chapters: updatedChapters,
        });
        setActiveChapterIndex(updatedChapters.length - 1);
      }
    } catch {
      setChapterError(
        'Connection trouble reaching the storyteller. Continue in Sample Story Mode anytime.'
      );
    } finally {
      setIsGeneratingChapter(false);
    }

    if (isRegen && currentDisplayChapter?.chapterNumber === 1) {
      setVariantCounter((v) => v + 1);
    }
  };

  const handleChooseNext = (choice: StoryChoice) => {
    requestChapterUpdate({
      chosenLabel: choice.label,
      choiceId: choice.id,
      regenerate: false,
    });
  };

  const handleCustomContinue = (customAction: string) => {
    requestChapterUpdate({
      chosenLabel: customAction,
      regenerate: false,
    });
  };

  const handleRegenerateChapter = () => {
    const nextVariant = variantCounter + 1;
    setVariantCounter(nextVariant);

    if (activeWorld.chapters.length <= 1) {
      // Regenerate opening world/chapter cleanly
      if (activeWorld.source === 'example') {
        const refreshed = createExampleWorld(
          activeWorld.prompt,
          activeWorld.theme,
          nextVariant
        );
        setActiveWorld(refreshed);
        setActiveChapterIndex(0);
        return;
      }
      requestChapterUpdate({
        chosenLabel: activeWorld.prompt,
        regenerate: true,
      });
      return;
    }

    const latest = activeWorld.chapters[activeWorld.chapters.length - 1];
    requestChapterUpdate({
      chosenLabel: latest.chosenAction || activeWorld.prompt,
      regenerate: true,
    });
  };

  const handleFallbackChapterExample = () => {
    if (!pendingAction) return;
    const isRegen = Boolean(pendingAction.regenerate);
    const baseChapters = isRegen
      ? activeWorld.chapters
      : activeWorld.chapters.slice(0, activeChapterIndex + 1);
    const targetChapterNumber = isRegen
      ? Math.max(1, activeWorld.chapters.length)
      : baseChapters.length + 1;

    const nextCh = createExampleChapter({
      world: { ...activeWorld, source: 'example', chapters: baseChapters },
      chosenLabel: pendingAction.chosenLabel,
      choiceId: pendingAction.choiceId,
      regenerate: isRegen,
      targetChapterNumber,
    });

    const updatedChapters = isRegen
      ? [...activeWorld.chapters.slice(0, -1), nextCh]
      : [...baseChapters, nextCh];

    setActiveWorld({
      ...activeWorld,
      source: 'example',
      chapters: updatedChapters,
    });
    setActiveChapterIndex(updatedChapters.length - 1);
    setChapterError(null);
    setChapterSuggestion(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900">
      <Header
        hasWorld={Boolean(activeWorld)}
        onStartNewDream={handleStartNewDream}
      />

      <main className="flex-1">
        <HeroSection
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmitPrompt={(text) =>
            buildWorld(text, { mode: aiConfigured ? 'auto' : 'example' })
          }
          isLoading={isCreatingWorld}
          aiConfigured={aiConfigured}
          errorMessage={createError}
          errorSuggestion={createSuggestion}
          canFallbackToExample={canFallbackCreate}
          onFallbackToExample={handleFallbackCreateExample}
          inputRef={imaginationInputRef}
        />

        <PresetWorldsSection
          activeTheme={activeWorld.theme}
          isLoading={isCreatingWorld}
          onSelectPreset={handleSelectPreset}
        />

        <WorldShowcaseSection world={activeWorld} />

        <InteractiveStorySection
          world={activeWorld}
          activeChapterIndex={activeChapterIndex}
          onSelectChapterIndex={setActiveChapterIndex}
          onChooseNext={handleChooseNext}
          onCustomContinue={handleCustomContinue}
          onRegenerateChapter={handleRegenerateChapter}
          isGeneratingChapter={isGeneratingChapter}
          chapterError={chapterError}
          chapterSuggestion={chapterSuggestion}
          onFallbackChapterExample={handleFallbackChapterExample}
        />

        <StoryCardSection world={activeWorld} />
      </main>

      <footer className="border-t border-stone-200/80 bg-[#FAF8F5] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-display font-bold text-slate-900">
              Dream Builder
            </p>
            <p className="text-xs text-slate-500">
              Your imagination. Your world. Your adventure.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Family-safe interactive storytelling · No accounts or personal data
            required
          </p>
        </div>
      </footer>
    </div>
  );
}
