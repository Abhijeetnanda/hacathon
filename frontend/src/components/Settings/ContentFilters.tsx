import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useStoryStore } from '../../store/storyStore';

export const ContentFilters: React.FC = () => {
  const { contentFilters, toggleContentFilter } = useStoryStore();

  const filterCategories = [
    {
      id: 'violence' as const,
      name: 'Violence & Gore',
      description: 'Combat scenes, graphic violence, body horror',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'romance' as const,
      name: 'Romance & Sexuality',
      description: 'Intimate scenes, sexual content, romantic relationships',
      icon: Shield,
      color: 'pink'
    },
    {
      id: 'horror' as const,
      name: 'Horror & Terror',
      description: 'Psychological horror, terrifying scenarios, nightmare content',
      icon: Eye,
      color: 'purple'
    },
    {
      id: 'psychological' as const,
      name: 'Psychological Themes',
      description: 'Mental trauma, addiction, psychological manipulation',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      id: 'philosophical' as const,
      name: 'Philosophical Content',
      description: 'Existential questions, moral dilemmas, consciousness exploration',
      icon: Shield,
      color: 'blue'
    },
    {
      id: 'action' as const,
      name: 'Action & Warfare',
      description: 'Space battles, military conflicts, high-stakes action',
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, enabled: boolean) => {
    const baseClasses = enabled 
      ? `border-${color}-500/50 bg-${color}-600/20` 
      : 'border-slate-600/30 bg-slate-700/30';
    
    const textClasses = enabled 
      ? `text-${color}-300` 
      : 'text-slate-400';
    
    return `${baseClasses} ${textClasses}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-white">Content Filters</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Customize which mature content categories you want to see and interact with. 
          These filters affect plot generation, scene suggestions, and content warnings.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterCategories.map((category) => {
            const Icon = category.icon;
            const isEnabled = contentFilters[category.id];
            
            return (
              <motion.div
                key={category.id}
                className={`border rounded-lg p-6 transition-all cursor-pointer ${
                  isEnabled 
                    ? 'border-purple-500/50 bg-purple-600/20' 
                    : 'border-slate-600/30 bg-slate-700/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleContentFilter(category.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-6 w-6 ${
                      isEnabled ? 'text-purple-400' : 'text-slate-500'
                    }`} />
                    <div>
                      <h3 className={`font-semibold ${
                        isEnabled ? 'text-white' : 'text-slate-400'
                      }`}>
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    className={`p-2 rounded-lg ${
                      isEnabled 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-slate-600/20 text-slate-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {isEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </motion.div>
                </div>
                
                <p className={`text-sm ${
                  isEnabled ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {category.description}
                </p>
                
                <div className="mt-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    isEnabled 
                      ? 'bg-green-600/20 text-green-300' 
                      : 'bg-slate-600/20 text-slate-500'
                  }`}>
                    {isEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-8 bg-amber-900/20 border border-amber-500/30 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-300 mb-2">Content Warning System</h3>
              <p className="text-amber-200 text-sm leading-relaxed mb-3">
                Dark Cosmos is designed for mature audiences (18+) and allows unrestricted creative expression. 
                These filters help you control what content appears in your workspace, but do not restrict 
                what you can create or view.
              </p>
              <ul className="text-amber-200 text-sm space-y-1">
                <li>• Disabled filters hide related plot suggestions and scene templates</li>
                <li>• You can always manually create any content regardless of filter settings</li>
                <li>• Filters are personal preferences and don't affect story export or sharing</li>
                <li>• All exported stories include full content warnings</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};