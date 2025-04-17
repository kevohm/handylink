"use client"
import { UserRole } from "@/types/user";
import { createContext, ReactNode, useContext, useState } from "react";

interface SignUpData {
  phoneNumber?: string;
  role?: UserRole;
  about?:string,
  categories?: string[];
}

interface StepperContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepData: SignUpData;
  setStepData: (data: SignUpData) => void;
}

const StepperContextInitialState = {
    currentStep: 0,
  setCurrentStep: () => {},
  stepData: {
    phoneNumber: undefined,
    role: "client" as UserRole,
    about:"",
    categories: []
  },
  setStepData: () => {},
};

const StepperContext = createContext<StepperContextType>(
  StepperContextInitialState
);

export const StepperProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState<SignUpData>(StepperContextInitialState.stepData);
  
  const changeStep = (step: number) => {
    if (step < 0) {
      setCurrentStep(0);
    } else if (step > 3) {
      setCurrentStep(3);
    } else {
      setCurrentStep(step);
    }
  };

const changeStepData = (data: Partial<SignUpData>) => {
    setStepData((prev) => ({
        ...prev,
        ...data
    } as SignUpData));
};

  return (
    <StepperContext.Provider
      value={{ currentStep, setCurrentStep: changeStep, stepData, setStepData:changeStepData }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};
