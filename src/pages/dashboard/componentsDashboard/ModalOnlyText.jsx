import { X } from "lucide-react";
import "../componentsDashboard/modalModifyTables.css";

export const ModalOnlyText = ({ isOpenText, isOpenList, onCloseText, onCloseList, title, content, listItems }) => {
    if (!isOpenText && !isOpenList) return null;

    return (
        <div className="modalTextOnly " style={{ display: isOpenText || isOpenList ? 'block' : 'none' }}>
            <div className="modalContent bg-pink">
                <div
                    className="close-modal"
                >
                    <X
                        size={18}
                        onClick={isOpenText ? onCloseText : onCloseList}
                    />
                </div>
                <h2 className="title modal-tables-title">{title}</h2>
                <div className="modal-text content-text">
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