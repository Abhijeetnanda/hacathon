import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';
import { Character } from '../../types/story';

export const CharacterCreator: React.FC = () => {
  const { characters, addCharacter, updateCharacter, removeCharacter } = useStoryStore();
  const [editingCharacter, setEditingCharacter] = useState<Partial<Character> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const species = [
    'Human', 'Android', 'Alien Humanoid', 'Energy Being', 'Cybernetic Enhanced',
    'Alien Insectoid', 'AI Consciousness', 'Hybrid Species', 'Unknown Origin'
  ];

  const occupations = [
    'Space Mercenary', 'Bounty Hunter', 'Ship Captain', 'AI Specialist', 'Xenobiologist',
    'Corporate Assassin', 'Cult Leader', 'Smuggler', 'Military Commander', 'Exile',
    'Pleasure Android', 'Space Pirate', 'Research Scientist', 'Diplomat', 'Survivor'
  ];

  const traits = [
    'Ruthless', 'Seductive', 'Paranoid', 'Brilliant', 'Haunted', 'Charismatic',
    'Violent', 'Empathetic', 'Calculating', 'Unpredictable', 'Loyal', 'Betrayer',
    'Addicted', 'Fearless', 'Broken', 'Passionate', 'Cold', 'Desperate'
  ];

  const handleSave = () => {
    if (!editingCharacter?.name) return;

    const characterData = {
      name: editingCharacter.name,
      species: editingCharacter.species || 'Human',
      occupation: editingCharacter.occupation || 'Unknown',
      motivation: editingCharacter.motivation || '',
      traits: editingCharacter.traits || [],
      relationships: editingCharacter.relationships || [],
      appearance: editingCharacter.appearance || '',
      backstory: editingCharacter.backstory || '',
      morality: editingCharacter.morality || 'neutral' as const,
    };

    if (editingCharacter.id) {
      updateCharacter(editingCharacter.id, characterData);
    } else {
      addCharacter(characterData);
    }

    setEditingCharacter(null);
    setShowForm(false);
  };

  const startNewCharacter = () => {
    setEditingCharacter({
      name: '',
      species: 'Human',
      occupation: 'Space Mercenary',
      motivation: '',
      traits: [],
      relationships: [],
      appearance: '',
      backstory: '',
      morality: 'neutral',
    });
    setShowForm(true);
  };

  const toggleTrait = (trait: string) => {
    if (!editingCharacter) return;
    
    const currentTraits = editingCharacter.traits || [];
    const newTraits = currentTraits.includes(trait)
      ? currentTraits.filter(t => t !== trait)
      : [...currentTraits, trait];
    
    setEditingCharacter({ ...editingCharacter, traits: newTraits });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Character Creator</h2>
        <motion.button
          onClick={startNewCharacter}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-4 w-4" />
          <span>Create Character</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Character List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Your Characters</h3>
          <div className="space-y-3">
            {characters.map((character) => (
              <motion.div
                key={character.id}
                className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700/70 transition-all"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setEditingCharacter(character);
                  setShowForm(true);
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{character.name}</h4>
                    <p className="text-purple-300 text-sm">{character.species} • {character.occupation}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {character.traits.slice(0, 3).map((trait) => (
                        <span
                          key={trait}
                          className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCharacter(character.id);
                    }}
                    className="text-red-400 hover:text-red-300 p-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Character Editor */}
        {showForm && editingCharacter && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-700/30 border border-purple-500/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {editingCharacter.id ? 'Edit Character' : 'New Character'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Character Name
                </label>
                <input
                  type="text"
                  value={editingCharacter.name || ''}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Enter character name..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Species
                  </label>
                  <select
                    value={editingCharacter.species || 'Human'}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter, species: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    {species.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Occupation
                  </label>
                  <select
                    value={editingCharacter.occupation || 'Space Mercenary'}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter, occupation: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    {occupations.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Motivation
                </label>
                <textarea
                  value={editingCharacter.motivation || ''}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, motivation: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none h-20 resize-none"
                  placeholder="What drives this character?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Character Traits
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {traits.map((trait) => (
                    <motion.button
                      key={trait}
                      onClick={() => toggleTrait(trait)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        (editingCharacter.traits || []).includes(trait)
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {trait}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Backstory
                </label>
                <textarea
                  value={editingCharacter.backstory || ''}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, backstory: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none h-24 resize-none"
                  placeholder="Character's dark past, forbidden knowledge, or secret desires..."
                />
              </div>

              <motion.button
                onClick={handleSave}
                disabled={!editingCharacter.name}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-600 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: editingCharacter.name ? 1.02 : 1 }}
                whileTap={{ scale: editingCharacter.name ? 0.98 : 1 }}
              >
                <Save className="h-4 w-4" />
                <span>Save Character</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};