import ShowNavBar from '@/container/ShowCase/ShowNavBar';
import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface BorderColors {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

const InteractiveBorder: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [borderColors, setBorderColors] = useState<BorderColors>({
    top: '#ffffff',
    right: '#ffffff',
    bottom: '#ffffff',
    left: '#ffffff'
  });
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      updateBorderColors(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const updateBorderColors = (mouseX: number, mouseY: number) => {
    if (!targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from each border
    const distances = {
      top: Math.abs(mouseY - rect.top),
      right: Math.abs(mouseX - rect.right),
      bottom: Math.abs(mouseY - rect.bottom),
      left: Math.abs(mouseX - rect.left)
    };

    // Calculate intensity based on distance (closer = more intense)
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    const newColors: BorderColors = {
      top: getColorForDistance(distances.top, maxDistance),
      right: getColorForDistance(distances.right, maxDistance),
      bottom: getColorForDistance(distances.bottom, maxDistance),
      left: getColorForDistance(distances.left, maxDistance)
    };

    setBorderColors(newColors);
  };

  const getColorForDistance = (distance: number, maxDistance: number): string => {
    // Normalize distance to 0-1 range (0 = closest)
    const normalized = Math.min(distance / maxDistance, 1);
    // Interpolate between white and indigo
    return mixColors('#ffffff', '#132121', 1 - normalized);
  };

  const mixColors = (color1: string, color2: string, amount: number): string => {
    // Simple color mixing function
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);

    const r = Math.round(r1 + (r2 - r1) * amount);
    const g = Math.round(g1 + (g2 - g1) * amount);
    const b = Math.round(b1 + (b2 - b1) * amount);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };
  const style = {          
        borderTopColor: borderColors.top,
        borderRightColor: borderColors.right,
        borderBottomColor: borderColors.bottom,
        borderLeftColor: borderColors.left,
        transition: 'border-color 0.2s ease-out',
        boxShadow: '0 0 10px rgba(225, 225, 225, 0.5)',
  }
  return (
    <>
        <ShowNavBar 
            ref = {targetRef}
            style = {style}
        />
    </>
  );
};

export default InteractiveBorder;