import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Tags, Users, ArrowRight } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';
import { Scene, ContentTag } from '../../types/story';

export const SceneBuilder: React.FC = () => {
  const { scenes, characters, addScene, updateScene } = useStoryStore();
  const [showForm, setShowForm] = useState(false);
  const [editingScene, setEditingScene] = useState<Partial<Scene> | null>(null);

  const contentTags: ContentTag[] = [
    { id: 'violence', name: 'Violence', category: 'violence', intensity: 3, color: 'red' },
    { id: 'gore', name: 'Gore', category: 'violence', intensity: 5, color: 'red' },
    { id: 'romance', name: 'Romance', category: 'romance', intensity: 2, color: 'pink' },
    { id: 'explicit', name: 'Explicit Content', category: 'romance', intensity: 5, color: 'pink' },
    { id: 'horror', name: 'Psychological Horror', category: 'horror', intensity: 4, color: 'purple' },
    { id: 'body-horror', name: 'Body Horror', category: 'horror', intensity: 5, color: 'purple' },
    { id: 'betrayal', name: 'Betrayal', category: 'psychological', intensity: 3, color: 'yellow' },
    { id: 'existential', name: 'Existential Crisis', category: 'philosophical', intensity: 3, color: 'blue' },
    { id: 'warfare', name: 'Space Warfare', category: 'action', intensity: 4, color: 'orange' },
  ];

  const sceneSettings = [
    'Abandoned Space Station', 'Alien Homeworld', 'Corporate Starship', 'Mining Colony',
    'Black Hole Research Facility', 'Pleasure Planet', 'Prison Ship', 'Unknown Artifact',
    'Derelict Battleship', 'Underground Alien City', 'Space Cantina', 'Medical Bay',
    'AI Core Chamber', 'Cargo Hold', 'Bridge', 'Escape Pod'
  ];

  const startNewScene = () => {
    setEditingScene({
      title: '',
      description: '',
      setting: sceneSettings[0],
      characters: [],
      choices: [],
      tags: [],
      position: { x: 0, y: 0 },
      connections: [],
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editingScene?.title) return;

    const sceneData = {
      title: editingScene.title,
      description: editingScene.description || '',
      setting: editingScene.setting || sceneSettings[0],
      characters: editingScene.characters || [],
      choices: editingScene.choices || [],
      tags: editingScene.tags || [],
      position: editingScene.position || { x: 0, y: 0 },
      connections: editingScene.connections || [],
    };

    if (editingScene.id) {
      updateScene(editingScene.id, sceneData);
    } else {
      addScene(sceneData);
    }

    setEditingScene(null);
    setShowForm(false);
  };

  const toggleTag = (tag: ContentTag) => {
    if (!editingScene) return;
    
    const currentTags = editingScene.tags || [];
    const hasTag = currentTags.some(t => t.id === tag.id);
    
    const newTags = hasTag
      ? currentTags.filter(t => t.id !== tag.id)
      : [...currentTags, tag];
    
    setEditingScene({ ...editingScene, tags: newTags });
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 2) return 'bg-yellow-500/20 text-yellow-300';
    if (intensity <= 3) return 'bg-orange-500/20 text-orange-300';
    return 'bg-red-500/20 text-red-300';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Scene Builder</h2>
        <motion.button
          onClick={startNewScene}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-4 w-4" />
          <span>Create Scene</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Scene List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Story Scenes</h3>
          <div className="space-y-3">
            {scenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700/70 transition-all"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setEditingScene(scene);
                  setShowForm(true);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded text-xs font-medium">
                        Scene {index + 1}
                      </span>
                    </div>
                    <h4 className="font-semibold text-white mt-2">{scene.title}</h4>
                    <p className="text-slate-300 text-sm">{scene.setting}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {scene.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`px-2 py-1 rounded text-xs font-medium ${getIntensityColor(tag.intensity)}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-slate-400 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{scene.characters.length} characters</span>
                  {scene.choices.length > 0 && (
                    <>
                      <ArrowRight className="h-4 w-4 ml-3 mr-1" />
                      <span>{scene.choices.length} choices</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scene Editor */}
        {showForm && editingScene && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-700/30 border border-purple-500/30 rounded-lg p-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Scene Title
                </label>
                <input
                  type="text"
                  value={editingScene.title || ''}
                  onChange={(e) => setEditingScene({ ...editingScene, title: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Enter scene title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Setting
                </label>
                <select
                  value={editingScene.setting || sceneSettings[0]}
                  onChange={(e) => setEditingScene({ ...editingScene, setting: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  {sceneSettings.map((setting) => (
                    <option key={setting} value={setting}>{setting}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Scene Description
                </label>
                <textarea
                  value={editingScene.description || ''}
                  onChange={(e) => setEditingScene({ ...editingScene, description: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none h-24 resize-none"
                  placeholder="Describe what happens in this scene... be as explicit or creative as you want."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  <Tags className="inline h-4 w-4 mr-1" />
                  Content Tags
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {contentTags.map((tag) => (
                    <motion.button
                      key={tag.id}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                        (editingScene.tags || []).some(t => t.id === tag.id)
                          ? getIntensityColor(tag.intensity).replace('/20', '/30')
                          : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{tag.name}</span>
                      <span className="text-xs opacity-70">★{tag.intensity}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleSave}
                disabled={!editingScene.title}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-600 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: editingScene.title ? 1.02 : 1 }}
                whileTap={{ scale: editingScene.title ? 0.98 : 1 }}
              >
                <span>Save Scene</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};