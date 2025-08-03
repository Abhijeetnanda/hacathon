import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Film, 
  Zap, 
  Settings, 
  Download,
  ChevronRight,
  ChevronDown,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuSections = [
    {
      id: 'main',
      title: 'Story Builder',
      items: [
        { id: 'characters', icon: Users, label: 'Characters', count: 0 },
        { id: 'scenes', icon: Film, label: 'Scenes', count: 0 },
        { id: 'plot', icon: Zap, label: 'Plot Generator' },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Export',
      items: [
        { id: 'preview', icon: Film, label: 'Live Preview' },
        { id: 'export', icon: Download, label: 'Export Story' },
        { id: 'settings', icon: Settings, label: 'Content Filters' },
      ]
    }
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-slate-800/95 backdrop-blur-md border-r border-purple-500/20 h-full overflow-y-auto"
    >
      <div className="p-6">
        <motion.button
          onClick={() => setActiveTab('new-story')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-5 w-5" />
          <span>New Story</span>
        </motion.button>
      </div>

      <nav className="px-6 pb-6">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-6">
            <motion.button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-purple-300 hover:text-white transition-colors mb-3"
              whileHover={{ x: 4 }}
            >
              <span className="font-semibold text-sm uppercase tracking-wider">
                {section.title}
              </span>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </motion.button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                          activeTab === item.id
                            ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className="bg-slate-600 text-slate-200 px-2 py-1 rounded-full text-xs">
                            {item.count}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </motion.aside>
  );
};