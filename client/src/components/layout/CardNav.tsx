import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import '../../styles/CardNav.css';

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({ 
  logo, 
  logoAlt = 'Logo', 
  items, 
  className = '', 
  ease = 'power3.out', 
  baseColor = '#fff', 
  menuColor, 
  buttonBgColor, 
  buttonTextColor 
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        contentEl.style.visibility = 'visible';
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        contentEl.style.visibility = wasVisible;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
    };
  }, [ease, items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div 
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`} 
            onClick={toggleMenu} 
            role="button" 
            aria-label={isExpanded ? 'Close menu' : 'Open menu'} 
            tabIndex={0} 
            style={{ color: menuColor || '#000' }}
            data-testid="button-menu-toggle"
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
          <div className="logo-container">
            <Link to="/" data-testid="link-home"><img src={logo} alt={logoAlt} className="logo" /></Link>
          </div>
          <Link 
            to="/report" 
            className="card-nav-cta-button" 
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            data-testid="link-get-started"
          >
            Get Started
          </Link>
        </div>
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div 
              key={`${item.label}-${idx}`} 
              className="nav-card" 
              ref={el => cardsRef.current[idx] = el} 
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
              data-testid={`card-nav-${idx}`}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <Link 
                    key={`${lnk.label}-${i}`} 
                    className="nav-card-link" 
                    to={lnk.href} 
                    aria-label={lnk.ariaLabel}
                    data-testid={`link-${lnk.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;