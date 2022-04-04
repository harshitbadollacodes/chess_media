import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetAuthStatus } from "./userSlice";

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isUserLoggedIn, status, error } = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function loginHandler(e) {
        e.preventDefault();
        await dispatch(loginUser({email, password}));
    };

    function guestCrendentialHandler(){
        setEmail("vish@gmail.com");
        setPassword("testing");
    };
    
    useEffect(() => {
        dispatch(resetAuthStatus());
        isUserLoggedIn && navigate("/");
    }, [ isUserLoggedIn, navigate, dispatch]);

    return (
        <div className="flex flex-col items-center lg:h-[90vh] justify-center rounded-lg p-4">
            <h1 className="text-5xl mb-4 lg:text-5xl font-bold text-d-blue text-center">
                Login
            </h1>

            {status === "error" && (
                <p className="font-bold text-red-500">
                    {error}
                </p>
            )}
                
            <form
                className="w-full md:w-[70%]"
                onSubmit={(e) => loginHandler(e)}    
            >   
                <div className="">
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
                <p className="text-center">
                    Don't have an account ? <Link 
                            to="/signup"
                            className="text-l-blue"
                        >
                            Sign Up
                        </Link>
                </p>
                <input 
                    type="submit"
                    value={status === "loading" ? "Logging in..." : "Login" }
                    className="btn cursor-pointer w-full mt-4" 
                />

                <button 
                    onClick={guestCrendentialHandler}
                    className="btn my-2 w-full"
                >
                    Guest Credentials
                </button>

            </form>
        </div>
    );
}