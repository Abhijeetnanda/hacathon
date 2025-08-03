import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { SpaceBackground } from './components/Background/SpaceBackground';
import { CharacterCreator } from './components/Characters/CharacterCreator';
import { SceneBuilder } from './components/Scenes/SceneBuilder';
import { PlotGenerator } from './components/Plot/PlotGenerator';
import { StoryCreator } from './components/Story/StoryCreator';
import { StoryPreview } from './components/Preview/StoryPreview';
import { ExportManager } from './components/Export/ExportManager';
import { ContentFilters } from './components/Settings/ContentFilters';
import { useStoryStore } from './store/storyStore';

function App() {
  const [activeTab, setActiveTab] = useState('new-story');
  const { currentStory } = useStoryStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'new-story':
        return <StoryCreator />;
      case 'characters':
        return <CharacterCreator />;
      case 'scenes':
        return <SceneBuilder />;
      case 'plot':
        return <PlotGenerator />;
      case 'preview':
        return <StoryPreview />;
      case 'export':
        return <ExportManager />;
      case 'settings':
        return <ContentFilters />;
      default:
        return <StoryCreator />;
    }
  };

  const getContentTitle = () => {
    if (!currentStory && activeTab !== 'new-story' && activeTab !== 'settings') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-slate-400">
            <h3 className="text-xl font-semibold mb-2">Create a Story First</h3>
            <p>Start by creating a new story to access all building tools.</p>
            <motion.button
              onClick={() => setActiveTab('new-story')}
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your First Story
            </motion.button>
          </div>
        </motion.div>
      );
    }
    return renderContent();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1 overflow-y-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {getContentTitle()}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Atmospheric overlay */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-slate-900/20" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

export default App;