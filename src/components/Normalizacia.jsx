import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const NormalizationDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);

  const TableView = ({ data, headers, highlightColumns = [] }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {headers.map((header, i) => (
              <th key={i} className={`px-4 py-2 text-left text-sm font-semibold
                ${highlightColumns.includes(i) ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {Object.values(row).map((cell, j) => (
                <td key={j} className={`px-4 py-2 text-sm border-t border-gray-200
                  ${highlightColumns.includes(j) ? 'bg-blue-50' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const steps = [
    {
      title: "Nenormalizovaná forma",
      description: "Obsahuje redundantné dáta a potenciálne anomálie",
      data: [
        {
          produkt: "Ražný chlieb",
          cena: "2.50€",
          suroviny: "Ražná múka (500g), Kvások (100g), Soľ (10g)",
          dodavatel: "Slovenské Mlyny (mlyny@sk.com, +421901234567)",
          typ: "Chlieb"
        },
        {
          produkt: "Špaldový chlieb",
          cena: "3.00€",
          suroviny: "Špaldová múka (500g), Kvások (100g), Soľ (10g)",
          dodavatel: "Slovenské Mlyny (mlyny@sk.com, +421901234567)",
          typ: "Chlieb"
        }
      ],
      headers: ["Produkt", "Cena", "Suroviny", "Dodávateľ", "Typ"],
      problems: [
        "Opakujúce sa údaje o dodávateľovi",
        "Zmiešané údaje v stĺpci suroviny",
        "Ťažké udržiavanie konzistencie"
      ]
    },
    {
      title: "Prvá normálna forma (1NF)",
      description: "Atomické hodnoty a odstránenie opakujúcich sa skupín",
      tables: [
        {
          name: "Produkty",
          data: [
            { id: 1, nazov: "Ražný chlieb", cena: "2.50€", typ: "Chlieb" },
            { id: 2, nazov: "Špaldový chlieb", cena: "3.00€", typ: "Chlieb" }
          ],
          headers: ["ID", "Názov", "Cena", "Typ"]
        },
        {
          name: "Suroviny produktov",
          data: [
            { produkt_id: 2, surovina: "Ražná múka", mnozstvo: "500g" },
            { produkt_id: 5, surovina: "Kvások", mnozstvo: "100g" },
            { produkt_id: 9, surovina: "Soľ", mnozstvo: "10g" },
            { produkt_id: 3, surovina: "Špaldová múka", mnozstvo: "500g" },
            { produkt_id: 5, surovina: "Kvások", mnozstvo: "100g" },
            { produkt_id: 9, surovina: "Soľ", mnozstvo: "10g" }
          ],
          headers: ["Produkt ID", "Surovina", "Množstvo"]
        }
      ],
      improvements: [
        "Každá hodnota je atomická",
        "Žiadne opakujúce sa skupiny",
        "Jasná štruktúra dát"
      ]
    },
    {
      title: "Druhá normálna forma (2NF)",
      description: "Odstránenie čiastočných závislostí",
      tables: [
        {
          name: "Produkty",
          data: [
            { id: 1, nazov: "Ražný chlieb", cena: "2.50€", typ_id: "CH" },
            { id: 2, nazov: "Špaldový chlieb", cena: "3.00€", typ_id: "CH" }
          ],
          headers: ["ID", "Názov", "Cena", "Typ ID"]
        },
        {
          name: "Typy produktov",
          data: [
            { id: "CH", nazov: "Chlieb", popis: "Základné pečivo" }
          ],
          headers: ["ID", "Názov", "Popis"]
        }
      ],
      improvements: [
        "Odstránené závislosti na časti kľúča",
        "Lepšia organizácia súvisiacich dát",
        "Jednoduchšia údržba číselníkov"
      ]
    },
    {
      title: "Tretia normálna forma (3NF)",
      description: "Odstránenie tranzitívnych závislostí",
      tables: [
        {
          name: "Suroviny",
          data: [
            { id: 2, nazov: "Ražná múka", dodavatel_id: 1, jednotkova_cena: "1.20€" },
            { id: 5, nazov: "Kvások", dodavatel_id: 1, jednotkova_cena: "0.80€" }
          ],
          headers: ["ID", "Názov", "Dodávateľ ID", "Jedn. cena"]
        },
        {
          name: "Dodávatelia",
          data: [
            { 
              id: 1, 
              nazov: "Slovenské Mlyny", 
              email: "mlyny@sk.com",
              telefon: "+421901234567"
            }
          ],
          headers: ["ID", "Názov", "Email", "Telefón"]
        }
      ],
      improvements: [
        "Odstránené tranzitívne závislosti",
        "Každý atribút závisí len od primárneho kľúča",
        "Minimálna redundancia dát"
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find the step that is currently most in view
      const currentStepIndex = stepRefs.current.findIndex((ref, index) => {
        if (!ref) return false;
        
        const { top, bottom } = ref.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        const elementBottom = bottom + window.scrollY;
        
        return scrollPosition >= elementTop && scrollPosition <= elementBottom;
      });

      if (currentStepIndex !== -1 && currentStepIndex !== activeStep) {
        setActiveStep(currentStepIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep]);

  const NormalizationStep = ({ step, index, isActive }) => (
    <div 
      ref={el => stepRefs.current[index] = el}
      className={`bg-white p-6 rounded-lg shadow-md space-y-4 transition-all duration-500 
        ${isActive 
          ? 'scale-100 opacity-100 border-blue-500 border-2' 
          : 'scale-95 opacity-70 border border-gray-200'
        }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold
          ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}>
          {index + 1}
        </div>
        <h3 className={`text-lg font-semibold ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
          {step.title}
        </h3>
      </div>
      
      <p className={`text-gray-600 transition-colors ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
        {step.description}
      </p>

      {step.data && (
        <div className="mt-4">
          <TableView
            data={step.data}
            headers={step.headers}
          />
        </div>
      )}

      {step.tables && (
        <div className="space-y-4">
          {step.tables.map((table, i) => (
            <div key={i}>
              <h4 className="font-medium mb-2 text-gray-700">{table.name}</h4>
              <TableView
                data={table.data}
                headers={table.headers}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        {step.problems ? (
          <>
            <h4 className="font-medium text-red-600 mb-2 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Problémy:</span>
            </h4>
            <ul className="space-y-1">
              {step.problems.map((problem, i) => (
                <li key={i} className="text-sm text-red-600 flex items-center space-x-2">
                  <span>•</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h4 className="font-medium text-green-600 mb-2 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Vylepšenia:</span>
            </h4>
            <ul className="space-y-1">
              {step.improvements.map((improvement, i) => (
                <li key={i} className="text-sm text-green-600 flex items-center space-x-2">
                  <span>•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );

  const scrollToStep = (index) => {
    if (stepRefs.current[index]) {
      stepRefs.current[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Proces normalizácie databázy</h2>
        <p className="text-gray-600">
          Normalizácia je proces organizovania dát v databáze tak, aby sa minimalizovala redundancia
          a závislosti. Prejdime si jednotlivé kroky na príklade našej pekárne.
        </p>
        
        {/* Progress indicator */}
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {steps.map((step, index) => (
          <NormalizationStep 
            key={index} 
            step={step} 
            index={index}
            isActive={activeStep === index}
          />
        ))}
      </div>
      </div>
  );
};

export default NormalizationDemo;