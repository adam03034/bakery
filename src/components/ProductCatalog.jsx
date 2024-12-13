import React, { useState } from 'react';

const ProductCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productData = {
    'Kváskový ražný chlieb': {
      nazov_vyr: 'Kváskový ražný chlieb',
      typ: 'CH',
      zlozenie: [
        { nazov_sur: "Kvások", mnozstvo: 0.20, m_j: "kg", cena: 1.50 },
        { nazov_sur: "Ražná múka", mnozstvo: 0.60, m_j: "kg", cena: 1.20 },
        { nazov_sur: "Soľ", mnozstvo: 0.02, m_j: "kg", cena: 0.45 }
      ],
      naklady_na_suroviny: 1.03,
      predajna_cena: 5.50,
      marza: 4.47,
      velkost: 1.00,
      m_j: "kg"
    },
    'Špaldový chlieb': {
      nazov_vyr: 'Špaldový chlieb',
      typ: 'CH',
      zlozenie: [
        { nazov_sur: "Špaldová múka", mnozstvo: 0.80, m_j: "kg", cena: 2.30 },
        { nazov_sur: "Droždie", mnozstvo: 0.02, m_j: "kg", cena: 2.80 },
        { nazov_sur: "Soľ", mnozstvo: 0.02, m_j: "kg", cena: 0.45 }
      ],
      naklady_na_suroviny: 1.91,
      predajna_cena: 6.00,
      marza: 4.09,
      velkost: 0.80,
      m_j: "kg"
    },
    'Kukuričný chlieb': {
      nazov_vyr: 'Kukuričný chlieb',
      typ: 'CH',
      zlozenie: [
        { nazov_sur: "Kukuričná múka", mnozstvo: 0.40, m_j: "kg", cena: 1.80 },
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.20, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Droždie", mnozstvo: 0.02, m_j: "kg", cena: 2.80 },
        { nazov_sur: "Slnečnicový olej", mnozstvo: 0.05, m_j: "l", cena: 2.50 },
        { nazov_sur: "Soľ", mnozstvo: 0.01, m_j: "kg", cena: 0.45 },
        { nazov_sur: "Voda", mnozstvo: 0.30, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 1.08,
      predajna_cena: 5.80,
      marza: 4.72,
      velkost: 0.70,
      m_j: "kg"
    },
    'Orechový závin': {
      nazov_vyr: 'Orechový závin',
      typ: 'SL',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.30, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Orechy", mnozstvo: 0.15, m_j: "kg", cena: 15.80 },
        { nazov_sur: "Maslo", mnozstvo: 0.08, m_j: "kg", cena: 8.50 }
      ],
      naklady_na_suroviny: 3.31,
      predajna_cena: 8.50,
      marza: 5.19,
      velkost: 0.50,
      m_j: "kg"
    },
    'Makový závin': {
      nazov_vyr: 'Makový závin',
      typ: 'SL',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.30, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Mak", mnozstvo: 0.20, m_j: "kg", cena: 12.50 },
        { nazov_sur: "Maslo", mnozstvo: 0.08, m_j: "kg", cena: 8.50 },
        { nazov_sur: "Cukor", mnozstvo: 0.05, m_j: "kg", cena: 1.20 },
        { nazov_sur: "Droždie", mnozstvo: 0.02, m_j: "kg", cena: 2.80 },
        { nazov_sur: "Voda", mnozstvo: 0.10, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 3.55,
      predajna_cena: 7.50,
      marza: 3.95,
      velkost: 0.50,
      m_j: "kg"
    },
    'Vanilkový koláč': {
      nazov_vyr: 'Vanilkový koláč',
      typ: 'SL',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.30, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Maslo", mnozstvo: 0.15, m_j: "kg", cena: 8.50 },
        { nazov_sur: "Cukor", mnozstvo: 0.10, m_j: "kg", cena: 1.20 },
        { nazov_sur: "Vanilka", mnozstvo: 5.00, m_j: "g", cena: 0.05 },
        { nazov_sur: "Voda", mnozstvo: 0.10, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 1.90,
      predajna_cena: 9.50,
      marza: 7.60,
      velkost: 0.50,
      m_j: "kg"
    },
    'Škoricové slimáky': {
      nazov_vyr: 'Škoricové slimáky',
      typ: 'SL',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.20, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Maslo", mnozstvo: 0.08, m_j: "kg", cena: 8.50 },
        { nazov_sur: "Cukor", mnozstvo: 0.05, m_j: "kg", cena: 1.20 },
        { nazov_sur: "Škorica", mnozstvo: 3.00, m_j: "g", cena: 0.03 },
        { nazov_sur: "Voda", mnozstvo: 0.05, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 1.00,
      predajna_cena: 6.50,
      marza: 5.50,
      velkost: 0.30,
      m_j: "kg"
    },
    'Maslové rožky': {
      nazov_vyr: 'Maslové rožky',
      typ: 'SL',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.03, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Maslo", mnozstvo: 0.01, m_j: "kg", cena: 8.50 },
        { nazov_sur: "Soľ", mnozstvo: 0.001, m_j: "kg", cena: 0.45 },
        { nazov_sur: "Droždie", mnozstvo: 0.001, m_j: "kg", cena: 2.80 },
        { nazov_sur: "Voda", mnozstvo: 0.01, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 0.11,
      predajna_cena: 0.80,
      marza: 0.69,
      velkost: 0.05,
      m_j: "kg"
    },
    'Oškvarkové pagáče': {
      nazov_vyr: 'Oškvarkové pagáče',
      typ: 'SA',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.03, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Maslo", mnozstvo: 0.01, m_j: "kg", cena: 8.50 },
        { nazov_sur: "Oškvarky", mnozstvo: 0.02, m_j: "kg", cena: 5.50 },
        { nazov_sur: "Soľ", mnozstvo: 0.001, m_j: "kg", cena: 0.45 },
        { nazov_sur: "Voda", mnozstvo: 0.01, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 0.22,
      predajna_cena: 1.00,
      marza: 0.78,
      velkost: 0.05,
      m_j: "kg"
    },
    'Syrové tyčinky': {
      nazov_vyr: 'Syrové tyčinky',
      typ: 'SA',
      zlozenie: [
        { nazov_sur: "Pšeničná múka", mnozstvo: 0.05, m_j: "kg", cena: 0.85 },
        { nazov_sur: "Maslo", mnozstvo: 0.02, m_j: "kg", cena: 8.50 },
        { nazov_sur: "Syr", mnozstvo: 0.03, m_j: "kg", cena: 6.50 },
        { nazov_sur: "Soľ", mnozstvo: 0.001, m_j: "kg", cena: 0.45 },
        { nazov_sur: "Voda", mnozstvo: 0.02, m_j: "l", cena: 0.00 }
      ],
      naklady_na_suroviny: 0.41,
      predajna_cena: 2.40,
      marza: 1.99,
      velkost: 0.10,
      m_j: "kg"
    }
  };

  const productCategories = {
    'Chleby': Object.keys(productData).filter(name => productData[name].typ === 'CH'),
    'Sladké pečivo': Object.keys(productData).filter(name => productData[name].typ === 'SL'),
    'Slané pečivo': Object.keys(productData).filter(name => productData[name].typ === 'SA')
  };

  const categoryStyles = {
    'Chleby': { title: 'text-amber-800', hover: 'hover:bg-amber-100', bg: 'bg-amber-50' },
    'Sladké pečivo': { title: 'text-red-800', hover: 'hover:bg-red-100', bg: 'bg-red-50' },
    'Slané pečivo': { title: 'text-blue-800', hover: 'hover:bg-blue-100', bg: 'bg-blue-50' }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-amber-50 to-blue-50 rounded-xl shadow-lg">
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(productCategories).map(([category, products]) => (
          <div key={category} className="space-y-4">
            <div className={`p-4 rounded-lg ${categoryStyles[category].bg}`}>
              <h3 className={`text-xl font-bold ${categoryStyles[category].title} text-center mb-4`}>
                {category}
              </h3>
              <div className="space-y-2">
                {products.map(product => (
                  <button 
                    key={product}
                    className={`w-full p-4 bg-white ${categoryStyles[category].hover} rounded-lg shadow-md transition-all transform hover:scale-105`}
                    onClick={() => setSelectedProduct(productData[product])}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{product}</span>
                      <span className="text-gray-500">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.nazov_vyr}</h3>
        <span className="text-gray-600 font-medium">
          {selectedProduct.velkost} {selectedProduct.m_j}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3 text-gray-700">Zloženie:</h4>
            <div className="space-y-2">
              {selectedProduct.zlozenie.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.nazov_sur}</span>
                  <span className="text-gray-600">
                    {item.mnozstvo} {item.m_j}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3 text-gray-700">Kalkulácia:</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Náklady na suroviny:</span>
                <span className="font-medium text-gray-800">
                  {selectedProduct.naklady_na_suroviny.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Predajná cena:</span>
                <span className="font-medium text-gray-800">
                  {selectedProduct.predajna_cena.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Marža:</span>
                <span className="font-bold text-green-600">
                  {selectedProduct.marza.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Marža v %:</span>
                <span className="font-bold text-green-600">
                  {((selectedProduct.marza / selectedProduct.naklady_na_suroviny) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          onClick={() => setSelectedProduct(null)}
        >
          Zavrieť
        </button>
      </div>
    </div>
  </div>
)}
</div> )}

export default ProductCatalog;
