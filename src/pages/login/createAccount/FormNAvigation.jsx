export const FormNavigation = ({ currentStep, nextStep, prevStep }) => (
    <div className="buttonContainer">
        <button type="button" onClick={prevStep} disabled={currentStep === 0}>
            {'<'}
        </button>
        <button type="button" onClick={nextStep} disabled={currentStep === 4}>
            {'>'}
        </button>
        <button type="submit">Crear Cuenta</button>
    </div>
);