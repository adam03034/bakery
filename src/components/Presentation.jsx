import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCatalog from '/Users/adamwirth/Desktop/prezentacia-db/src/components/ProductCatalog.jsx';
import ProcessFlow from '/Users/adamwirth/Desktop/prezentacia-db/src/components/ProcessFlow.jsx';
import Keys from '/Users/adamwirth/Desktop/prezentacia-db/src/components/Keys.jsx';
import Normalizacia from "/Users/adamwirth/Desktop/prezentacia-db/src/components/Normalizacia.jsx";
import GrafyComponent from '/Users/adamwirth/Desktop/prezentacia-db/src/components/GrafyComponent.jsx';
import Zaver from "/Users/adamwirth/Desktop/prezentacia-db/src/components/Zaver.jsx";
import SRBD from "/Users/adamwirth/Desktop/prezentacia-db/src/components/SRBD.jsx";
import Uvodny from "/Users/adamwirth/Desktop/prezentacia-db/src/components/Uvodny.jsx";
import Zaklady from "/Users/adamwirth/Desktop/prezentacia-db/src/components/Zaklady.jsx";





const CodeBlock = ({ code }) => (
  <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
    <pre className="text-sm">
      <code>{code}</code>
    </pre>
  </div>
);

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for charts
  const salesData = [
    { name: 'Chlieb', revenue: 850 },
    { name: 'Sladké', revenue: 620 },
    { name: 'Slané', revenue: 397 }
  ];

  const productMargins = [
    { name: 'Vanilkový koláč', value: 7.60 },
    { name: 'Škoricové slimáky', value: 5.50 },
    { name: 'Orechový závin', value: 5.20 },
    { name: 'Kváskový chlieb', value: 4.47 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const slides = [
    // Úvodná snímka
    // Upravený obsah pre prvú snímk
    {
        title: "Úvod",
        content: (
          <div className="w-full">
            <Uvodny />
          </div>
        )
      },
      {
        title: "Základné príkazy",
        content: (
          <div className="w-full">
            <Zaklady />
          </div>
        )
      },
    // O pekárni
    {
        title: "Náš sortiment",
        content: (
          <div className="w-full">
            <ProductCatalog />
          </div>
        )
      },
      {
        title: "Výrobný proces",
        content: (
          <div className="w-full">
            <ProcessFlow />
          </div>
        )
      },
      
    // Štruktúra databázy
    {
        title: "Databázové kľúče",
        content: (
          <div className="w-full">
            <Keys />
          </div>
        )
      },
    // Normalizácia
    {
        title: "Normalizácia",
        content: (
          <div className="w-full">
            <Normalizacia />
          </div>
        )
      },
    
      {
        title: "SRBD",
        content: (
          <div className="w-full">
            <SRBD />
          </div>
        )
      },
    // Analýza
    {
        title: "Tržby",
        content: (
          <div className="w-full">
            <GrafyComponent />
          </div>
        )
      },
    
    // Záver
    {
        title: "Záver",
        content: (
          <div className="w-full">
            <Zaver />
          </div>
        )
      }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev < slides.length - 1 ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev > 0 ? prev - 1 : prev
    );
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {slides[currentSlide].title}
        </h1>
        <div className="min-h-[500px] flex items-center justify-center p-4">
          {slides[currentSlide].content}
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-sm text-gray-600">
            Snímka {currentSlide + 1} z {slides.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;