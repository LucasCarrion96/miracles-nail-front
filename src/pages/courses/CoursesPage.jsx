import { useContext } from "react"
import { LangContext } from "../../context/contextLang/LangContext"
import "./coursesStyles/coursesPagetStyle.css"
import { Footer } from "../../components/Footer";

export const CoursesPage = () => {
    const Lang = useContext(LangContext)
    return (
        <>
            <div className="coursesBody">
                <header className="courseSectionTilte">
                    <h1 className="titlePrincipal">Cursos</h1>
                    <h2 className="subtitle">Lo que necesitas</h2>
                </header>
                <main>
                    <div className="courseCards">
                        <div>
                            <h1 className="title">Esculpido</h1>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <button className="buttonMovil">{">"}</button>
                            <button className="buttonPc">Lo Quiero!!!</button>
                            <img src="../src/assets/headerImg.png" alt="" />
                        </div>
                        <div>
                            <h1 className="title">Nail-Art</h1>
                            <ul>
                                <li>asdasd</li>
                                <li>asdasd</li>
                                <li>asdasd</li>
                                <li>asdasd</li>
                            </ul>
                            <button className="buttonMovil">{">"}</button>
                            <button className="buttonPc">Lo Quiero!!!</button>
                            <img src="../src/assets/headerImg.png" alt="" />
                        </div>
                        <div>
                            <h1 className="title">Cuidado y Salud</h1>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <button className="buttonMovil">{">"}</button>
                            <button className="buttonPc">Lo Quiero!!!</button>
                            <img src="../src/assets/headerImg.png" alt="" />
                        </div>

                    </div>



                </main >
            </div >

            <Footer></Footer>

        </>
    )
}
