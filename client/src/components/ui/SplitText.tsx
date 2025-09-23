import React, { useRef, useEffect, useState, memo } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  tag?: string;
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = memo(({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  splitType = 'chars',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isVisible && onLetterAnimationComplete) {
      const timeout = setTimeout(() => {
        onLetterAnimationComplete();
      }, (text.length * delay) + (duration * 1000));
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, text.length, delay, duration, onLetterAnimationComplete]);

  const renderContent = () => {
    if (splitType === 'chars' || splitType === 'words') {
      const items = splitType === 'chars' ? text.split('') : text.split(' ');
      
      return items.map((item, index) => (
        <span
          key={index}
          className={`inline-block ${isVisible ? 'animate-in' : ''}`}
          style={{
            animationDelay: `${index * (delay / 1000)}s`,
            animationDuration: `${duration}s`,
            animationFillMode: 'forwards',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: `all ${duration}s ease-out ${index * (delay / 1000)}s`
          }}
        >
          {item === ' ' ? '\u00A0' : item}
          {splitType === 'words' && index < items.length - 1 && '\u00A0'}
        </span>
      ));
    }
    
    return text;
  };

  const baseStyle: React.CSSProperties = {
    textAlign: textAlign as any,
    overflow: 'hidden'
  };

  const props = {
    ref: ref as any,
    style: baseStyle,
    className: `split-text ${className}`
  };

  switch (tag) {
    case 'h1':
      return <h1 {...props}>{renderContent()}</h1>;
    case 'h2':
      return <h2 {...props}>{renderContent()}</h2>;
    case 'h3':
      return <h3 {...props}>{renderContent()}</h3>;
    case 'h4':
      return <h4 {...props}>{renderContent()}</h4>;
    case 'h5':
      return <h5 {...props}>{renderContent()}</h5>;
    case 'h6':
      return <h6 {...props}>{renderContent()}</h6>;
    default:
      return <p {...props}>{renderContent()}</p>;
  }
});

SplitText.displayName = 'SplitText';

export default SplitText;