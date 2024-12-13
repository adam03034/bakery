import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Shield, Settings, Users, Code, ChevronDown, ChevronUp, Layers } from 'lucide-react';

const DBMSSlide = () => {
  const [showDiagram, setShowDiagram] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const diagram = `classDiagram
    direction TB
    
    class vyrobky {
      +int id_vyrobok
      +char(4) id_typ_vyr
      +varchar(100) nazov_vyr
      +char(4) m_j
      +decimal velkost
      +decimal jed_c_s
    }
    
    class zlozenie {
      +int id_vyrobok
      +int id_surovina
      +decimal mnozstvo
      +char(4) m_j
    }
    
    class suroviny {
      +int id_surovina
      +char(4) id_typ_surovina
      +varchar(100) nazov_sur
      +char(4) m_j
      +decimal jed_c_s
    }
    
    class typ_vyr {
      +char(4) id_typ_vyr
      +varchar(100) nazov_typ_vyr
      +varchar(255) popis_vyr
    }
    
    class typ_sur {
      +char(4) id_typ_surovina
      +varchar(100) nazov_typ_sur
      +varchar(255) popis_sur
    }
    
    class m_j {
      +char(4) m_j
      +varchar(100) nazov_m_j
      +varchar(255) popis_m_j
    }
    
    vyrobky --> zlozenie
    suroviny --> zlozenie
    typ_vyr --> vyrobky
    typ_sur --> suroviny
    m_j --> vyrobky
    m_j --> suroviny
    m_j --> zlozenie`;

  return (
    <div className="min-h-screen bg-white p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hlavička */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            {...fadeIn}
          >
            Systém Riadenia Bázy Dát
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Praktické využitie v pekárenskej výrobe
          </motion.p>
        </div>

        {/* Hlavné sekcie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-gray-50 p-8 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            {...fadeIn}
          >
            <Database className="h-8 w-8 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Reálne Dáta</h2>
            <p className="text-gray-600">
              Vaša databáza obsahuje:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li className="pl-2">Komplexné receptúry výrobkov vrátane množstiev a merných jednotiek</li>
              <li className="pl-2">Evidenciu surovín s cenami a dodávateľmi</li>
              <li className="pl-2">Správu objednávok a ich stavov</li>
              <li className="pl-2">Hierarchiu typov výrobkov a surovín</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-gray-50 p-8 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            {...fadeIn}
          >
            <Code className="h-8 w-8 text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Funkcionalita</h2>
            <p className="text-gray-600">
              Systém umožňuje:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li className="pl-2">Automatickú kalkuláciu nákladov a marží pre každý výrobok</li>
              <li className="pl-2">Sledovanie stavu zásob a objednávok v reálnom čase</li>
              <li className="pl-2">Generovanie reportov o predaji a nákladoch</li>
              <li className="pl-2">Správu receptúr a výrobných postupov</li>
            </ul>
          </motion.div>
        </div>

        {/* Vizualizácia */}
        <motion.div 
          className="bg-gray-50 p-8 rounded-xl shadow-lg mb-12"
          {...fadeIn}
        >
          <div 
            className="flex justify-between items-center cursor-pointer mb-6"
            onClick={() => setShowDiagram(!showDiagram)}
          >
            <div className="flex items-center gap-3">
              <Layers className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Vizualizácia Databázovej Štruktúry</h2>
            </div>
            <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
              {showDiagram ? (
                <>
                  Skryť štruktúru
                  <ChevronUp className="h-5 w-5" />
                </>
              ) : (
                <>
                  Zobraziť štruktúru
                  <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
          
          <AnimatePresence>
            {showDiagram && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <pre className="mermaid">
                    {diagram}
                  </pre>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Legenda:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Typy dát:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>int - celé číslo</li>
                          <li>decimal - desatinné číslo</li>
                          <li>varchar - text premenlivej dĺžky</li>
                          <li>char - text pevnej dĺžky</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">Vzťahy:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>Šípka znázorňuje prepojenie tabuliek</li>
                          <li>Hlavná tabuľka → Závislá tabuľka</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Výhody */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          {...fadeIn}
        >
          <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Integrita Dát</h3>
            <p className="text-gray-600">Zabezpečenie presnosti a konzistencie všetkých údajov v systéme</p>
          </div>
          
          <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg">
            <Settings className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Automatizácia</h3>
            <p className="text-gray-600">Automatické výpočty a generovanie potrebných reportov</p>
          </div>
          
          <div className="text-center bg-gray-50 p-8 rounded-xl shadow-lg">
            <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Tímová Práca</h3>
            <p className="text-gray-600">Efektívna spolupráca a zdieľanie informácií v reálnom čase</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DBMSSlide;