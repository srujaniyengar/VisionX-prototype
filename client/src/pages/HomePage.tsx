import React, { useRef, useState, memo, useCallback, useEffect } from 'react';
import SplitText from '../components/ui/SplitText';
import VariableProximity from '../components/ui/VariableProximity';
import OnboardingModal from '../components/OnboardingModal';

const HomePage = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding unless user clicked "Don't show again"
  useEffect(() => {
    const dontShow = localStorage.getItem("dontShowTutorial");
    if (!dontShow) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    // Close for this visit only
    setShowOnboarding(false);
  }, []);

  const handleDontShowAgain = useCallback(() => {
    // Save preference and never show again
    localStorage.setItem("dontShowTutorial", "true");
    setShowOnboarding(false);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    console.log('Title animation completed!');
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-dark-bg">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <SplitText
            text="The Chola Citadel"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-royal-gold mb-8"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag="h1"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <div className="mb-12">
            <VariableProximity
              label="Ocean Hazard & Crisis Reporting Platform"
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 700"
              containerRef={containerRef}
              radius={150}
              className="text-2xl md:text-4xl text-foreground font-light tracking-wide"
            />
          </div>

          <div className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            <SplitText
              text="Report ocean hazards, track environmental crises, and collaborate with coastal communities to protect our marine ecosystems."
              className="mb-4"
              delay={50}
              duration={0.4}
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              tag="p"
            />
            <SplitText
              text="Join the mission to safeguard our oceans through real-time monitoring and community-driven reporting."
              delay={30}
              duration={0.4}
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              tag="p"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/report"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold 
                       hover-elevate transition-all duration-300 text-lg"
              data-testid="button-start-reporting"
            >
              Start Reporting
            </a>
            <a
              href="/map"
              className="bg-ocean-blue text-white px-8 py-4 rounded-lg font-semibold 
                       hover-elevate transition-all duration-300 text-lg"
              data-testid="button-view-crisis-map"
            >
              View Crisis Map
            </a>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {showOnboarding && (
  <OnboardingModal onComplete={handleOnboardingComplete} />
)}

    </div>
  );
});

HomePage.displayName = 'HomePage';
export default HomePage;
