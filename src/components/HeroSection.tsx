import { type FormEvent, useRef } from 'react';
import { ArrowRight, Loader2, ShieldCheck, Wand2 } from 'lucide-react';
import { HERO_ILLUSTRATION_URL } from '../data/realmAssets.ts';
import { IllustrationFrame } from './IllustrationFrame.tsx';

interface HeroSectionProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmitPrompt: (promptText: string) => void;
  isLoading: boolean;
  aiConfigured: boolean | null;
  errorMessage: string | null;
  errorSuggestion: string | null;
  canFallbackToExample: boolean;
  onFallbackToExample: () => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

const QUICK_SPARKS = [
  'A friendly baby dragon who runs a cloud bakery',
  'A submarine school bus exploring glowing coral caves',
  'A treehouse observatory that catches musical shooting stars',
];

export function HeroSection({
  prompt,
  onPromptChange,
  onSubmitPrompt,
  isLoading,
  aiConfigured,
  errorMessage,
  errorSuggestion,
  canFallbackToExample,
  onFallbackToExample,
  inputRef,
}: HeroSectionProps) {
  const localRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef = inputRef ?? localRef;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitPrompt(prompt);
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#F3F7FB] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="mb-3 text-sm font-semibold tracking-wide text-amber-700">
            Your imagination. Your world. Your adventure.
          </p>

          <h1
            className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            What if your imagination became REAL?
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Create a magical universe with just one idea. Describe any creature,
            place, or silly dream below and step inside your own interactive
            storybook.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <label htmlFor="imagination-input" className="sr-only">
                Describe your dream world idea
              </label>
              <textarea
                ref={textareaRef}
                id="imagination-input"
                rows={3}
                maxLength={320}
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder="Type anything you imagine... like a sleepy turtle who captains a rainbow airship!"
                className="w-full resize-none bg-transparent px-2 py-1 text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-lg"
              />

              <div className="mt-2 flex flex-col gap-3 border-t border-stone-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {aiConfigured === true
                    ? 'AI Storyteller ready · Family-safe filter active'
                    : aiConfigured === false
                      ? 'Sample Story Mode ready · Instant interactive tales'
                      : 'Family-safe story studio'}
                </span>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-amber-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65 transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      <span>Building Your World...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5" aria-hidden="true" />
                      <span>Create My World</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
              >
                <p className="font-semibold">{errorMessage}</p>
                {errorSuggestion && (
                  <p className="mt-1 text-amber-800">{errorSuggestion}</p>
                )}
                {canFallbackToExample && (
                  <button
                    type="button"
                    onClick={onFallbackToExample}
                    className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    <span>Play in Sample Story Mode instead</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </form>

          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500">
              Need an idea spark? Tap one to try:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {QUICK_SPARKS.map((spark) => (
                <button
                  key={spark}
                  type="button"
                  onClick={() => onPromptChange(spark)}
                  className="min-h-[40px] rounded-xl border border-stone-200 bg-white/80 px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-900 transition-colors cursor-pointer"
                >
                  {spark}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>
              No sign-up needed. Kid-safe story filtering is always on—please keep
              real names and addresses private.
            </span>
          </p>
        </div>

        <div className="lg:col-span-6 flex">
          <div className="w-full overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-2 shadow-sm lg:h-full">
            <IllustrationFrame
              src={HERO_ILLUSTRATION_URL}
              alt="Whimsical 3D diorama of a floating storybook island with a wooden treehouse, friendly little turquoise dragon, crystal waterfall, and glowing lanterns"
              fallbackTitle="Dream Builder Floating Island"
              aspectClass="aspect-[16/10] lg:h-full"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
