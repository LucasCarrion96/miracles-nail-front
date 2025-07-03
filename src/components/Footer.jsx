import "../styles/footer.css"

export const Footer = () => {
    return (
        <>
            <div className="footer bg-pink">

                <div className="footerLogo">
                    <h1 className="titlePrincipal">Arte, Moños y Gatos</h1>
                    <img className="logo" src="./src/assets/1.png" />

                </div>
                <div>
                    <h2>La informacion que necesitas</h2>
                    <ul className="footerList">
                        <li className="footerListItem">
                            <img className="redLogo" src="./src/assets/instagramLogo.png" /><p>miraclesnail</p>
                        </li>
                        <li className="footerListItem">
                            <img className="redLogo" src="./src/assets/instagramLogo.png" /><p>Mendoza, Guaymallen, Dorrego</p>
                        </li>
                        <li className="footerListItem">
                            <img className="redLogo" src="./src/assets/instagramLogo.png" /><p>Politicas</p>
                        </li>
                        <li className="footerListItem">
                            <img className="redLogo" src="./src/assets/instagramLogo.png" /><p>Comentarios</p>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
