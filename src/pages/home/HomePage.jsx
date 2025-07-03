import { useContext, useRef } from "react"
import { Footer } from "../../components/Footer"
import { LangContext } from "../../context/contextLang/LangContext"
import { GalleryHome } from "./componentsHome/gallery/GalleryHome";
import { CollageWorks } from "./componentsHome/collage/CollageWorks"
import "../../styles/homePage.css"


export const HomePage = () => {

    const Lang = useContext(LangContext)

    const descriptionRef = useRef(null);
    const servicesRef = useRef(null);
    const coursesRef = useRef(null);
    const reviewRef = useRef(null);

    // Función para manejar el auto scroll

    const scrollToRef = (ref) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            });
        }
    };


    return (
        <>
            <div className="Home">
                <header className="header-home">
                    <ul className="list-header bg-gray-pearl">
                        <li className="item-header" onClick={() => scrollToRef(descriptionRef)}>Trabajo</li>
                        <li className="item-header" onClick={() => scrollToRef(servicesRef)}>Servicios</li>
                        <li className="item-header" onClick={() => scrollToRef(coursesRef)}>Cursos</li>
                        <li className="item-header" onClick={() => scrollToRef(reviewRef)}>Reseñas</li>
                    </ul>
                    <div className="header-content">
                        <h2 className="title">BIENVENIDO A</h2>
                        <h1 className="title-principal">Miracles Nail Studio</h1>
                        <h1 className="subtitle">Fantasia y Belleza</h1>
                        <p className="text-home content-text">
                            Una sueño que se puede hacer realidad <br />
                            No esperes mas y tansforma tus manos</p>
                        <button className="btn-see-more input-text">Registrarse</button>
                    </div>

                </header>
                <main>
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
                            <div className="fresas-container">
                            </div>
                        </div>
                    </section>
                    <section className="services-main" ref={servicesRef}>
                        <GalleryHome />
                    </section>
                    <section className="collageWorks">
                        <CollageWorks />
                    </section>
                    { /* <section className="coursesSectionHome" ref={coursesRef}>

                        <h1 className="titlePrincipal">Cursos</h1>

                         <div className="coursesSectionHomeContent">
                            <img src="src/assets/uñas.png" alt="" />
                            <h2 className="subtitle">Despierta tus talentos</h2>
                            <h2>Aprende todo sobre las uñas,<br />
                                desde esculpidos <br />
                                hasta su cuidado!!!</h2>
                            <button>Que Esperas Aprovecha Los mejores precios</button>

                        </div>
                      
                        
                    </section>*/}

                    <section className="review" ref={reviewRef}>
                        <h1 className="title">Reseñas</h1>
                        <div>
                            <div>
                                <h2>Deja tu reseña</h2>
                                <p>(debes estar registrado)</p>
                                <div>
                                    aca van las estrellas
                                </div>
                                <form action="">
                                    <label htmlFor="reseña">Deja tu opinion</label>
                                    <textarea name="reseña" id="reseña"></textarea>
                                </form>
                            </div>
                            <div>
                                <h2>Ver Recientes</h2>
                                <div></div>
                            </div>
                        </div>
                    </section>
                </main>


            </div >
            <Footer />
        </>
    )
}
