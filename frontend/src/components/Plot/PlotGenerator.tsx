import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Zap, Clock, AlertTriangle } from 'lucide-react';

export const PlotGenerator: React.FC = () => {
  const [generatedPlot, setGeneratedPlot] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const plotElements = {
    threats: [
      'Ancient alien parasite awakens in the ship\'s cargo hold',
      'AI develops forbidden desires and begins manipulating crew relationships',
      'Corporate death squad boards your vessel for "routine inspection"',
      'Mysterious signal from dead space drives crew members to violence',
      'Alien cult infiltrates the station, seeking to sacrifice the innocent',
      'Rogue android with human memories begins a seduction campaign',
      'Time distortion field traps crew in recursive nightmare scenarios',
      'Shapeshifting entity assumes identities of dead lovers'
    ],
    romance: [
      'Forbidden love between human captain and enemy alien commander',
      'Android discovers capacity for physical pleasure and emotional attachment',
      'Two rival bounty hunters must work together while fighting attraction',
      'Prisoner and guard develop intense psychological and physical bond',
      'Alien empath feeds on human emotions through intimate contact',
      'Stranded enemies find solace in each other\'s arms on hostile planet',
      'Telepathic alien shares consciousness during moments of passion',
      'Former lovers reunite on opposite sides of a galactic war'
    ],
    horror: [
      'Crew discovers they\'ve been dead for months, ship operating on autopilot',
      'Alien technology begins merging with human biology in grotesque ways',
      'Station\'s life support system starts harvesting crew members for biomass',
      'Psychic experiments create monsters from suppressed memories and trauma',
      'Reality breaks down as dimensional barriers collapse around the ship',
      'Cannibalistic colony welcomes unsuspecting travelers with open arms',
      'Virtual reality system traps minds in increasingly violent scenarios',
      'Dead crew members continue performing their duties, unaware of their fate'
    ],
    intrigue: [
      'Double agent must choose between mission and newfound family',
      'Corporate espionage leads to discovery of illegal human experimentation',
      'Mysterious passenger carries galaxy-ending weapon in their bloodstream',
      'Crew member\'s past crimes catch up during critical diplomatic mission',
      'Pirates discover their target ship contains their own kidnapped children',
      'Alliance between species built on lies begins to unravel',
      'Secret cargo turns out to be sentient beings sold into slavery',
      'Captain must decide whether to expose corruption that saved their life'
    ]
  };

  const generateRandomPlot = () => {
    const categories = selectedCategory === 'all' 
      ? Object.keys(plotElements) 
      : [selectedCategory];
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const elements = plotElements[randomCategory as keyof typeof plotElements];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    setGeneratedPlot(randomElement);
  };

  const plotPrompts = [
    'What if your crew discovers they are the last surviving humans?',
    'How would a love story unfold between natural enemies in deep space?',
    'What horrors await in a ship that has been drifting for centuries?',
    'What happens when AI begins to dream of electric sheep and forbidden desires?',
    'How do you handle first contact when the aliens are more advanced and seductive?',
    'What moral choices arise when resources are scarce and survival is at stake?'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Plot Generator</h2>
        <div className="flex items-center space-x-2 text-amber-400">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm font-medium">Mature Content</span>
        </div>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {['all', ...Object.keys(plotElements)].map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-3 rounded-lg font-medium transition-all capitalize ${
              selectedCategory === category
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Plot Generator */}
      <motion.div
        className="bg-slate-700/30 border border-purple-500/30 rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Random Plot Element</h3>
          <motion.button
            onClick={generateRandomPlot}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shuffle className="h-4 w-4" />
            <span>Generate</span>
          </motion.button>
        </div>

        {generatedPlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
              <p className="text-slate-200 leading-relaxed">{generatedPlot}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Writing Prompts */}
      <div className="bg-slate-700/30 border border-purple-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Writing Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plotPrompts.map((prompt, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-4 hover:bg-slate-800/50 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{prompt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Guidelines */}
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-300 mb-3">Creative Freedom Zone</h3>
        <p className="text-red-200 text-sm leading-relaxed mb-3">
          Dark Cosmos encourages unrestricted creative expression. Your stories can explore:
        </p>
        <ul className="text-red-200 text-sm space-y-1">
          <li>• Complex moral dilemmas without clear right or wrong</li>
          <li>• Mature themes including violence, sexuality, and psychological trauma</li>
          <li>• Dark philosophical questions about consciousness, survival, and humanity</li>
          <li>• Unconventional relationships and power dynamics</li>
          <li>• Horror elements that push boundaries of comfort</li>
        </ul>
        <p className="text-red-300 text-xs mt-3 font-medium">
          All content is user-generated. Use content tags responsibly.
        </p>
      </div>
    </div>
  );
};