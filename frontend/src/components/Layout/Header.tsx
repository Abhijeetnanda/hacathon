import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Eye, EyeOff } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';

export const Header: React.FC = () => {
  const { isPrivateMode, setPrivateMode, currentStory } = useStoryStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20 px-6 py-4"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <Rocket className="h-8 w-8 text-purple-400" />
            <motion.div
              className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Dark Cosmos</h1>
            <p className="text-purple-300 text-sm">18+ Space Story Builder</p>
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          {currentStory && (
            <div className="text-white">
              <span className="text-purple-300">Story:</span> {currentStory.title}
            </div>
          )}
          
          <motion.button
            onClick={() => setPrivateMode(!isPrivateMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              isPrivateMode 
                ? 'bg-red-600/20 text-red-300 border border-red-500/30' 
                : 'bg-slate-700/50 text-slate-300 border border-slate-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPrivateMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{isPrivateMode ? 'Private' : 'Public'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 text-amber-400">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">18+</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};