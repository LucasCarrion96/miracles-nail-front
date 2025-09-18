import { StepButton } from "@components/button/step-button/StepButton";
export const FormNavigation = ({ currentStep, nextStep, prevStep, handleSubmit }) => (
    <div className="buttonContainer">
        <StepButton
            disabled={currentStep === 1}
            handleClick={prevStep}
            variant="back"
            color="black"
            size={30}
        />
        <StepButton
            disabled={currentStep === 4}
            handleClick={nextStep}
            variant="next"
            color="black"
            size={30}
        />
        <button type="submit" onClick={handleSubmit}>Crear Cuenta</button>
    </div>
);