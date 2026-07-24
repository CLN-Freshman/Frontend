import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingContextType {
  isFirstVisit: boolean;
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSteps = 3; // Number of welcome pages

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (hasCompletedOnboarding === 'true') {
      setIsFirstVisit(false);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsFirstVisit(false);
    setCurrentStep(totalSteps);
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsFirstVisit(false);
    setCurrentStep(totalSteps);
  };

  return (
    <OnboardingContext.Provider
      value={{
        isFirstVisit,
        currentStep,
        totalSteps,
        setCurrentStep,
        completeOnboarding,
        skipOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};