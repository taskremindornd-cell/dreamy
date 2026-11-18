import { useState } from 'react';
import { Check, Download, Share2 } from 'lucide-react';
import { REALM_IMAGE_MAP } from '../data/realmAssets.ts';
import type { DreamWorld } from '../types/dream.ts';
import { IllustrationFrame } from './IllustrationFrame.tsx';

interface StoryCardSectionProps {
  world: DreamWorld;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): number {
  const words = text.split(/\s+/);
  let line = '';
  let y = startY;
  let linesDrawn = 0;

  for (let i = 0; i < words.length; i += 1) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      linesDrawn += 1;
      if (linesDrawn >= maxLines) {
        ctx.fillText(`${line}...`, x, y);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      line = words[i];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function StoryCardSection({ world }: StoryCardSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const artwork = REALM_IMAGE_MAP[world.theme] ?? REALM_IMAGE_MAP.custom;
  const latestChapter = world.chapters[world.chapters.length - 1];

  const handleDownloadCard = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1500;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background parchment gradient
      const bg = ctx.createLinearGradient(0, 0, 0, 1500);
      bg.addColorStop(0, '#FAF8F5');
      bg.addColorStop(1, '#EFF6FF');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1200, 1500);

      // Outer collectible card surface
      ctx.fillStyle = '#FFFFFF';
      drawRoundedRect(ctx, 56, 56, 1088, 1388, 40);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#E7E5E4';
      ctx.stroke();

      // Load and draw 3D diorama artwork
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          drawRoundedRect(ctx, 96, 96, 1008, 580, 28);
          ctx.clip();
          const scale = Math.max(1008 / img.width, 580 / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const drawX = 96 + (1008 - drawW) / 2;
          const drawY = 96 + (580 - drawH) / 2;
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.restore();
          resolve();
        };
        img.onerror = () => resolve();
        img.src = artwork.url;
      });

      // Brand header text
      ctx.fillStyle = '#B45309';
      ctx.font = '700 26px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText('DREAM BUILDER  ·  KEEPSAKE STORY CARD', 96, 738);

      // World Title
      ctx.fillStyle = '#0F172A';
      ctx.font = '800 58px "Bricolage Grotesque", system-ui, sans-serif';
      let cursorY = wrapCanvasText(
        ctx,
        world.worldName,
        96,
        810,
        1008,
        68,
        2
      );

      // Spark prompt
      ctx.fillStyle = '#475569';
      ctx.font = '500 28px "Plus Jakarta Sans", system-ui, sans-serif';
      cursorY = wrapCanvasText(
        ctx,
        `Imagination Spark: "${world.prompt}"`,
        96,
        cursorY + 14,
        1008,
        38,
        2
      );

      // Divider
      ctx.strokeStyle = '#E7E5E4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(96, cursorY + 18);
      ctx.lineTo(1104, cursorY + 18);
      ctx.stroke();

      // Story highlight
      ctx.fillStyle = '#1D4ED8';
      ctx.font = '700 24px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(
        `Chapter ${latestChapter.chapterNumber}: ${latestChapter.title}`,
        96,
        cursorY + 64
      );

      ctx.fillStyle = '#334155';
      ctx.font = '400 27px "Plus Jakarta Sans", system-ui, sans-serif';
      const narrativeEndY = wrapCanvasText(
        ctx,
        latestChapter.narrative,
        96,
        cursorY + 112,
        1008,
        40,
        4
      );

      // Characters line
      const charList = world.characters.map((c) => c.name).join('  ·  ');
      ctx.fillStyle = '#0F172A';
      ctx.font = '700 25px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(`Companions: ${charList}`, 96, Math.max(narrativeEndY + 34, 1265));

      // Story Moral footer
      ctx.fillStyle = '#475569';
      ctx.font = '600 24px "Plus Jakarta Sans", system-ui, sans-serif';
      wrapCanvasText(
        ctx,
        `Story Lesson: ${world.storyMoral}`,
        96,
        1345,
        1008,
        34,
        2
      );

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const slug = world.worldName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      link.download = `dream-builder-${slug || 'story-card'}.png`;
      link.href = dataUrl;
      link.click();

      setShareFeedback('Story Card PNG downloaded!');
      setTimeout(() => setShareFeedback(null), 3500);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareStory = async () => {
    const shareText = `${world.worldName} — Created on Dream Builder\n\nIdea: "${world.prompt}"\nCompanions: ${world.characters.map((c) => c.name).join(', ')}\nLatest Chapter (${latestChapter.title}): ${latestChapter.narrative}\n\nYour imagination. Your world. Your adventure.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${world.worldName} — Dream Builder`,
          text: shareText,
          url: window.location.href,
        });
        setShareFeedback('Adventure shared!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareFeedback('Story summary copied to clipboard!');
      }
      setTimeout(() => setShareFeedback(null), 3500);
    } catch {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareFeedback('Story summary copied to clipboard!');
        setTimeout(() => setShareFeedback(null), 3500);
      }
    }
  };

  return (
    <section
      id="share-creation"
      className="border-t border-stone-200/80 bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-amber-700">
              Share your creation
            </p>
            <h2
              className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Keep your world on a Story Card
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Save a keepsake card of {world.worldName}, its friendly characters,
              and your favorite chapter—ready to print for bedtime reading or
              share with family.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                disabled={isDownloading}
                onClick={handleDownloadCard}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-700 active:scale-[0.98] disabled:opacity-60 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>
                  {isDownloading
                    ? 'Preparing Card...'
                    : 'Download Story Card'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleShareStory}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm hover:bg-stone-50 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                <span>Share Adventure</span>
              </button>
            </div>

            {shareFeedback && (
              <p
                role="status"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>{shareFeedback}</span>
              </p>
            )}
          </div>

          <div className="lg:col-span-7">
            <article className="overflow-hidden rounded-3xl border border-stone-200 bg-[#FAF8F5] p-5 shadow-sm sm:p-7">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-stretch">
                <div className="sm:col-span-5">
                  <IllustrationFrame
                    src={artwork.url}
                    alt={artwork.alt}
                    fallbackTitle={world.worldName}
                    aspectClass="aspect-[4/3] sm:h-full"
                    className="rounded-2xl border border-stone-200"
                  />
                </div>

                <div className="flex flex-col justify-between sm:col-span-7">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-amber-700">
                      <span>Dream Builder Keepsake</span>
                      <span className="tabular-nums text-slate-500">
                        {world.chapters.length}{' '}
                        {world.chapters.length === 1 ? 'Chapter' : 'Chapters'}
                      </span>
                    </div>

                    <h3 className="font-display mt-2 text-2xl font-extrabold text-slate-900">
                      {world.worldName}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {latestChapter.narrative}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-stone-200/80 pt-4 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-900">
                        Explorers:{' '}
                      </span>
                      {world.characters.map((c) => c.name).join(' · ')}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">
                        Story Lesson:{' '}
                      </span>
                      {world.storyMoral}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
