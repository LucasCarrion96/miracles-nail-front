import "./section-styles/descriptionHome.css";

export const DescriptionHome = ({ Lang, descriptionRef }) => {
    return (
        <>
            <section className="description-main" ref={descriptionRef}>
                <div className="description-text">
                    <div className="custom-title-bg">
                        <div className="title-block-color-1"></div>
                        <div className="title-block-color-2"></div>
                        <h1 className="title title-description-home">
                            Arte+Calidad
                        </h1>
                    </div>
                    <h2 className="subtitle">
                        Atencion Personalizada
                    </h2>
                    <p className="content-text">{Lang.bodyHome}</p>
                </div>
            </section>
        </>
    )
}
