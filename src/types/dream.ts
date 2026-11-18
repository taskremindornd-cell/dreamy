export type RealmTheme =
  | 'dinosaur'
  | 'space'
  | 'forest'
  | 'underwater'
  | 'superhero'
  | 'custom';

export type CharacterTone =
  | 'amber'
  | 'sky'
  | 'emerald'
  | 'teal'
  | 'coral'
  | 'indigo';

export interface Character {
  id: string;
  name: string;
  role: string;
  personality: string;
  specialGift: string;
  colorTone: CharacterTone;
}

export interface StoryChoice {
  id: string;
  label: string;
  consequenceHint: string;
}

export interface StoryChapter {
  chapterNumber: number;
  title: string;
  narrative: string;
  chosenAction?: string;
  illustrationTheme: RealmTheme;
  choices: StoryChoice[];
}

export interface DreamWorld {
  id: string;
  prompt: string;
  worldName: string;
  worldDescription: string;
  settingVibe: string;
  theme: RealmTheme;
  source: 'ai' | 'example';
  characters: Character[];
  chapters: StoryChapter[];
  storyMoral: string;
  createdAt: string;
}

export interface ModerationResult {
  safe: boolean;
  reason?: string;
  gentleSuggestion?: string;
}

export interface PresetRealmMeta {
  id: Exclude<RealmTheme, 'custom'>;
  title: string;
  subtitle: string;
  promptSeed: string;
  accentBg: string;
  accentText: string;
  imageUrl: string;
  imageAlt: string;
}
