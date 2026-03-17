'use client';

import React from 'react';

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Geometric MH Monogram */}
      {/* Left part (Charcoal) */}
      <path 
        d="M80 60V110M80 60L100 75M80 60H90V100L100 110V120L80 110V60Z" 
        fill="#334155" 
      />
      <path 
        d="M80 70V110L95 120V110L85 105V75L80 70Z" 
        fill="#334155" 
      />
      
      {/* Right part (Green) */}
      <path 
        d="M120 60V110M120 60L100 75M120 60H110V100L100 110V120L120 110V60Z" 
        fill="#22C55E" 
      />
      
      {/* The actual geometric construction from the image */}
      {/* Top V shape */}
      <path d="M78 60L100 78L122 60" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Left 'M' structure */}
      <path d="M78 70V110L98 125V115L88 108V80" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M98 100V115" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Right 'H' structure */}
      <path d="M122 70V110L102 125V115L112 108V80" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M102 100V115" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M107 100H117" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Small diamond dot in the H */}
      <rect x="108" y="108" width="4" height="4" transform="rotate(45 110 110)" fill="#22C55E" />
    </svg>
  );
}
