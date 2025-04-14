import "../componentsDashboard/modalModifyTables.css";

export const ModalOnlyText = ({ isOpenText, isOpenList, onCloseText, onCloseList, title, content, listItems }) => {
    if (!isOpenText && !isOpenList) return null;

    return (
        <div className="modalTextOnly" style={{ display: isOpenText || isOpenList ? 'block' : 'none' }}>
            <div className="modalContent">
                <div
                    className="closeModal"
                >
                    <button

                        onClick={isOpenText ? onCloseText : onCloseList}>
                        Cerrar
                    </button>
                </div>
                <h2>{title}</h2>
                <div className="modalText">
                    {isOpenText && <p>{content}</p>}
                    {isOpenList && (
                        <ul>
                            {listItems && listItems.length > 0 ? (
                                listItems.map((item, index) => <li key={index}>{item}</li>)
                            ) : (
                                <p>No Hay datos de esto</p>
                            )}
                        </ul>
                    )}

                </div>
            </div>
        </div>
    );
};