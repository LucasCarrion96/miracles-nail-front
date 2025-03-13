import { Link, NavLink } from "react-router-dom"


export const UserNav = () => {
    return (
        <>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <NavLink to='/usuario/config' className="nav-link" aria-current="page" >Config</NavLink>
                </li>


            </ul>
        </>
    )
}
