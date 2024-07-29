import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function NavBar() {

    const { isAuthenticated, logout, user } = useAuth()
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 p-10 rounded-md">
            <Link to={
                isAuthenticated ? "/tasks" : "/"
            }>
            <h1 className="text-2xl font-bold">TasksManager</h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                    <li>
                        Welcome {user.username}
                    </li>
                    <li>
                            <Link to='/add-task' className="text-white bg-indigo-500 px-4 py-1 rounded-sm">Añadir tarea</Link>
                    </li>
                    <li>
                            <Link to='/' onClick={() => {logout()}} className="text-white">Logout</Link>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <Link to='/login' className="text-white bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
                    </li>
                    <li>
                            <Link to='/register' className="text-white bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
                    </li>
                </>
                )}
                
            </ul>
        </nav>
    )
}

export default NavBar