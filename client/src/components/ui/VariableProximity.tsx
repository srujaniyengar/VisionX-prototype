import { forwardRef, useMemo, useRef, useEffect } from 'react';
import '../../styles/VariableProximity.css';

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef?: React.RefObject<HTMLElement>;
  radius?: number;
  falloff?: 'linear' | 'exponential';
  className?: string;
}

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef?: React.RefObject<HTMLElement>) {
  const positionRef = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      }
    };
    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);
  return positionRef;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(({ 
  label, 
  fromFontVariationSettings = "'wght' 400", 
  toFontVariationSettings = "'wght' 800", 
  containerRef, 
  radius = 120, 
  falloff = 'linear', 
  className = '' 
}, ref) => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);

  const parsedSettings = useMemo(() => {
    const parse = (s: string) => new Map(s.split(',').map(p => { 
      const [k, v] = p.trim().split(' '); 
      return [k.replace(/['"]/g, ''), parseFloat(v)]; 
    }));
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);
    return Array.from(from.keys()).map(axis => ({ 
      axis, 
      from: from.get(axis) ?? 400, 
      to: to.get(axis) ?? from.get(axis) ?? 400 
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return;
      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRef.current!.getBoundingClientRect().left;
      const letterCenterY = rect.top + rect.height / 2 - containerRef.current!.getBoundingClientRect().top;
      const distance = Math.sqrt((mousePositionRef.current.x - letterCenterX) ** 2 + (mousePositionRef.current.y - letterCenterY) ** 2);
      const norm = Math.max(0, 1 - distance / radius);
      let falloffValue;
      switch (falloff) {
        case 'exponential': falloffValue = norm * norm; break;
        default: falloffValue = norm;
      }
      const newSettings = parsedSettings.map(({ axis, from, to }) => `'${axis}' ${from + (to - from) * falloffValue}`).join(', ');
      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  return (
    <span ref={ref} className={`${className} variable-proximity`}>
      {label.split('').map((letter, i) => (
        <span 
          key={i} 
          ref={el => letterRefs.current[i] = el} 
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;