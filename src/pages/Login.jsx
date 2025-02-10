import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaGooglePlusG } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Login = () => {
    const [signinBgColor, setSigninBgColor] = useState(false);
    const [swap, setSwap] = useState(false);
    const [rotation, setRotation] = useState(false);
    let color = ` radial-gradient(circle, rgba(37,13,64,1) 0%, rgba(27,13,78,1) 100%)`;

    const toggleSwap = () => {
        setSwap(!swap);
        setSigninBgColor(!signinBgColor);
        setRotation(!rotation);
    };

    return (
        <div className="h-screen dark:bg-black bg-white w-screen flex justify-center items-center ">
          <div className="lg:w-[60%] h-[80%] border-[0.5px] border-gray-500 rounded-[10px] text-[rgb(255,255,255)] overflow-hidden bg-[rgba(255,255,255,0.1)] relative flex flex-col sm:flex-row items-center">
  <div
    className={`w-full sm:w-[50%] h-full  transition-transform duration-700 ease-in-out  ${swap ? "translate-x-full" : "translate-x-0"}`}
  >
                    {rotation ?
                        <div className={`w-full h-full flex justify-center items-center `} >
                            <Signup />
                        </div>

                        :
                        <div className={`w-full h-full flex justify-center items-center  `} >
                            <Signin />
                        </div>
                    }
                </div>

                <div
                    className={`w-[50%] h-full transition-transform duration-700 ease-in-out flex flex-col justify-center items-center  ${swap ? "-translate-x-full" : "translate-x-0"
                        }`}
                    style={{ background: `${color}` }}
                >
                    {
                        rotation ?
                            <ForSigninContent />
                            :
                            <ForSignupContent />
                    }

                    <button
                        onClick={toggleSwap}
                        className="uppercase  transition-transform duration-700 ease-in-out  hover:scale-110 hover:bg-[#9f64e2] py-2 px-10 rounded-full tracking-widest hover:text-black font-semibold
            text-white border-2 border-[#9f64e2] mt-10 text-xs "
                    >
                        {
                            rotation ? "Sign in" : "Sign up"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
export const IconList = () => {
    return (
        <ul className="list-none flex mt-5">
            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <FaFacebookF className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
            </li>
            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <FaGooglePlusG className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
            </li>
            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <FaLinkedinIn className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
            </li>
            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <FaGithub className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
            </li>
        </ul>
    )
}
export const Signin = () => {
    return (
        <div className="flex justify-center items-center flex-col w-full  ">
            <h1 className='text-white text-4xl font-bold font-serif' style={{ fontFamily: "Montserrat" }}>Sign in</h1>
            <IconList />
            <div className="mt-6 w-full max-w-xs flex justify-center items-center flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-[80%] p-3 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-gray-400 focus:ring-2 text-white focus:border-none  placeholder:text-xl"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-[80%] p-3 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-none text-white  placeholder:text-xl mt-5"
                />
            </div>
            <a href="#forget" className="font-serif mt-10 text-sm tracking-wider uppercase text-gray-300" style={{ fontFamily: "Montserrat" }}>
                Forget your password ?
            </a>
            <button type="submit"
             className="transition-transform duration-700 ease-in-out  hover:scale-110 uppercase hover:bg-[#9f64e2] py-2 px-10 rounded-full  hover:text-black font-semibold text-xs tracking-widest
                text-gray-300 border-2 border-[#9f64e2] mt-5 ">Sign in </button>
        </div>
    );
};

export const Signup = () => {
    return (
        <div className="flex justify-center items-center flex-col w-full  ">
            <h1 className='text-white text-3xl font-bold font-serif' style={{ fontFamily: "Montserrat" }}>Create Account</h1>
            <IconList />
            <div className=" w-full max-w-xs flex justify-center items-center flex-col">
                <input
                    type="text"
                    placeholder="Name"

                    className="w-[80%] p-2 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-none text-white  placeholder:text-xl mt-5"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-[80%] p-2 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-gray-400 focus:ring-2 text-white focus:border-none  placeholder:text-xl mt-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-[80%] p-2 bg-transparent  border-b border-gray-400 focus:rounded-lg focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-none text-white  placeholder:text-xl mt-2"
                />

            </div>

            <button className="uppercase  transition-transform duration-700 ease-in-out  hover:scale-110 hover:bg-[#9f64e2] py-2 px-10 rounded-full tracking-widest hover:text-black font-semibold
            text-gray-300 border-2 border-[#9f64e2] mt-5  text-xs ">
                Sign Up
            </button>
        </div>
    );
};

export const ForSignupContent = () => {
    return (
        <div className=" w-[70%] flex flex-col justify-center items-center text-center space-y-5 text-xl">
            <h1 className="text-4xl font-bold font-serif" style={{ fontFamily: "Montserrat" }}>Hello, Friend!</h1>
            <p className="text-lg text-gray-200">Enter your personal details and start journey with us</p>
        </div>
    )

}
export const ForSigninContent = () => {
    return (

        <div className=" w-[70%] flex flex-col justify-center items-center text-center space-y-5 text-xl">
            <h1 className="text-3xl font-bold font-serif" style={{ fontFamily: "Montserrat" }}>Welcome Back!</h1>
            <p className="text-lg text-gray-200">To keep connected with us please login with your personal info</p>
        </div>
    )

}