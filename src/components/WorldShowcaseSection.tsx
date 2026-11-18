import { Compass, Heart, Sparkles, Star } from 'lucide-react';
import { REALM_IMAGE_MAP } from '../data/realmAssets.ts';
import type { CharacterTone, DreamWorld } from '../types/dream.ts';
import { IllustrationFrame } from './IllustrationFrame.tsx';

interface WorldShowcaseSectionProps {
  world: DreamWorld;
}

const TONE_CLASSES: Record<CharacterTone, string> = {
  amber: 'bg-amber-100 text-amber-800',
  sky: 'bg-sky-100 text-sky-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  teal: 'bg-teal-100 text-teal-800',
  coral: 'bg-orange-100 text-orange-800',
  indigo: 'bg-indigo-100 text-indigo-800',
};

const THEME_LABELS: Record<DreamWorld['theme'], string> = {
  dinosaur: 'Dinosaur Kingdom',
  space: 'Space Adventure',
  forest: 'Magical Forest',
  underwater: 'Underwater City',
  superhero: 'Superhero World',
  custom: 'Custom Imagination',
};

export function WorldShowcaseSection({ world }: WorldShowcaseSectionProps) {
  const artwork = REALM_IMAGE_MAP[world.theme] ?? REALM_IMAGE_MAP.custom;

  return (
    <section
      id="world-creation"
      className="border-y border-stone-200/80 bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
              <span>{THEME_LABELS[world.theme]}</span>
              <span aria-hidden="true">·</span>
              <span>
                {world.source === 'ai'
                  ? 'Created with AI Storyteller'
                  : 'Sample Story Mode'}
              </span>
            </div>

            <h2
              className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {world.worldName}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {world.worldDescription}
            </p>

            <div className="mt-6 flex items-start gap-3 border-t border-stone-100 pt-5">
              <Compass
                className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  World Atmosphere
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {world.settingVibe}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 border-t border-stone-100 pt-4">
              <Sparkles
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Your Imagination Spark
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  “{world.prompt}”
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="w-full overflow-hidden rounded-3xl border border-stone-200 bg-[#FAF8F5] p-2 shadow-sm lg:h-full">
              <IllustrationFrame
                src={artwork.url}
                alt={artwork.alt}
                fallbackTitle={world.worldName}
                aspectClass="aspect-[4/3] lg:h-full"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200/80 pt-10">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Meet the characters
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Every hero and companion brings a special personality and gift to{' '}
              {world.worldName}.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {world.characters.map((character, idx) => (
              <article
                key={character.id}
                className="flex flex-col rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    aria-hidden="true"
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold ${
                      TONE_CLASSES[character.colorTone] ?? TONE_CLASSES.amber
                    }`}
                  >
                    {character.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-lg font-bold text-slate-900 truncate">
                      {character.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500">
                      0{idx + 1}. {character.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t border-stone-200/70 pt-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <Heart
                      className="mt-0.5 h-4 w-4 shrink-0 text-orange-600"
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Personality:{' '}
                      </span>
                      {character.personality}
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Star
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Special Gift:{' '}
                      </span>
                      {character.specialGift}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
