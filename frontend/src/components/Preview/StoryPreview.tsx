import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Users, Tags } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';

export const StoryPreview: React.FC = () => {
  const { currentStory, characters, scenes } = useStoryStore();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!currentStory || scenes.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-slate-400">
          <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Scenes to Preview</h3>
          <p>Create some scenes to see your story come to life.</p>
        </div>
      </div>
    );
  }

  const currentScene = scenes[currentSceneIndex];

  const nextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const getTagColor = (intensity: number) => {
    if (intensity <= 2) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    if (intensity <= 3) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live Story Preview</h2>
        <div className="text-slate-400 text-sm">
          Scene {currentSceneIndex + 1} of {scenes.length}
        </div>
      </div>

      {/* Story Controls */}
      <div className="flex items-center justify-center space-x-4">
        <motion.button
          onClick={prevScene}
          disabled={currentSceneIndex === 0}
          className="p-3 rounded-lg bg-slate-700/50 text-white disabled:text-slate-500 disabled:bg-slate-800/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SkipBack className="h-5 w-5" />
        </motion.button>

        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </motion.button>

        <motion.button
          onClick={nextScene}
          disabled={currentSceneIndex === scenes.length - 1}
          className="p-3 rounded-lg bg-slate-700/50 text-white disabled:text-slate-500 disabled:bg-slate-800/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SkipForward className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Scene Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-700/30 border border-purple-500/30 rounded-lg overflow-hidden"
        >
          {/* Scene Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentScene.title}</h3>
                <p className="text-purple-200">{currentScene.setting}</p>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-sm">Scene {currentSceneIndex + 1}</div>
              </div>
            </div>

            {/* Content Tags */}
            {currentScene.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {currentScene.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(tag.intensity)}`}
                  >
                    {tag.name} ★{tag.intensity}
                  </span>
                ))}
              </div>
            )}

            {/* Characters in Scene */}
            {currentScene.characters.length > 0 && (
              <div className="flex items-center space-x-2 text-slate-300">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  Characters: {currentScene.characters.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Scene Content */}
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-200 leading-relaxed text-lg">
                {currentScene.description || 'No description provided for this scene.'}
              </p>
            </div>

            {/* Scene Choices */}
            {currentScene.choices.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-lg font-semibold text-purple-300">Story Choices</h4>
                {currentScene.choices.map((choice) => (
                  <motion.div
                    key={choice.id}
                    className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4 cursor-pointer hover:bg-slate-800/70 transition-all"
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <p className="text-white font-medium mb-2">{choice.text}</p>
                    {choice.consequence && (
                      <p className="text-slate-400 text-sm italic">
                        → {choice.consequence}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="bg-slate-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 text-sm">Story Progress</span>
          <span className="text-slate-300 text-sm">
            {Math.round(((currentSceneIndex + 1) / scenes.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSceneIndex + 1) / scenes.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};