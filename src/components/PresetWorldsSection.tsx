import { ArrowRight } from 'lucide-react';
import { PRESET_REALMS } from '../data/realmAssets.ts';
import type { PresetRealmMeta, RealmTheme } from '../types/dream.ts';
import { IllustrationFrame } from './IllustrationFrame.tsx';

interface PresetWorldsSectionProps {
  activeTheme?: RealmTheme;
  isLoading: boolean;
  onSelectPreset: (preset: PresetRealmMeta) => void;
}

export function PresetWorldsSection({
  activeTheme,
  isLoading,
  onSelectPreset,
}: PresetWorldsSectionProps) {
  return (
    <section id="choose-imagination" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Choose your imagination
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Pick any magical realm to jump straight into a playable storybook
            adventure, or use it as a launchpad for your own twist.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PRESET_REALMS.map((preset) => {
            const isSelected = activeTheme === preset.id;
            return (
              <article
                key={preset.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-white transition-transform duration-200 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-stone-200 shadow-sm'
                }`}
              >
                <div className="p-2 pb-0">
                  <IllustrationFrame
                    src={preset.imageUrl}
                    alt={preset.imageAlt}
                    fallbackTitle={preset.title}
                    aspectClass="aspect-[4/3]"
                    className="rounded-xl"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {preset.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                    {preset.subtitle}
                  </p>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => onSelectPreset(preset)}
                    className={`mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 ${
                      isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : `${preset.accentBg} ${preset.accentText} hover:brightness-95`
                    }`}
                  >
                    <span>{isSelected ? 'Exploring Now' : 'Explore World'}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
