import { useContext } from "react"
import { LangContext } from "../context/contextLang/LangContext"
import "../styles/aboutPage.css"


export const AboutPage = () => {
    const Lang = useContext(LangContext)

    return (
        <>
            <div className="aboutBody">
                <div className="foto">
                    <img src="" alt="" />
                </div>
                <div className="presentacion bgText ">
                    <h2>Sobre Mi?</h2>
                    <p>{Lang.abouMe}</p>
                </div>
            </div>

        </>
    )
}
