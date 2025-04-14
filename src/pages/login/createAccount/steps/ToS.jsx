import { useState, useContext } from "react";
import { useModalRead } from "../../../../hooks/hooksTables/useModalRead";
import { ModalOnlyText } from "../../../dashboard/componentsDashboard/ModalOnlyText";
import { LangContext } from "../../../../context/contextLang/LangContext";

export const ToS = () => {
    const Lang = useContext(LangContext);
    const { isOpenList, openListModal, closeListModal } = useModalRead();
    const [tosContent, setTosContent] = useState([]);

    const handleOpenToS = () => {
        const formattedToS = Lang.contenidoToS.map(item =>
            `${item.titulo}: ${item.descripcion.replace(/<br\s*\/?>/g, '')}`
        );
        setTosContent(formattedToS);
        openListModal();
    };

    return (
        <>
            <div>
                <h4>Por favor lea los términos</h4>
                <div className="createAccountComplete">
                    <div className="mb-3 passwordCheck">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="ToS"
                            id="ToS"
                        />
                        <label
                            htmlFor="ToS"
                            className="form-check-label labelPasswordCheck"
                            onClick={handleOpenToS}
                        >
                            Términos y Condiciones
                        </label>
                        <button type="button" onClick={handleOpenToS}>prueba tos</button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Registrarse
                    </button>
                </div>
            </div>

            <ModalOnlyText
                isOpenList={isOpenList}
                onCloseList={closeListModal}
                title={Lang.tituloToS}
                listItems={tosContent}
            />
        </>
    );
};
