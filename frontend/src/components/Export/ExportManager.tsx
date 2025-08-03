import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Code, Share2, Copy } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';

export const ExportManager: React.FC = () => {
  const { currentStory, characters, scenes, exportStory } = useStoryStore();
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'script' | 'json'>('script');
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const exportFormats = [
    {
      id: 'script' as const,
      name: 'Script Format',
      description: 'Export as a readable script with scene descriptions and character dialogue',
      icon: FileText,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'json' as const,
      name: 'JSON Data',
      description: 'Export raw story data for backup or import into other tools',
      icon: Code,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'pdf' as const,
      name: 'PDF Document',
      description: 'Professional document format for sharing or printing',
      icon: FileText,
      color: 'from-red-600 to-pink-600'
    }
  ];

  const handleExport = () => {
    if (!currentStory) return;
    exportStory(selectedFormat);
  };

  const generateShareUrl = () => {
    if (!currentStory) return;
    
    // In a real app, this would generate a proper shareable URL
    const mockUrl = `https://dark-cosmos.app/story/${currentStory.id}`;
    setShareUrl(mockUrl);
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      // In a real app, show a toast notification
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (!currentStory) {
    return (
      <div className="p-6 text-center">
        <div className="text-slate-400">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Story to Export</h3>
          <p>Create a story first to access export options.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Export & Share</h2>

      {/* Story Overview */}
      <motion.div
        className="bg-slate-700/30 border border-purple-500/30 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">{currentStory.title}</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-400">{characters.length}</div>
            <div className="text-slate-300 text-sm">Characters</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-cyan-400">{scenes.length}</div>
            <div className="text-slate-300 text-sm">Scenes</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">
              {scenes.reduce((acc, scene) => acc + scene.choices.length, 0)}
            </div>
            <div className="text-slate-300 text-sm">Choices</div>
          </div>
        </div>
      </motion.div>

      {/* Export Formats */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-300">Export Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportFormats.map((format) => {
            const Icon = format.icon;
            return (
              <motion.button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  selectedFormat === format.id
                    ? 'border-purple-500/50 bg-purple-600/20'
                    : 'border-slate-600/50 bg-slate-700/30 hover:bg-slate-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="h-8 w-8 text-purple-400 mb-3" />
                <h4 className="font-semibold text-white mb-1">{format.name}</h4>
                <p className="text-slate-300 text-sm">{format.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Export Button */}
      <motion.button
        onClick={handleExport}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download className="h-5 w-5" />
        <span>Export as {exportFormats.find(f => f.id === selectedFormat)?.name}</span>
      </motion.button>

      {/* Share Options */}
      {!currentStory.isPrivate && (
        <motion.div
          className="bg-slate-700/30 border border-cyan-500/30 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Share Your Story</h3>
          
          {!shareUrl ? (
            <motion.button
              onClick={generateShareUrl}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="h-5 w-5" />
              <span>Generate Share Link</span>
            </motion.button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-3">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-slate-300 text-sm focus:outline-none"
                />
                <motion.button
                  onClick={copyToClipboard}
                  className="text-cyan-400 hover:text-cyan-300 p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="text-slate-400 text-xs">
                Share this link with others to let them read your story
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};