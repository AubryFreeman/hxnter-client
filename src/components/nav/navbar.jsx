import { NavLink, useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar pb-10">
            <li className="navbar__item pl-10">
                <NavLink to={"/home"}>Home</NavLink>
            </li>
            <li className="navbar__item pl-10">
                <NavLink to={"/hunt"}>Create a Hunt</NavLink>
            </li>
            <li className="navbar__item pl-10">
                <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            {
                (localStorage.getItem("user_token") !== null) ?
                    <li className="navbar__item">
                        <button className="underline text-blue-600 hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("user_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <NavLink to={"/login"}>Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        </ul>
    )
}