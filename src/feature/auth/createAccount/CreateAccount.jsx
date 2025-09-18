import { UserDetails, UserBirthday, UserContacts, UserPassword, UserHealthCondition, ToS } from "./steps";
import { UseCreateAccountForm } from "./UseCreateAccountForm";
import { useMultiStepForm } from "./useMultiStepForm";
import { FormNavigation } from "./FormNavigation";
import { CustomAlert } from "../../../components/alerts/CustomAlert";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./createUser.css";
import { div } from "framer-motion/client";


export const CreateAccount = () => {
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
        { component: UserBirthday, key: "birthday" },
        { component: UserContacts, key: "contacts" },
        { component: UserHealthCondition, key: "health" },
        { component: UserPassword, key: "password" },
        { component: ToS, key: "tos" }
    ];

    const StepComponent = steps[currentStep].component;

    const handleNextStep = async () => {
        // Validaciones por paso
        if (currentStep === 0 && !validation.validationDetails()) return;
        if (currentStep === 1 && !validation.validationBirthday()) return;
        if (currentStep === 2 && !(await validation.validationContacts())) return;
        if (currentStep === 4 && !validation.validationPassword()) return;

        nextStep();
    };

    return (
        <>
            <div className="create-acoount">
                <div className="create-account-container bg-light-black">
                    <div className="create-account-title">
                        <h1 className="title">Crear Cuenta</h1>
                        <h3>Para entrar en flow pana</h3>
                    </div>
                    <div className="create-account-content">
                        <form className="create-account-form" onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={steps[currentStep].key}
                                    className="animated-step"
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
                        <CustomAlert message={alertMessage} visible={alertVisible} onClose={hideAlert} />
                        <div className="footer-form">
                            <div className="footer-content">
                                <FormNavigation
                                    currentStep={currentStep}
                                    nextStep={handleNextStep}
                                    prevStep={prevStep}
                                    handleSubmit={handleSubmit}
                                />
                                <Link to="/iniciar-sesion">Volver al inicio de sesion</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
