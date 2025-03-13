import { useContext, useRef } from "react"
import { Footer } from "../../components/Footer"
import { LangContext } from "../../context/contextLang/LangContext"
import { GalleryHome } from "./componentsHome/gallery/GalleryHome";
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
                <header className="headerHome">
                    <ul className="listHeader">
                        <li className="itemHeader" onClick={() => scrollToRef(descriptionRef)}>Trabajo</li>
                        <li className="itemHeader" onClick={() => scrollToRef(servicesRef)}>Servicios</li>
                        <li className="itemHeader" onClick={() => scrollToRef(coursesRef)}>Cursos</li>
                        <li className="itemHeader" onClick={() => scrollToRef(reviewRef)}>Reseñas</li>
                    </ul>
                    <div className="headerContent">
                        <h2 className="subtitle">BIENVENIDO A</h2>
                        <h1 className="titleHome titlePrincipal">Miracles Nail Studio</h1>
                        <h1 className="subtitle">Fantasia y Belleza</h1>
                        <p className="textHome contentText">
                            Una sueño que se puede hacer realidad <br />
                            No esperes mas y tansforma tus manos</p>
                        <button className="btnSeeMore">Registrarse</button>
                    </div>
                    <img className="headerImg" src="../src/assets/headerImg.png" alt="" />
                </header>
                <main>

                    <section className="descriptionMain mx-auto" ref={descriptionRef}>

                        <div className="descriptionText">

                            <h1 className="titlePrincipal titleDescriptionHome">
                                Arte+Calidad
                            </h1>
                            <h2 className="subtitle">
                                con atencion personalizada
                            </h2>
                            <p className="contentText">{Lang.bodyHome}</p>
                            <div className="fresasContainer">

                            </div>
                        </div>
                    </section>

                    <section className="servicesMain mb-5" ref={servicesRef}>
                        <GalleryHome></GalleryHome>

                    </section>


                    <section className="coursesSectionHome" ref={coursesRef}>

                        <h1 className="titlePrincipal">Cursos</h1>

                        <div className="coursesSectionHomeContent">
                            <img src="src/assets/uñas.png" alt="" />
                            <h2 className="subtitle">Despierta tus talentos</h2>
                            <h2>Aprende todo sobre las uñas,<br />
                                desde esculpidos <br />
                                hasta su cuidado!!!</h2>
                            <button>Que Esperas Aprovecha Los mejores precios</button>

                        </div>
                    </section>

                    <section className="review" ref={reviewRef}>
                        <h1 className="titlePrincipal">Reseñas</h1>
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
