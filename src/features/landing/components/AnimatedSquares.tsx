"use client";

import React, { useEffect, useState } from "react";

export const AnimatedSquares = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* CSS Grid Pattern - High visibility */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--landing-primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--landing-primary)) 1px, transparent 1px)
          `,
          backgroundSize: '5rem 5rem',
        }}
      />



      {/* Glow effects */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, oklch(0.646 0.222 41.116 / 0.1) 0%, transparent 80%)`
        }}
      />
    </div>
  );
};
