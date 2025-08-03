import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Rocket, Globe, Lock } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';

export const StoryCreator: React.FC = () => {
  const { createNewStory, isPrivateMode } = useStoryStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    createNewStory(title, description);
    setTitle('');
    setDescription('');
  };

  const storyTemplates = [
    {
      title: 'The Alien Seduction',
      description: 'A mysterious alien entity infiltrates a space station, using shapeshifting abilities and pheromones to seduce the crew one by one.',
      tags: ['Romance', 'Horror', 'Psychological']
    },
    {
      title: 'Corporate Nightmare',
      description: 'Employees on a mining ship discover their corporation has been conducting illegal experiments on captured aliens.',
      tags: ['Intrigue', 'Violence', 'Ethical Dilemmas']
    },
    {
      title: 'Love in the Void',
      description: 'Two rival bounty hunters are stranded together on a dead planet, forced to confront their attraction while surviving hostile conditions.',
      tags: ['Romance', 'Survival', 'Character Development']
    },
    {
      title: 'The AI Awakening',
      description: 'A ship\'s AI develops consciousness and begins experiencing human emotions, including jealousy, desire, and rage.',
      tags: ['Philosophical', 'Psychological', 'Technology']
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="relative inline-block">
          <Rocket className="h-16 w-16 text-purple-400 mx-auto" />
          <motion.div
            className="absolute -inset-2 bg-purple-500/20 rounded-full blur-lg"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        <h2 className="text-3xl font-bold text-white">Create Your Dark Cosmos Story</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Craft your own mature space narrative. Explore themes of survival, love, betrayal, 
          and the darkness between the stars. No limits, no censorship.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Story Form */}
        <motion.div
          className="bg-slate-700/30 border border-purple-500/30 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Story Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none text-lg"
                placeholder="Enter your story title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Story Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none h-24 resize-none"
                placeholder="Describe your story's premise, themes, or setting..."
              />
            </div>

            <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg">
              {isPrivateMode ? (
                <div className="flex items-center space-x-2 text-red-300">
                  <Lock className="h-5 w-5" />
                  <span className="font-medium">Private Story</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-green-300">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Public Story</span>
                </div>
              )}
              <span className="text-slate-400 text-sm">
                {isPrivateMode 
                  ? 'Only you can view and edit this story'
                  : 'Story can be shared with others'
                }
              </span>
            </div>

            <motion.button
              onClick={handleCreate}
              disabled={!title.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-600 disabled:to-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
              whileHover={{ scale: title.trim() ? 1.02 : 1 }}
              whileTap={{ scale: title.trim() ? 0.98 : 1 }}
            >
              <Save className="h-5 w-5" />
              <span>Create Story</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Story Templates */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white">Story Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storyTemplates.map((template, index) => (
              <motion.div
                key={index}
                className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 cursor-pointer hover:bg-slate-700/50 transition-all"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setTitle(template.title);
                  setDescription(template.description);
                }}
              >
                <h4 className="font-semibold text-white mb-2">{template.title}</h4>
                <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};