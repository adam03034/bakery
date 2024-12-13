import React, { useState } from 'react';
import { Key, Link2, AlertCircle, CheckCircle2, Info, ChevronDown } from 'lucide-react';

const KeysExplanation = () => {
  const [activeExample, setActiveExample] = useState(null);

  const TableExample = ({ data, isGood = true }) => (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 
      ${isGood ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
      <table className="w-full">
        <thead>
          <tr className={`text-left 
            ${isGood ? 'bg-green-100/50' : 'bg-red-100/50'}`}>
            {Object.keys(data[0]).map((header, i) => (
              <th key={i} className="px-4 py-2 font-semibold text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={`border-t border-gray-200 
              ${i % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/50'}`}>
              {Object.values(row).map((cell, j) => (
                <td key={j} className="px-4 py-2 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const examples = {
    primary: {
      title: "Primárny kľúč (Primary Key)",
      description: "Jedinečný identifikátor každého záznamu v tabuľke",
      benefits: [
        "Zabraňuje duplicitným záznamom",
        "Umožňuje rýchle vyhľadávanie",
        "Zabezpečuje integritu dát"
      ],
      goodExample: [
        { id_vyrobok: "1", nazov_vyr: "Ražný chlieb", cena: "2.50€" },
        { id_vyrobok: "2", nazov_vyr: "Bageta", cena: "1.20€" },
        { id_vyrobok: "3", nazov_vyr: "Croissant", cena: "1.50€" }
      ],
      badExample: [
        { nazov_vyr: "Ražný chlieb", cena: "2.50€" },
        { nazov_vyr: "Ražný chlieb", cena: "2.50€" },
        { nazov_vyr: "Bageta", cena: "1.20€" }
      ]
    },
    foreign: {
      title: "Cudzí kľúč (Foreign Key)",
      description: "Prepája záznamy medzi tabuľkami a vytvára vzťahy",
      benefits: [
        "Zabezpečuje referenčnú integritu",
        "Umožňuje normalizáciu databázy",
        "Zabraňuje neplatným odkazom"
      ],
      goodExample1: [
        { id_vyrobok: "1", nazov_vyr: "Ražný chlieb", id_typ_vyr: "CH" },
        { id_vyrobok: "2", nazov_vyr: "Špaldový chlieb", id_typ_vyr: "CH" },
        { id_vyrobok: "3", nazov_vyr: "Bageta", id_typ_vyr: "CH" }
      ],
      goodExample2: [
        { id_typ_vyr: "CH", nazov_typu: "Chlieb" },
        { id_typ_vyr: "KO", nazov_typu: "Koláč" },
        { id_typ_vyr: "PE", nazov_typu: "Pečivo" }
      ],
      badExample: [
        { id_vyrobok: "1", nazov_vyr: "Ražný chlieb", typ_vyrobku: "Chlieb" },
        { id_vyrobok: "2", nazov_vyr: "Špaldový chlieb", typ_vyrobku: "Chlieb" },
        { id_vyrobok: "3", nazov_vyr: "Bageta", typ_vyrobku: "Chlieb" }
      ]
    }
  };

  return (
    <div className="w-full p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Dôležitosť kľúčov v databáze 🔑
      </h2>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md transform transition-all hover:shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Prečo potrebujeme kľúče?</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Kľúče sú základným stavebným prvkom relačných databáz. Pomáhajú nám:
        </p>
        <ul className="list-none pl-6 space-y-3">
          {[
            "Jednoznačne identifikovať každý záznam",
            "Vytvárať vzťahy medzi tabuľkami",
            "Udržiavať konzistenciu dát",
            "Optimalizovať výkon databázy"
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-2 transform transition-all hover:translate-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(examples).map(([key, data]) => (
          <div 
            key={key}
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer
              transform transition-all duration-300 ease-in-out
              ${activeExample === key ? 
                'ring-2 ring-blue-400 scale-102 shadow-lg' : 
                'hover:scale-101 hover:shadow-lg'}`}
            onClick={() => setActiveExample(activeExample === key ? null : key)}
          >
            <div className="flex items-center space-x-3 mb-4">
              {key === 'primary' ? (
                <Key className="w-6 h-6 text-amber-500" />
              ) : (
                <Link2 className="w-6 h-6 text-green-500" />
              )}
              <h3 className="text-lg font-semibold">{data.title}</h3>
            </div>

            <p className="text-gray-700 mb-4">{data.description}</p>

            <div className="space-y-2 mb-4">
              {data.benefits.map((benefit, index) => (
                <div key={index} 
                  className="flex items-center space-x-2 transform transition-all hover:translate-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out
              ${activeExample === key ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-6 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold">Správny prístup</span>
                  </div>
                  {key === 'foreign' ? (
                    <div className="space-y-4">
                      <TableExample data={data.goodExample1} />
                      <ChevronDown className="w-5 h-5 mx-auto text-gray-400" />
                      <TableExample data={data.goodExample2} />
                    </div>
                  ) : (
                    <TableExample data={data.goodExample} />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold">Nesprávny prístup</span>
                  </div>
                  <TableExample data={key === 'foreign' ? data.badExample : data.badExample} isGood={false} />
                </div>
              </div>
            </div>

            <div className={`text-center mt-4 transition-all duration-300
              ${activeExample === key ? 'opacity-100' : 'opacity-0'}`}>
              <ChevronDown className={`w-6 h-6 mx-auto text-gray-400 transition-transform duration-300
                ${activeExample === key ? 'rotate-180' : ''}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeysExplanation;