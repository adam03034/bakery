import React, { useState } from 'react';

const SQLDemo = () => {
  const [vybranaOperacia, setVybranaOperacia] = useState('zobrazenie');
  const [vysledky, setVysledky] = useState([]);

  // Vzorové dáta
  const vyrobky = [
    { id_vyrobok: 1, nazov_vyr: 'Kváskový ražný chlieb', velkost: 1.00, jed_c_s: 5.50 },
    { id_vyrobok: 2, nazov_vyr: 'Špaldový chlieb', velkost: 0.80, jed_c_s: 6.00 },
    { id_vyrobok: 3, nazov_vyr: 'Orechový závin', velkost: 0.50, jed_c_s: 8.50 },
    { id_vyrobok: 4, nazov_vyr: 'Makový závin', velkost: 0.50, jed_c_s: 7.50 },
    { id_vyrobok: 7, nazov_vyr: 'Vanilkový koláč', velkost: 0.50, jed_c_s: 9.50 },
    { id_vyrobok: 9, nazov_vyr: 'Kukuričný chlieb', velkost: 0.70, jed_c_s: 5.80 }
  ];

  const suroviny = [
    { id_surovina: 1, nazov_sur: 'Pšeničná múka', m_j: 'kg', jed_c_s: 0.85 },
    { id_surovina: 6, nazov_sur: 'Maslo', m_j: 'kg', jed_c_s: 8.50 },
    { id_surovina: 12, nazov_sur: 'Cukor', m_j: 'kg', jed_c_s: 1.20 },
    { id_surovina: 13, nazov_sur: 'Vanilka', m_j: 'g', jed_c_s: 0.05 },
    { id_surovina: 10, nazov_sur: 'Voda', m_j: 'l', jed_c_s: 0.00 }
  ];

  const zlozenie = [
    { id_vyrobok: 7, id_surovina: 1, mnozstvo: 0.30, m_j: 'kg' },
    { id_vyrobok: 7, id_surovina: 6, mnozstvo: 0.15, m_j: 'kg' },
    { id_vyrobok: 7, id_surovina: 12, mnozstvo: 0.10, m_j: 'kg' },
    { id_vyrobok: 7, id_surovina: 13, mnozstvo: 5.00, m_j: 'g' },
    { id_vyrobok: 7, id_surovina: 10, mnozstvo: 0.10, m_j: 'l' }
  ];

  const operacie = {
    zobrazenie: {
      nazov: "SELECT - Zobrazenie výrobkov",
      sql: `SELECT id_vyrobok, nazov_vyr, velkost, jed_c_s 
            FROM vyrobky 
            WHERE velkost >= 0.5;`,
      vykonaj: () => {
        setVysledky(vyrobky);
      }
    },
    spojenie: {
      nazov: "JOIN - Suroviny výrobku",
      sql: `SELECT v.nazov_vyr, s.nazov_sur, z.mnozstvo, z.m_j
            FROM vyrobky v
            JOIN zlozenie z ON v.id_vyrobok = z.id_vyrobok
            JOIN suroviny s ON z.id_surovina = s.id_surovina
            WHERE v.id_vyrobok = 7;`,
      vykonaj: () => {
        const surovinyVyrobku = zlozenie.map(zloz => {
          const surovina = suroviny.find(sur => sur.id_surovina === zloz.id_surovina);
          const vyrobok = vyrobky.find(vyr => vyr.id_vyrobok === zloz.id_vyrobok);
          return {
            vyrobok: vyrobok.nazov_vyr,
            surovina: surovina.nazov_sur,
            mnozstvo: zloz.mnozstvo,
            jednotka: zloz.m_j
          };
        });
        setVysledky(surovinyVyrobku);
      }
    },
    pridanie: {
      nazov: "INSERT - Pridanie výrobku",
      sql: `INSERT INTO vyrobky (id_vyrobok, nazov_vyr, velkost, jed_c_s)
            VALUES (11, 'Celozrnný chlieb', 0.75, 4.50);`,
      vykonaj: () => {
        const novyVyrobok = {
          id_vyrobok: 11,
          nazov_vyr: 'Celozrnný chlieb',
          velkost: 0.75,
          jed_c_s: 4.50
        };
        setVysledky([novyVyrobok]);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">SQL Operácie - Pekárenská Databáza</h1>
        
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            {Object.keys(operacie).map((op) => (
              <button
                key={op}
                onClick={() => setVybranaOperacia(op)}
                className={`px-4 py-2 rounded ${
                  vybranaOperacia === op 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {op.charAt(0).toUpperCase() + op.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">{operacie[vybranaOperacia].nazov}</h3>
            <pre className="bg-gray-200 p-2 rounded text-sm overflow-x-auto">
              {operacie[vybranaOperacia].sql}
            </pre>
          </div>

          <button
            onClick={operacie[vybranaOperacia].vykonaj}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Vykonať dopyt
          </button>

          {vysledky.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Výsledky:</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      {Object.keys(vysledky[0]).map(kluc => (
                        <th key={kluc} className="p-2 border border-gray-200 text-left">
                          {kluc}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vysledky.map((riadok, idx) => (
                      <tr key={idx}>
                        {Object.values(riadok).map((hodnota, i) => (
                          <td key={i} className="p-2 border border-gray-200">
                            {hodnota}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLDemo;