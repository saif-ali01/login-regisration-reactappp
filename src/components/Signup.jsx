import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api";
import axios from "axios";
import IconList from "./IconList";
import { validateSignUpFields } from "../helper/SignupAuth";
import { ToastContainer } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validate = validateSignUpFields({ email, password, name });
        if (!validate) {
            // If validation fails, stop the execution
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };
        try {
            const response = await axios.post(`${api}/auth/register`, user);
            if (response.status === 201) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log("Saved user to localStorage:", JSON.parse(localStorage.getItem("user")));
                navigate("/verification");
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 400:
                        alert(data || 'Bad request. Please check your input.');
                        break;
                    case 403:
                        alert(data || 'Please verify your email');
                        navigate("/verification");
                        break;
                    case 409:
                        alert(data || "User is already present with this email.");
                        break;
                    case 500:
                        alert(data || 'Server error. Please try again later.');
                        break;
                    default:
                        alert('An unexpected error occurred.');
                }
                console.log(data)
            } else {
                console.error('Error:', error);
                alert('Network error. Please check your connection.');
            }
        }
    };


    return (
        <div className="flex justify-center items-center flex-col w-full  ">
            <h1 className='text-white text-3xl font-bold font-serif' style={{ fontFamily: "Montserrat" }}>Create Account</h1>
            <IconList />
                <form onSubmit={handleSignUp} className="w-full max-w-xs flex justify-center items-center flex-col">
            <div className=" w-full max-w-xs flex justify-center items-center flex-col">

                    <input
                        type="text"
                        placeholder="Name"
                        required
                        className="w-[80%] p-2 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-none text-white  placeholder:text-xl mt-5"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <input
                        type="email"
                        required
                        placeholder="Email"
                         autoComplete="username"
                        className="w-[80%] p-2 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-gray-400 focus:ring-2 text-white focus:border-none  placeholder:text-xl mt-2"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                        className="w-[80%] p-2 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-none text-white  placeholder:text-xl mt-2"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
            </div>

            <button type="submit" className="uppercase  transition-transform duration-700 ease-in-out  hover:scale-110 hover:bg-[#9f64e2] py-2 px-10 rounded-full tracking-widest hover:text-black font-semibold
            text-gray-300 border-2 border-[#9f64e2] mt-5  text-xs " >
                Sign Up
            </button>
                </form>
            <ToastContainer theme="dark" />
        </div>
    );
}

export default Signup