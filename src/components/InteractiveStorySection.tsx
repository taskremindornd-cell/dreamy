import { type FormEvent, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Loader2,
  RefreshCw,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { DreamWorld, StoryChoice } from '../types/dream.ts';

interface InteractiveStorySectionProps {
  world: DreamWorld;
  activeChapterIndex: number;
  onSelectChapterIndex: (index: number) => void;
  onChooseNext: (choice: StoryChoice) => void;
  onCustomContinue: (customAction: string) => void;
  onRegenerateChapter: () => void;
  isGeneratingChapter: boolean;
  chapterError: string | null;
  chapterSuggestion: string | null;
  onFallbackChapterExample: () => void;
}

export function InteractiveStorySection({
  world,
  activeChapterIndex,
  onSelectChapterIndex,
  onChooseNext,
  onCustomContinue,
  onRegenerateChapter,
  isGeneratingChapter,
  chapterError,
  chapterSuggestion,
  onFallbackChapterExample,
}: InteractiveStorySectionProps) {
  const [customTwist, setCustomTwist] = useState('');
  const safeIndex = Math.min(
    Math.max(0, activeChapterIndex),
    world.chapters.length - 1
  );
  const currentChapter = world.chapters[safeIndex];
  const isLatestChapter = safeIndex === world.chapters.length - 1;

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customTwist.trim() || isGeneratingChapter) return;
    onCustomContinue(customTwist.trim());
    setCustomTwist('');
  };

  return (
    <section
      id="story-chapters"
      className="bg-gradient-to-b from-[#F3F7FB] to-[#FAF8F5] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              Interactive Storytelling
            </p>
            <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Decide what happens next
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isGeneratingChapter}
              onClick={onRegenerateChapter}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-stone-50 active:scale-[0.98] disabled:opacity-60 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <RefreshCw
                className={`h-4 w-4 ${isGeneratingChapter ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>Regenerate story</span>
            </button>

            <a
              href="#share-creation"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <span>View Story Card</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Chapter Timeline Tabs */}
        <div
          role="tablist"
          aria-label="Story chapters"
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {world.chapters.map((ch, idx) => {
            const active = idx === safeIndex;
            return (
              <button
                key={`${ch.chapterNumber}-${ch.title}`}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => onSelectChapterIndex(idx)}
                className={`min-h-[40px] rounded-xl px-4 py-2 text-sm font-semibold tabular-nums transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-stone-200 bg-white text-slate-700 hover:bg-stone-50'
                }`}
              >
                Chapter {ch.chapterNumber}
              </button>
            );
          })}
        </div>

        {/* Main Story Card */}
        <motion.article
          key={`${world.id}-${currentChapter.chapterNumber}-${currentChapter.title}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-500 tabular-nums">
              <BookOpen className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <span>Chapter {currentChapter.chapterNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{world.worldName}</span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              {world.source === 'ai' ? 'AI Storyteller' : 'Sample Story Mode'}
            </span>
          </div>

          {currentChapter.chosenAction && (
            <p className="mt-4 text-sm font-medium text-blue-800">
              You chose: “{currentChapter.chosenAction}”
            </p>
          )}

          <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {currentChapter.title}
          </h3>

          <p className="mt-4 text-base leading-[1.75] text-slate-700 sm:text-lg">
            {currentChapter.narrative}
          </p>

          {chapterError && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
            >
              <p className="font-semibold">{chapterError}</p>
              {chapterSuggestion && (
                <p className="mt-1 text-amber-800">{chapterSuggestion}</p>
              )}
              <button
                type="button"
                onClick={onFallbackChapterExample}
                className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <span>Continue with Sample Story Mode</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Three Choices */}
          <div className="mt-8 border-t border-stone-100 pt-6">
            {isGeneratingChapter ? (
              <div
                aria-live="polite"
                className="flex flex-col items-center justify-center rounded-2xl bg-[#FAF8F5] px-6 py-10 text-center"
              >
                <Loader2
                  className="h-8 w-8 animate-spin text-amber-600"
                  aria-hidden="true"
                />
                <p className="font-display mt-3 text-lg font-bold text-slate-900">
                  Turning the magic page...
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Weaving your choice into the next chapter of {world.worldName}.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    {isLatestChapter
                      ? 'What happens next? Pick one of 3 choices:'
                      : 'Choices from this chapter (tap any to branch a new path):'}
                  </h4>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  {currentChapter.choices.slice(0, 3).map((choice, idx) => (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => onChooseNext(choice)}
                      className="group flex min-h-[60px] w-full items-start gap-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 text-left transition-all hover:border-blue-400 hover:bg-blue-50/60 active:scale-[0.99] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white font-display text-sm font-bold text-blue-700 border border-stone-200 group-hover:border-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors tabular-nums"
                      >
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 group-hover:text-blue-950">
                          {choice.label}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-600">
                          {choice.consequenceHint}
                        </p>
                      </div>
                      <ArrowRight
                        className="mt-1.5 h-4 w-4 shrink-0 text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 transition-transform"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>

                {/* Continue adventure with your own custom idea */}
                <form
                  onSubmit={handleCustomSubmit}
                  className="mt-6 border-t border-stone-100 pt-5"
                >
                  <label
                    htmlFor="custom-chapter-action"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Or invent your own next step to continue the adventure:
                  </label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="custom-chapter-action"
                      type="text"
                      maxLength={180}
                      value={customTwist}
                      onChange={(e) => setCustomTwist(e.target.value)}
                      placeholder="e.g., Build a giant rainbow slide down to the valley..."
                      className="min-h-[48px] flex-1 rounded-xl border border-stone-200 bg-[#FAF8F5] px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="submit"
                      disabled={!customTwist.trim()}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Continue adventure</span>
                    </button>
                  </div>
                </form>

                {!isLatestChapter && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectChapterIndex(world.chapters.length - 1)
                      }
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Compass className="h-4 w-4" aria-hidden="true" />
                      <span>
                        Jump to latest chapter (Chapter{' '}
                        {world.chapters.length})
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
