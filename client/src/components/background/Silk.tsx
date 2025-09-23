import React, { useEffect, memo, useCallback } from 'react';

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = memo(({ 
  speed = 2, 
  scale = 1, 
  color = '#005f73', 
  noiseIntensity = 0.8, 
  rotation = 0 
}) => {
  useEffect(() => {
    const canvas = document.getElementById('silk-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      
      // Clear canvas
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create wave-like pattern
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let x = 0; x < canvas.width; x += 4) {
        for (let y = 0; y < canvas.height; y += 4) {
          const index = (y * canvas.width + x) * 4;
          
          const wave = Math.sin((x * 0.01 + time) * scale) * 
                      Math.cos((y * 0.01 + time * 0.5) * scale) *
                      Math.sin((x * 0.005 + y * 0.005 + time * 0.3) * scale);
          
          const intensity = (wave + 1) * 0.5 * noiseIntensity;
          
          data[index] = parseInt(color.slice(1, 3), 16) * intensity;     // R
          data[index + 1] = parseInt(color.slice(3, 5), 16) * intensity; // G
          data[index + 2] = parseInt(color.slice(5, 7), 16) * intensity; // B
          data[index + 3] = 255; // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      id="silk-canvas"
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}40 50%, ${color}20 100%)`,
      }}
    />
  );
});

Silk.displayName = 'Silk';

export default Silk;