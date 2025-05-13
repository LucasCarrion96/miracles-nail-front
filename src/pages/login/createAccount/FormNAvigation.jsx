export const FormNavigation = ({ currentStep, nextStep, prevStep, handleSubmit }) => (
    <div className="buttonContainer">
        <button type="button" onClick={nextStep} disabled={currentStep === 4}>
            {'>'}
        </button>
        <button type="submit" onClick={handleSubmit}>Crear Cuenta</button>
    </div>
);