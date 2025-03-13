import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/navbarStyle.css";
import { useContext, useEffect, useState, memo } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBarComponent = () => {
    const { user, logout, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    const handleLogin = () => navigate('/iniciar-sesion');

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 200) setIsVisible(false);
        else if (currentScrollY < lastScrollY) setIsVisible(true);
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar navbar-light bg-light fixed-top ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="container-fluid">
                <NavLink to='/' className="navbar-brand">
                    <img className="navImg" src="../src/assets/3.png" alt="Logo" />
                    <h2>Miracles</h2>
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-light" tabIndex="-1" id="offcanvasDarkNavbar">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Menu</h5>
                        <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item"><NavLink to='/' className="nav-link">Inicio</NavLink></li>
                            <li className="nav-item"><NavLink to='/cursos' className="nav-link">Cursos</NavLink></li>
                            <li className="nav-item"><NavLink to='/turnos' className="nav-link">Turnos</NavLink></li>
                            <li className="nav-item"><NavLink to='/user' className="nav-link">Perfil</NavLink></li>
                            <li className="nav-item"><NavLink to='/sobremi' className="nav-link">Sobre Mi</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">cerrar</button>
                        ) : (
                            <button onClick={handleLogin} className="bg-green-500 px-4 py-2 rounded">iniciar</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// 🚀 Aplicamos React.memo para prevenir renders innecesarios
export const NavBar = memo(NavBarComponent);
