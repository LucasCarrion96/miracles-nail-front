import { useContext, useRef } from "react"
import { Footer } from "../../components/layout/Footer"
import { LangContext } from "../../context/contextLang/LangContext"
import { GalleryHome } from "./componentsHome/gallery/GalleryHome"
import { CollageWorks } from "./componentsHome/collage/CollageWorks"
import { DescriptionHome, HeaderHome, CoursesHome } from "./home-section"
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
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <div className="Home">
                <header className="header-home">
                    <HeaderHome
                        scrollToRef={scrollToRef}
                        descriptionRef={descriptionRef}
                        servicesRef={servicesRef}
                        coursesRef={coursesRef}
                        reviewRef={reviewRef}
                    />
                </header>
                <main>

                    <DescriptionHome
                        descriptionRef={descriptionRef}
                        Lang={Lang}
                    />

                    <section className="services-main" ref={servicesRef}>
                        <GalleryHome />
                    </section>

                    <section className="collageWorks">
                        <CollageWorks />
                    </section>

                    <section className="coursesSectionHome" ref={coursesRef}>
                        <CoursesHome />
                    </section>

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
