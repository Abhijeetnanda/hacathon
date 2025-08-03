import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Story, Character, Scene, StoryState, ContentTag } from '../types/story';

interface StoryStore extends StoryState {
  setCurrentStory: (story: Story | null) => void;
  addCharacter: (character: Omit<Character, 'id'>) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
  addScene: (scene: Omit<Scene, 'id'>) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  removeScene: (id: string) => void;
  toggleContentFilter: (filter: keyof StoryState['contentFilters']) => void;
  setPrivateMode: (isPrivate: boolean) => void;
  createNewStory: (title: string, description: string) => void;
  exportStory: (format: 'pdf' | 'script' | 'json') => void;
}

export const useStoryStore = create<StoryStore>((set, get) => ({
  currentStory: null,
  characters: [],
  scenes: [],
  contentFilters: {
    violence: true,
    romance: true,
    horror: true,
    psychological: true,
    philosophical: true,
    action: true,
  },
  isPrivateMode: false,

  setCurrentStory: (story) => set({ currentStory: story }),

  addCharacter: (characterData) => {
    const character: Character = {
      ...characterData,
      id: uuidv4(),
    };
    set((state) => ({
      characters: [...state.characters, character],
    }));
  },

  updateCharacter: (id, updates) => {
    set((state) => ({
      characters: state.characters.map((char) =>
        char.id === id ? { ...char, ...updates } : char
      ),
    }));
  },

  removeCharacter: (id) => {
    set((state) => ({
      characters: state.characters.filter((char) => char.id !== id),
    }));
  },

  addScene: (sceneData) => {
    const scene: Scene = {
      ...sceneData,
      id: uuidv4(),
    };
    set((state) => ({
      scenes: [...state.scenes, scene],
    }));
  },

  updateScene: (id, updates) => {
    set((state) => ({
      scenes: state.scenes.map((scene) =>
        scene.id === id ? { ...scene, ...updates } : scene
      ),
    }));
  },

  removeScene: (id) => {
    set((state) => ({
      scenes: state.scenes.filter((scene) => scene.id !== id),
    }));
  },

  toggleContentFilter: (filter) => {
    set((state) => ({
      contentFilters: {
        ...state.contentFilters,
        [filter]: !state.contentFilters[filter],
      },
    }));
  },

  setPrivateMode: (isPrivate) => set({ isPrivateMode: isPrivate }),

  createNewStory: (title, description) => {
    const story: Story = {
      id: uuidv4(),
      title,
      description,
      characters: [],
      scenes: [],
      isPrivate: get().isPrivateMode,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
    };
    set({ currentStory: story, characters: [], scenes: [] });
  },

  exportStory: (format) => {
    const { currentStory, characters, scenes } = get();
    if (!currentStory) return;

    const storyData = {
      ...currentStory,
      characters,
      scenes,
    };

    if (format === 'json') {
      const dataStr = JSON.stringify(storyData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentStory.title}.json`;
      link.click();
    }
  },
}));