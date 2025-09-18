import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbarStyle.css";
import { useContext, useEffect, useState, useRef, memo } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Menu, X, CalendarHeart, SquareUserRound, House, NotebookText, ScanHeart } from 'lucide-react';
import { IconButton } from '@components/button/icon-button/IconButton';
import { SecondaryButton } from "@components/button/secondary-button/SecondaryButton";


const NavBarComponent = () => {
    const { user, logout, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [offcanvas, setOffcanvas] = useState(false)
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            setIsVisible(false); // 👈 scroll hacia abajo => esconder
        } else if (currentScrollY < lastScrollY) {
            setIsVisible(true); // 👈 scroll hacia arriba => mostrar
        }
        setLastScrollY(currentScrollY);
    };

    const navRef = useRef(null);
    const handleClick = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
            if (window.scrollY > 0) {
                setIsVisible(false);
            }
        }
    };


    const handleOffcanvasToggle = (estado) => {
        setOffcanvas(estado);
    }
    const MenuLink = ({ to, children }) => (
        <li className="nav-item">
            <NavLink to={to} className="nav-link" onClick={() => handleOffcanvasToggle(false)}>
                {children}
            </NavLink>
        </li>
    );

    const handleLogin = () => {
        navigate('/iniciar-sesion');
        handleOffcanvasToggle(false)
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
        handleOffcanvasToggle(false)
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClick);
        };
    }, [lastScrollY]);

    return (
        <>
            <nav ref={navRef} className={`navbar bg-light-black  ${isVisible ? 'visible' : ''}`}>
                <div className="container-nav">
                    <NavLink to='/' className="navbar-brand">
                        <House
                            size={30}
                        />
                    </NavLink>
                    <h2 className="title-principal nav-title">Miracles Nails Studio</h2>
                    <Menu
                        cursor={"pointer"}
                        size={30}
                        color="var(--pink)"
                        className="nav-icon-button"
                        type="button"
                        onClick={() => handleOffcanvasToggle(true)}
                    />

                </div>
                <div className={` canvas-fade ${offcanvas ? 'show-fade' : ''}`}></div>
                <div className={` offcanvas bg-light-black ${offcanvas ? 'show-canvas' : ''}`}>
                    <div className="canvas-header">
                        <h5 className="offcanvas-title">Menu</h5>
                        <IconButton
                            icon="X"
                            color="var(--pink)"
                            size={24}
                            className="nav-icon-button"
                            handleClick={() => handleOffcanvasToggle(false)}
                            type="button"
                        />

                    </div>

                    <div className="canvas-body" >
                        <ul className="nav-list ">

                            <MenuLink to='/' className="nav-link">
                                <SecondaryButton
                                    color="var(--pink)"
                                    icon="House"
                                    textBtn="Inicio"
                                />
                            </MenuLink>

                            <MenuLink to='/cursos' className="nav-link">
                                <SecondaryButton
                                    color="var(--pink)"
                                    icon="NotebookText"
                                    textBtn="Cursos"
                                />
                            </MenuLink>

                            <MenuLink to='/turnos' className="nav-link">
                                <SecondaryButton
                                    color="var(--pink)"
                                    icon="CalendarHeart"
                                    textBtn="Turnos"
                                />
                            </MenuLink>

                            <MenuLink to='/user' className="nav-link">
                                <SecondaryButton
                                    color="var(--pink)"
                                    icon="SquareUserRound"
                                    textBtn="Perfil"
                                />
                            </MenuLink>

                            <MenuLink to='/sobremi' className="nav-link">
                                <SecondaryButton
                                    color="var(--pink)"
                                    icon="ScanHeart"
                                    textBtn="Sobre Mi"
                                />
                            </MenuLink>
                        </ul>
                    </div>
                    <div className="canvas-footer">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="btn btn-danger btn-text">cerrar</button>
                        ) : (
                            <button onClick={handleLogin} className="btn btn-pink btn-text">iniciar</button>
                        )}
                    </div>
                </div>
            </nav>

            <button type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(true);
                }}
                className={`show-menu bg-light-black ${isVisible ? 'translate-up' : ''}`}>
                <Menu
                    size={20}
                    color="var(--pink)"
                />
            </button >

        </>
    );
};

export const NavBar = memo(NavBarComponent);
