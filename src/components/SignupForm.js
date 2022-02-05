import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../features/user/userSlice";

export function SignupForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { status, error } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function signUpHandler(e) {
        e.preventDefault();
        await dispatch(signUpUser({firstName, lastName, username, email, password}));
        navigate("/home");
    }

    return (
        <div className="flex flex-col items-center lg:h-screen justify-center rounded-lg p-4">
            <h1 className="text-5xl mb-4 lg:text-5xl font-bold text-d-blue text-center">
                Sign Up
            </h1>

            {status === "error" && (
                <p className="font-bold text-red-500">
                    {error}
                </p>
            )}

            <form
                className="w-full md:w-[70%]"
                onSubmit={(e) => signUpHandler(e)}    
            >   
                <div>
                    <label className="flex flex-col">
                        First Name
                        <input 
                            type="text"
                            required
                            placeholder="John"
                            value={firstName}                            
                            className="input-box"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label className="flex flex-col">
                        Last Name
                        <input 
                            type="text"
                            required
                            placeholder="Doe"
                            value={lastName}  
                            className="input-box"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label className="flex flex-col">
                        Username
                        <input 
                            type="text"
                            required
                            placeholder="John Doe"
                            value={username}  
                            className="input-box"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label className="flex flex-col">
                        Email
                        <input 
                            type="email"
                            required
                            placeholder="johndoe@gmail.com"
                            value={email}                            
                            className="input-box"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                
                <div>
                    <label className="flex flex-col">
                        Password
                        <input 
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            className="input-box"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label className="flex flex-col">
                        Confirm Password
                        <input 
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={confirmPassword}  
                            className="input-box"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                </div>

                <input 
                    type="submit"
                    value={status === "loading" ? "Signing Up" : "Sign Up"}
                    className="cursor-pointer w-full mt-4 bg-blue-500 hover:bg-d-blue hover:text-white transition-colors duration-300 p-2 rounded" 
                />
            </form>

            <p className="text-center">
                    Have an account ? <Link 
                            to="/login"
                            className="text-l-blue"
                        >
                            Login
                        </Link>
                </p>

        </div>
    );
}