import { useState } from "react";

export const useMultiStepForm = (totalSteps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = adelante, -1 = atrás

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    return { currentStep, nextStep, prevStep, direction };
};