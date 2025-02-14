import axios from "axios";
import IconList from "./IconList";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { validateSignInFields } from "../helper/SignInAuth";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        const validate = validateSignInFields({email,password});
        if(!validate) return;

        if(loading)return;
        setLoading(true);

        let response;
        try {
            response = await axios.post(`${api}/auth/login`, { email, password });

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setLoading(false)
                const user = JSON.parse(localStorage.getItem("user"))
                console.log("Saved user to localStorage:", user);
                if (user.isVerified) {
                    navigate("/")
                }
            }

        } catch (error) {
            setLoading(false)
            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 400:
                        toast.error(data || 'Bad request. Please check your input.', {
                            style: {
                                width: "100%",
                                fontSize: "10x",
                                letterSpacing: "2px",
                                borderRadius: "8px",       
                            },
                        });
                        break;
                    case 401:
                        toast.error(data || 'Incorrect password! Please enter the correct password.', {
                            style: {
                                width: "100%",
                                fontSize: "10x",
                                letterSpacing: "2px",
                                borderRadius: "8px",       
                            },
                        });
                        break;
                    case 403: {
                        navigate("/verification", { state: { email }  })
                        break;
                    }
                    case 404:
                        toast.error(data || 'Email is not registered', {
                            style: {
                                width: "100%",
                                fontSize: "10x",
                                letterSpacing: "2px",
                                borderRadius: "8px",       
                            },
                        });
                        break;
                    case 500:
                        toast.error(data || 'Server error. Please try again later.', {
                            style: {
                                width: "100%",
                                fontSize: "10x",
                                letterSpacing: "2px",
                                borderRadius: "8px",       
                            },
                        });
                        break;
                    default:
                        toast.error('An unexpected error occurred.', {
                            style: {
                                width: "100%",
                                fontSize: "10x",
                                letterSpacing: "2px",
                                borderRadius: "8px",       
                            },
                        });
                }
                console.log(data)
            } else {
                console.error('Error:', error);
                toast.error('Network error. Please check your connection.', {
                    style: {
                        width: "100%",
                        fontSize: "10x",
                        letterSpacing: "2px",
                        borderRadius: "8px",       
                    },
                });
            }
        }
        finally{
            setLoading(false)

        }
    };



    return (
        <div className="flex justify-center items-center flex-col w-full  ">
            <h1 className='text-white text-4xl font-bold font-serif' style={{ fontFamily: "Montserrat" }}>Sign in</h1>
            <IconList />
            <div className="mt-6 w-full max-w-xs flex justify-center items-center flex-col">
            

                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="username"
                    className="w-[80%] p-3 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-gray-400 focus:ring-2 text-white focus:border-none  placeholder:text-xl"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="w-[80%] p-3 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-none text-white  placeholder:text-xl mt-5"
                    />
            </div>
            <a onClick={()=>{
                navigate("/forgetpassword")
            }} className="font-serif mt-10 text-sm tracking-wider cursor-pointer uppercase text-gray-300" style={{ fontFamily: "Montserrat" }}>
                Forget your password ?
            </a>
            <button type="submit"
                className="transition-transform duration-700 ease-in-out  hover:scale-110 uppercase hover:bg-[#9f64e2] py-2 px-10 rounded-full  hover:text-black font-semibold text-xs tracking-widest
                text-gray-300 border-2 border-[#9f64e2] mt-5 " onClick={handleSignin}>
                  {loading ? (
                                        <div className="h-5 w-5 mx-auto animate-spin border-t-2 rounded-full border-[#6247c5] border-x-4"></div>
                                    ) : (
                                        "Sign in"
                                    )}
            </button>
            <ToastContainer theme="dark" />
        </div>
    );
}

export default Signin