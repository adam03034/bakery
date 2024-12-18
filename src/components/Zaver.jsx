import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConclusionSection = () => {
  const [selectedBenefitItem, setSelectedBenefitItem] = useState(null);
  const [selectedDevelopmentItem, setSelectedDevelopmentItem] = useState(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const benefitItems = [
    { 
      icon: "✨", 
      text: "Efektívna správa dát", 
      color: "text-blue-700",
      description: "Centralizovaný systém pre rýchly a prehľadný manažment dát."
    },
    { 
      icon: "📊", 
      text: "Presná evidencia", 
      color: "text-blue-700",
      description: "Automatizované sledovanie a zaznamenávanie všetkých kľúčových ukazovateľov."
    },
    { 
      icon: "💡", 
      text: "Optimalizácia nákladov", 
      color: "text-blue-700",
      description: "Inteligentné nástroje na identifikáciu úspor a efektívneho vynakladania zdrojov."
    },
    { 
      icon: "📈", 
      text: "Podpora rozhodovania", 
      color: "text-blue-700",
      description: "Komplexné analytické nástroje pre informované strategické rozhodnutia."
    }
  ];

  const developmentItems = [
    { 
      icon: "🔄", 
      text: "Automatické objednávky", 
      color: "text-green-700",
      description: "Inteligentný systém na automatizáciu nákupných procesov."
    },
    { 
      icon: "📱", 
      text: "Mobilná aplikácia", 
      color: "text-green-700",
      description: "Plne funkčná mobilná verzia pre efektívne využitie."
    },
    { 
      icon: "🤖", 
      text: "Prediktívna analýza", 
      color: "text-green-700",
      description: "Pokročilé algoritmy pre predpovedanie budúcich trendov a potrieb."
    }
  ];

  const renderItemList = (items, type, title, selectedItem, setSelectedItem) => (
    <motion.div 
      variants={sectionVariants}
      className={`${type === 'benefit' ? 'bg-blue-50' : 'bg-green-50'} p-6 rounded-lg shadow-lg`}
    >
      <motion.h3 
        className={`font-bold text-lg ${type === 'benefit' ? 'text-blue-700' : 'text-green-700'} mb-4`}
      >
        {title}
      </motion.h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-white bg-opacity-80 rounded-lg shadow-sm"
          >
            <div
              onClick={() => setSelectedItem(selectedItem === index ? null : index)}
              className={`flex items-center p-4 cursor-pointer ${
                selectedItem === index ? 'rounded-t-lg' : 'rounded-lg'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className={`${item.color} font-medium`}>{item.text}</span>
              {selectedItem === index && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(null);
                  }}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                >
                  ✖️
                </button>
              )}
            </div>
            <AnimatePresence>
              {selectedItem === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 overflow-hidden"
                >
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4"
    >
      {renderItemList(
        benefitItems, 
        'benefit',
        'Prínosy systému',
        selectedBenefitItem,
        setSelectedBenefitItem
      )}
      {renderItemList(
        developmentItems, 
        'development',
        'Ďalší rozvoj',
        selectedDevelopmentItem,
        setSelectedDevelopmentItem
      )}
    </motion.div>
  );
};

export default ConclusionSection;