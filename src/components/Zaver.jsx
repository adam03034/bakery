import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConclusionSection = () => {
  const [selectedBenefitItem, setSelectedBenefitItem] = useState(null);
  const [selectedDevelopmentItem, setSelectedDevelopmentItem] = useState(null);
  const [hoveredBenefitItem, setHoveredBenefitItem] = useState(null);
  const [hoveredDevelopmentItem, setHoveredDevelopmentItem] = useState(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
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

  const renderItemList = (
    items, 
    baseColor, 
    title, 
    selectedItem, 
    setSelectedItem, 
    hoveredItem, 
    setHoveredItem
  ) => (
    <motion.div 
      variants={sectionVariants}
      className={`bg-gradient-to-br from-${baseColor}-50 to-purple-50 p-6 rounded-lg shadow-lg relative overflow-hidden`}
    >
      <motion.h3 
        className={`font-bold text-lg ${baseColor === 'blue' ? 'text-blue-700' : 'text-green-700'} mb-3 relative z-10`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li 
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => setSelectedItem(selectedItem === index ? null : index)}
            onHoverStart={() => setHoveredItem(index)}
            onHoverEnd={() => setHoveredItem(null)}
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-all duration-300 
              ${hoveredItem === index ? 'bg-opacity-20 bg-blue-200' : ''}
              ${selectedItem === index ? 'ring-2 ring-blue-300' : ''}`}
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-grow">
              <span className={`${item.color} font-medium`}>{item.text}</span>
            </div>
            {hoveredItem === index && (
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-sm text-gray-600 hidden md:block"
              >
                ℹ️
              </motion.span>
            )}
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`absolute inset-0 bg-gradient-to-br from-${baseColor}-100 to-purple-100 p-6 z-20 overflow-hidden`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-0 right-0 text-2xl text-gray-600 hover:text-gray-800"
              >
                ✖️
              </button>
              <h4 className={`font-bold text-md ${baseColor === 'blue' ? 'text-blue-700' : 'text-green-700'} mb-2`}>
                {items[selectedItem].text}
              </h4>
              <p className="text-gray-700">
                {items[selectedItem].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        'blue', 
        'Prínosy systému',
        selectedBenefitItem,
        setSelectedBenefitItem,
        hoveredBenefitItem,
        setHoveredBenefitItem
      )}
      {renderItemList(
        developmentItems, 
        'green', 
        'Ďalší rozvoj',
        selectedDevelopmentItem,
        setSelectedDevelopmentItem,
        hoveredDevelopmentItem,
        setHoveredDevelopmentItem
      )}
    </motion.div>
  );
};

export default ConclusionSection;