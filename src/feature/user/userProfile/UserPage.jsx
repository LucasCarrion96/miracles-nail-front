import { useContext, useEffect, useState } from "react";
import { Footer } from '@components/layout';
import { UserNav } from "./UserNav";
import axios from "axios";
import "./profileStyles/userStyle.css";
import { Navigate, useNavigate } from "react-router-dom";


export const UserPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    // Estados para los datos del perfil
    const [userData, setUserData] = useState(null);  // Cambié el estado inicial a null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Endpoint unificado para datos del perfil
                const response = await axios.get(`${apiUrl}/users/profile`, {
                    withCredentials: true,
                });
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener el perfil del usuario:", err);
                setError("Error al cargar los datos. Por favor, intenta de nuevo.");
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    // Verifica si userData tiene los datos esperados antes de renderizar
    if (!userData) {
        return <p>No se encontraron datos de usuario.</p>;
    }

    const singNow = (turn) => {
        navigate('/pagar-seña', {
            state: {
                turnId: turn.idTurns,
                service: turn.Service.nameService,
                servicePrice: turn.Service.price,
                serviceAdd: turn.AdditionalService.nameService,
                totalPrice: turn.totalPrice,
                señaPrice: turn.totalPrice * .5,
                turnDay: turn.turnDay,
                horario: turn.idSchedule,
                nailArtCount: turn.nailArtQuantity,
                threeDCount: turn["3dQuantity"],
                caricatureCount: turn.caricatureQuantity,
            },
        });
    }

    return (
        <>
            <div className="userBody container">
                <UserNav />
                <header className="profile">
                    <div className="imgProfile">
                        {/* Verifica si la imagen de perfil está disponible */}
                        <img className="userImg" src={userData.img || "/default-profile.png"} alt="Perfil" />
                        <button type="button" className="changeImg">Cambiar Imagen</button>
                    </div>
                    <h1 className="userName">
                        {userData.user.userName || "Nombre no disponible"} {userData.user.userSurname || "Apellido no disponible"}
                    </h1>
                </header>
                <hr />

                <main className="mainProfile">
                    <h2>Mis turnos</h2>
                    {/* Verifica si 'turns' existe y es un arreglo */}
                    {userData.turns && Array.isArray(userData.turns) && userData.turns.length > 0 ? (
                        <table className="tableProfile table table-striped mx-auto">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Trabajo</th>
                                    <th scope="col">Precio</th>
                                    <th>pagar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.turns.map((turn, index) => (
                                    <tr key={index}>
                                        <td>{turn.turnDay}</td>
                                        <td>{turn.time}</td>
                                        <td>{turn.Service.nameService}</td>
                                        <td>${turn.price}</td>
                                        <td><button onClick={() => singNow(turn)}>señar ahora</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No tienes turnos registrados.</p>
                    )}

                    <h2>Cursos Pagados</h2>
                    {/* Verifica si 'Courses' existe y es un arreglo */}
                    {userData.user.Courses && Array.isArray(userData.user.Courses) && userData.user.Courses.length > 0 ? (
                        <table className="table table-striped mx-auto">
                            <thead>
                                <tr>
                                    <th scope="col">Curso</th>
                                    <th scope="col">Categoría</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Duración</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.user.Courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.title}</td>
                                        <td>{course.category}</td>
                                        <td>{course.description}</td>
                                        <td>${course.price}</td>
                                        <td>{course.duration} horas</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No tienes cursos pagados registrados.</p>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};
