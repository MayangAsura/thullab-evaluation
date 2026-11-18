// src/components/layout/HeroBanner.jsx
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#2671eb] to-blue-400 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Temukan Kelas Impianmu
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Belajar bersama instruktur terbaik dengan materi terkini
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;