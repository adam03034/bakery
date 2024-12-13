import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, DollarSign, TrendingUp, LineChart } from 'lucide-react';

const SalesDashboard = () => {
  const data = [
    { name: 'Kváskový ražný chlieb', trzby: 825.00, marza: 670.50, vydaje: 154.50 },
    { name: 'Orechový závin', trzby: 255.00, marza: 156.00, vydaje: 99.00 },
    { name: 'Vanilkový koláč', trzby: 570.00, marza: 456.00, vydaje: 114.00 },
    { name: 'Škoricové slimáky', trzby: 650.00, marza: 550.00, vydaje: 100.00 },
    { name: 'Kukuričný chlieb', trzby: 174.00, marza: 141.60, vydaje: 32.40 },
    { name: 'Maslové rožky', trzby: 48.00, marza: 41.40, vydaje: 6.60 }
  ];

  const sqlQuery = `
  SELECT 
    v.nazov_vyr,
    SUM(o.mnozstvo * v.jed_c_s) as trzby,
    SUM(o.mnozstvo * (v.jed_c_s - (tp.naklady_na_suroviny / v.velkost))) as marza,
    SUM(o.mnozstvo * (tp.naklady_na_suroviny / v.velkost)) as vydaje
  FROM objednavky o
  JOIN vyrobky v ON o.id_vyrobok = v.id_vyrobok
  JOIN objednavky_list ol ON o.id_objednavka = ol.id_objednavka
  JOIN Tp tp ON v.id_vyrobok = tp.id_vyrobok
  WHERE ol.stav != 'Zrušená'
  GROUP BY v.nazov_vyr
  ORDER BY trzby DESC;
`;
  return (
    <div className="space-y-8 p-6 bg-gray-50">
      {/* Hlavička */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900">Analýza tržieb pekárne</h1>
        <p className="text-gray-500">Prehľad finančných ukazovateľov podľa produktov</p>
      </div>

      {/* Metriky */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Celkové tržby</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.reduce((sum, item) => sum + item.trzby, 0).toFixed(2)} €
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Celková marža</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.reduce((sum, item) => sum + item.marza, 0).toFixed(2)} €
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <LineChart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Celkové výdaje</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.reduce((sum, item) => sum + item.vydaje, 0).toFixed(2)} €
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Graf */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Graf tržieb, marží a výdajov</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                interval={0}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis 
                label={{ value: 'EUR', angle: -90, position: 'insideLeft' }}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                formatter={(value) => `${value.toFixed(2)} €`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="trzby" fill="#3B82F6" name="Tržby" radius={[4, 4, 0, 0]} />
              <Bar dataKey="marza" fill="#10B981" name="Marža" radius={[4, 4, 0, 0]} />
              <Bar dataKey="vydaje" fill="#EF4444" name="Výdaje" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SQL Dopyt */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">SQL Dopyt pre analýzu</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {sqlQuery}
          </pre>
        </div>
      </div>

      {/* Vysvetlenie */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Vysvetlenie analýzy</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center">
              <ChevronRight className="h-5 w-5 text-blue-500" />
              Tržby
            </h3>
            <p className="text-gray-600 pl-6">
              Celkový príjem z predaja produktov. Vypočítané ako množstvo predaných kusov krát predajná cena.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center">
              <ChevronRight className="h-5 w-5 text-green-500" />
              Marža
            </h3>
            <p className="text-gray-600 pl-6">
              Zisk po odpočítaní nákladov na suroviny. Reprezentuje skutočný zisk z predaja.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold flex items-center">
              <ChevronRight className="h-5 w-5 text-red-500" />
              Výdaje
            </h3>
            <p className="text-gray-600 pl-6">
              Náklady na suroviny potrebné na výrobu produktov. Vypočítané z receptúr a cien surovín.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;