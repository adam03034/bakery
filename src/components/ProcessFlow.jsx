import React, { useState } from 'react';
import { ClipboardList, Truck, Cookie, ShoppingCart, Store, ChevronDown, Code2 } from 'lucide-react';

const CodeBlock = ({ code }) => (
  <div className="bg-gray-900 text-gray-100 p-4 rounded-md mt-4 text-sm overflow-x-auto">
    <pre>{code}</pre>
  </div>
);

const ProcessFlow = () => {
  const [expandedCode, setExpandedCode] = useState(null);

  const toggleCode = (step) => {
    if (expandedCode === step) {
      setExpandedCode(null);
    } else {
      setExpandedCode(step);
    }
  };

  return (
    <div className="w-full p-8 bg-gradient-to-br from-amber-50 to-blue-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-amber-800 mb-8 text-center">Výrobný proces - od objednávky po dodanie</h2>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Objednávka surovín */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <ClipboardList className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">1. Objednávka surovín</h3>
              <p className="text-gray-600 text-sm">Vytvorenie objednávacieho listu (dodaci_list)</p>
            </div>
            <button 
              onClick={() => toggleCode('step1')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Code2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {expandedCode === 'step1' && (
            <CodeBlock code={`-- Vytvorenie novej objednávky surovín
INSERT INTO dodaci_list (id_dodavka, datum_obj, datum_dor, stav, id_dodavatel, cena_dodavka)
VALUES (9, '20241215', '20241220', 'v procese', 1, 450.00);

-- Pridanie položiek do dodávky
INSERT INTO dodavky (id_dodavka, id_surovina, mnozstvo, m_j)
VALUES 
    (9, 1, 200, 'kg'),  -- Pšeničná múka
    (9, 6, 50, 'kg');   -- Maslo`} />
          )}
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400" />

        {/* Dodávateľ a dodávka */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">2. Dodanie surovín</h3>
              <p className="text-gray-600 text-sm">Spracovanie dodávky od dodávateľa</p>
            </div>
            <button 
              onClick={() => toggleCode('step2')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Code2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {expandedCode === 'step2' && (
            <CodeBlock code={`-- Kontrola dodaných surovín
SELECT 
    s.nazov_sur,
    s.m_j,
    d.mnozstvo as objednane_mnozstvo,
    s.jed_c_s as jednotkova_cena
FROM dodavky d
JOIN suroviny s ON d.id_surovina = s.id_surovina
WHERE d.id_dodavka = 9;`} />
          )}
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400" />

        {/* Výrobný proces */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Cookie className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">3. Výroba produktov</h3>
              <p className="text-gray-600 text-sm">Spracovanie surovín podľa receptúry</p>
            </div>
            <button 
              onClick={() => toggleCode('step3')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Code2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="ml-14 mt-4 space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <span>Príprava cesta (múka + kypriace látky)</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <span>Miesenie a tvarovanie</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <span>Pečenie a dokončenie</span>
            </div>
          </div>
          
          {expandedCode === 'step3' && (
            <CodeBlock code={`-- Kontrola receptúry pre výrobok
SELECT 
    v.nazov_vyr,
    s.nazov_sur,
    z.mnozstvo,
    z.m_j
FROM zlozenie z
JOIN vyrobky v ON z.id_vyrobok = v.id_vyrobok
JOIN suroviny s ON z.id_surovina = s.id_surovina
WHERE v.id_vyrobok = 7  -- Vanilkový koláč
ORDER BY s.nazov_sur;`} />
          )}
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400" />

        {/* Objednávka zákazníka */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">4. Objednávka zákazníka</h3>
              <p className="text-gray-600 text-sm">Spracovanie objednávky (objednavky_list)</p>
            </div>
            <button 
              onClick={() => toggleCode('step4')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Code2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {expandedCode === 'step4' && (
            <CodeBlock code={`-- Vytvorenie objednávky zákazníka
INSERT INTO objednavky_list (id_objednavka, id_odberatel, datum_obj, stav, datum_dor, cena_objednavka)
VALUES (10, 1, '20241216', 'Nová', '20241220', 185.50);

-- Pridanie položiek do objednávky
INSERT INTO objednavky (id_objednavka, id_vyrobok, mnozstvo, m_j)
VALUES 
    (10, 7, 15, 'ks'),  -- Vanilkový koláč
    (10, 8, 10, 'ks');  -- Škoricové slimáky`} />
          )}
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400" />

        {/* Dodanie zákazníkovi */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Store className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">5. Dodanie zákazníkovi</h3>
              <p className="text-gray-600 text-sm">Doručenie objednávky odberateľovi</p>
            </div>
            <button 
              onClick={() => toggleCode('step5')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Code2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {expandedCode === 'step5' && (
            <CodeBlock code={`-- Aktualizácia stavu objednávky
UPDATE objednavky_list
SET stav = 'Dodaná',
    datum_dor = '20241220'
WHERE id_objednavka = 10;

-- Kontrola marže z objednávky
SELECT 
    v.nazov_vyr,
    o.mnozstvo as pocet_kusov,
    v.jed_c_s as predajna_cena,
    (v.jed_c_s * o.mnozstvo) as celkova_cena
FROM objednavky o
JOIN vyrobky v ON o.id_vyrobok = v.id_vyrobok
WHERE o.id_objednavka = 10;`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;