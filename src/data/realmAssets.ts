import type { PresetRealmMeta, RealmTheme } from '../types/dream.ts';

export const HERO_ILLUSTRATION_URL =
  '/src/assets/images/hero_dream_world_1794994835006.jpg';

export const REALM_IMAGE_MAP: Record<RealmTheme, { url: string; alt: string }> = {
  dinosaur: {
    url: '/src/assets/images/realm_dinosaur_kingdom_1794994834678.jpg',
    alt: '3D diorama of a sunny prehistoric valley with baby dinosaurs beside a crystal lagoon',
  },
  space: {
    url: '/src/assets/images/realm_space_adventure_1794994836650.jpg',
    alt: '3D diorama of a colorful explorer starship sailing past ringed pastel planets and glowing moons',
  },
  forest: {
    url: '/src/assets/images/realm_magical_forest_1794994836928.jpg',
    alt: '3D diorama of an enchanted woodland clearing with glowing mushrooms, oak cottages, and a red fox',
  },
  underwater: {
    url: '/src/assets/images/realm_underwater_city_1794994836574.jpg',
    alt: '3D diorama of a sunlit underwater coral city with pearl domes, sea turtles, and jellyfish lanterns',
  },
  superhero: {
    url: '/src/assets/images/realm_superhero_world_1794994836851.jpg',
    alt: '3D diorama of a cheerful sunlit coastal city with rooftop gardens and a young hero in a red cape',
  },
  custom: {
    url: '/src/assets/images/hero_dream_world_1794994835006.jpg',
    alt: '3D diorama of a floating storybook island with a treehouse, little turquoise dragon, and lanterns',
  },
};

export const PRESET_REALMS: PresetRealmMeta[] = [
  {
    id: 'dinosaur',
    title: 'Dinosaur Kingdom',
    subtitle: 'Friendly baby dinos, fern waterfalls, and amber secret trails.',
    promptSeed: 'A sunny valley where baby dinosaurs run a musical berry picnic',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-800',
    imageUrl: REALM_IMAGE_MAP.dinosaur.url,
    imageAlt: REALM_IMAGE_MAP.dinosaur.alt,
  },
  {
    id: 'space',
    title: 'Space Adventure',
    subtitle: 'Brass starships, bouncy moon craters, and comet lantern paths.',
    promptSeed: 'A wooden-and-brass rocket ship searching for a singing comet',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-800',
    imageUrl: REALM_IMAGE_MAP.space.url,
    imageAlt: REALM_IMAGE_MAP.space.alt,
  },
  {
    id: 'forest',
    title: 'Magical Forest',
    subtitle: 'Lantern mushrooms, oak cottages, and curious woodland guides.',
    promptSeed: 'A cozy oak forest where fireflies paint glowing maps at twilight',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-800',
    imageUrl: REALM_IMAGE_MAP.forest.url,
    imageAlt: REALM_IMAGE_MAP.forest.alt,
  },
  {
    id: 'underwater',
    title: 'Underwater City',
    subtitle: 'Pearl-dome towers, sea turtle taxis, and rainbow kelp gardens.',
    promptSeed: 'A sunlit coral city where sea turtles deliver bubble-wrapped letters',
    accentBg: 'bg-cyan-50',
    accentText: 'text-cyan-800',
    imageUrl: REALM_IMAGE_MAP.underwater.url,
    imageAlt: REALM_IMAGE_MAP.underwater.alt,
  },
  {
    id: 'superhero',
    title: 'Superhero World',
    subtitle: 'Skyway bridges, neighborhood helpers, and bright rooftop towers.',
    promptSeed: 'A sunny harbor city where young inventors use kindness gadgets to help neighbors',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-800',
    imageUrl: REALM_IMAGE_MAP.superhero.url,
    imageAlt: REALM_IMAGE_MAP.superhero.alt,
  },
];
