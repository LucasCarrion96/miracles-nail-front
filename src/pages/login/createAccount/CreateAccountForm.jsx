import { UserDetails, UserContacts, UserPassword, UserHealthCondition, ToS } from "./steps";
import { UseCreateAccountForm } from "./UseCreateAccountForm";
import { useMultiStepForm } from "./useMultiStepForm";
import { FormNavigation } from "./FormNavigation";
import { CustomAlert } from "../../../components/alerts/CustomAlert";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./createUser.css";

export const CreateAccountForm = () => {
    const {
        formData,
        handleChange,
        togglePassword,
        handleSubmit,
        alertVisible,
        alertMessage,
        hideAlert,
        validation // Asegurate que el hook devuelva esto
    } = UseCreateAccountForm();

    const { currentStep, nextStep, prevStep, direction } = useMultiStepForm(5);

    const steps = [
        { component: UserDetails, key: "details" },
        { component: UserContacts, key: "contacts" },
        { component: UserHealthCondition, key: "health" },
        { component: UserPassword, key: "password" },
        { component: ToS, key: "tos" }
    ];

    const StepComponent = steps[currentStep].component;

    const handleNextStep = async () => {
        // Validaciones por paso
        if (currentStep === 0 && !validation.validationDetails()) return;
        if (currentStep === 1 && !(await validation.validationContacts())) return;
        if (currentStep === 3 && !validation.validationPassword()) return;

        nextStep();
    };

    return (
        <div className="createAccountContainer bgText">
            <div className="createAccountTitle">
                <h1>Crear Cuenta</h1>
            </div>

            <form className="container createAccount" onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={steps[currentStep].key}
                        className="animatedStep"
                        initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <StepComponent
                            formData={formData}
                            handleChange={handleChange}
                            togglePassword={togglePassword}
                        />
                    </motion.div>
                </AnimatePresence>
            </form>

            <div className="buttonContainer">
                <FormNavigation
                    currentStep={currentStep}
                    nextStep={handleNextStep}
                    prevStep={prevStep}
                    handleSubmit={handleSubmit}
                />
                <Link to="/iniciar-sesion">Volver al inicio de sesión</Link>
            </div>

            <CustomAlert message={alertMessage} visible={alertVisible} onClose={hideAlert} />
        </div>
    );
};
