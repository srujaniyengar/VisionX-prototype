import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stepper, { Step } from './ui/Stepper';
import SplitText from './ui/SplitText';

interface OnboardingModalProps {
  onComplete: () => void;
}

const OnboardingModal = memo(({ onComplete }: OnboardingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const dontShow = localStorage.getItem('dontShowTutorial');
    if (!dontShow) {
      setIsOpen(true);
    } else {
      onComplete();
    }
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowTutorial', 'true');
    }
    setIsOpen(false);
    onComplete();
  }, [dontShowAgain, onComplete]);

  const handleAnimationComplete = useCallback(() => {
    console.log('All letters have animated!');
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/95 backdrop-blur-md"
          data-testid="onboarding-modal"
        >
          <div className="w-full max-w-2xl mx-4 relative">
            <Stepper
              initialStep={1}
              onStepChange={(step) => console.log('Current step:', step)}
              onFinalStepCompleted={handleComplete}
              backButtonText="Previous"
              nextButtonText="Next"
              stepCircleContainerClassName="bg-card/80 border-card-border"
            >
              <Step>
                <div className="text-center py-8">
                  <SplitText
                    text="Welcome to The Chola Citadel"
                    className="text-4xl font-bold text-royal-gold mb-6"
                    delay={80}
                    duration={0.8}
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
                  <p className="text-lg text-foreground mb-4">
                    Your mission to protect our oceans begins here.
                  </p>
                  <p className="text-muted-foreground">
                    Join a community of coastal guardians reporting hazards and tracking environmental crises in real-time.
                  </p>
                </div>
              </Step>

              <Step>
                <div className="text-center py-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-ocean-blue/20 rounded-full flex items-center justify-center border border-ocean-blue/30">
                    <span className="text-6xl">🌊</span>
                  </div>
                  <SplitText
                    text="Report & Track Ocean Hazards"
                    className="text-3xl font-bold text-primary mb-4"
                    delay={60}
                    duration={0.6}
                    tag="h2"
                  />
                  <p className="text-foreground mb-4">
                    Instantly report pollution, debris, or crisis events you encounter along coastlines.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Your reports help emergency responders and environmental agencies take swift action.
                  </p>
                </div>
              </Step>

              <Step>
                <div className="text-center py-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-destructive/20 rounded-full flex items-center justify-center border border-destructive/30">
                    <span className="text-6xl">🗺️</span>
                  </div>
                  <SplitText
                    text="Explore the Crisis Map"
                    className="text-3xl font-bold text-destructive mb-4"
                    delay={60}
                    duration={0.6}
                    tag="h2"
                  />
                  <p className="text-foreground mb-4">
                    View live data on pollution hotspots and active crisis events across coastal regions.
                  </p>
                  <div className="bg-muted/20 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-foreground mb-2">What's your name?</h4>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      data-testid="input-name"
                    />
                  </div>
                </div>
              </Step>

              <Step>
                <div className="text-center py-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                    <span className="text-6xl">✅</span>
                  </div>
                  <SplitText
                    text={name ? `Ready to start, ${name}?` : "You're All Set!"}
                    className="text-3xl font-bold text-primary mb-4"
                    delay={60}
                    duration={0.6}
                    tag="h2"
                  />
                  <p className="text-foreground mb-4">
                    You're now ready to join the mission of protecting our marine ecosystems.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Click "Complete" to start exploring The Chola Citadel and make your first impact.
                  </p>

                  {/* Integrated "Don't show again" checkbox */}
                  <label className="flex items-center justify-center gap-2 mt-4 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    Don't show this again
                  </label>
                </div>
              </Step>
            </Stepper>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

OnboardingModal.displayName = 'OnboardingModal';

export default OnboardingModal;
