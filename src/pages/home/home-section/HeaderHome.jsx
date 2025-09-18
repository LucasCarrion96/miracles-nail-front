import React from 'react'
import { SecondaryButton } from '@components/button/secondary-button/SecondaryButton'
import "./section-styles/headerHome.css"
import { NavLink } from 'react-router-dom'

export const HeaderHome = ({ scrollToRef, descriptionRef, servicesRef, coursesRef, reviewRef }) => {
    return (
        <>
            <ul className="list-header bg-gray-pearl">
                <li className="item-header" onClick={() => scrollToRef(descriptionRef)}>Trabajo</li>
                <li className="item-header" onClick={() => scrollToRef(servicesRef)}>Servicios</li>
                <li className="item-header" onClick={() => scrollToRef(coursesRef)}>Cursos</li>
                <li className="item-header" onClick={() => scrollToRef(reviewRef)}>Reseñas</li>
            </ul>
            <div className="header-content">
                <h2 className="title title-header">BIENVENIDO A</h2>
                <h1 className="title-principal title-principal-header ">Miracles Nail Studio</h1>
                <h1 className="subtitle subtitle-header">Fantasia y Belleza</h1>
                <p className="text-home content-text">
                    Una sueño que se puede hacer realidad <br />
                    No esperes mas y tansforma tus manos</p>
                <NavLink to='/iniciar-sesion/crear-cuenta'>
                    <SecondaryButton
                        icon="UserRoundPen"
                        btnClass="btn"
                        textBtn="Registrar"
                    />
                </NavLink>
            </div>

        </>
    )
}
