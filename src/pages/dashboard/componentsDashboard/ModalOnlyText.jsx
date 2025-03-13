export const ModalOnlyText = ({ isOpenText, isOpenList, onCloseText, onCloseList, title, content, listItems }) => {
    if (!isOpenText && !isOpenList) return null;

    return (
        <div className="modal" style={{ display: isOpenText || isOpenList ? 'block' : 'none' }}>
            <div className="modal-content">
                <h2>{title}</h2>
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
                <button onClick={isOpenText ? onCloseText : onCloseList}>Cerrar</button>
            </div>
        </div>
    );
};