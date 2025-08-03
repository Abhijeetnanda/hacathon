export interface Character {
  id: string;
  name: string;
  species: string;
  occupation: string;
  motivation: string;
  traits: string[];
  relationships: Relationship[];
  appearance: string;
  backstory: string;
  morality: 'heroic' | 'neutral' | 'villainous' | 'complex';
}

export interface Relationship {
  characterId: string;
  type: 'ally' | 'enemy' | 'lover' | 'rival' | 'unknown';
  description: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  setting: string;
  characters: string[];
  choices: Choice[];
  tags: ContentTag[];
  position: { x: number; y: number };
  connections: string[];
}

export interface Choice {
  id: string;
  text: string;
  consequence: string;
  nextSceneId?: string;
}

export interface ContentTag {
  id: string;
  name: string;
  category: 'violence' | 'romance' | 'horror' | 'psychological' | 'philosophical' | 'action';
  intensity: 1 | 2 | 3 | 4 | 5;
  color: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  characters: Character[];
  scenes: Scene[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: ContentTag[];
}

export interface StoryState {
  currentStory: Story | null;
  characters: Character[];
  scenes: Scene[];
  contentFilters: {
    violence: boolean;
    romance: boolean;
    horror: boolean;
    psychological: boolean;
    philosophical: boolean;
    action: boolean;
  };
  isPrivateMode: boolean;
}