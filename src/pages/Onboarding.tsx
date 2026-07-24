// src/pages/Onboarding/index.tsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import WelcomePage1 from './Onboarding/WelcomePage';
import WelcomePage2 from './Onboarding/WelcomePage2';
import WelcomePage3 from './Onboarding/WelcomePage3';

const Onboarding: React.FC = () => {
  const { currentStep, totalSteps, setCurrentStep, completeOnboarding } = useOnboarding();

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  // Render the appropriate page based on current step
  const renderPage = () => {
    switch (currentStep) {
      case 0:
        return <WelcomePage1 onNext={handleNext} onSkip={handleSkip} />;
      case 1:
        return <WelcomePage2 onNext={handleNext} onPrev={handlePrev} onSkip={handleSkip} />;
      case 2:
        return <WelcomePage3 onComplete={completeOnboarding} onPrev={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderPage()}
    </AnimatePresence>
  );
};

export default Onboarding;