import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {

    const {register, handleSubmit,formState: {errors},} = useForm();
    const {signin, errors: signinErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const onSubmit= handleSubmit((data) => {
        signin(data)
    })

    useEffect(() => {
        if(isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {
                    signinErrors.map((error,i) => (
                        <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-3xl font-bold my-2">Login</h1>
            <form 
            onSubmit={onSubmit}>

                <input type="email" {...register("email", {required: true})} 
                className="2-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="email"/>
                {
                errors.email &&(<p className="text-red-500">Email is required</p>)
                }
                <input type="password" {...register("password", {required: true})} 
                className="2-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="password"/>
                {
                errors.password &&(<p className="text-red-500">Password is required</p>)
                }
                <div className="flex items-center justify-center">
                    <button className="bg-indigo-500 rounded-md text-white px-4 py-2 2-full p-5" type="submit">Login</button>
                    </div>
            </form>
            <p className="flex gap-x-2 justify-between">
                Dont have an account? <Link to="/register" className="text-blue-500">Sing up</Link>
            </p>
            </div>
        </div>
    )
}

export default LoginPage