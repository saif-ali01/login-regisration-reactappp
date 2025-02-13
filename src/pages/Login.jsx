
import { useState } from "react";


import Signup from "../components/Signup";
import Signin from "../components/Signin";

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
    const checkRotaion = () => {
        setRotation(!rotation);
    }
    return (
        <div className="sm:h-screen  dark:bg-black w-screen flex justify-center items-center ">
            <div className="md:w-[60%]  w-full h-screen  sm:h-[80%] sm:border-[0.5px] sm:border-gray-500 rounded-[10px] text-[rgb(255,255,255)] overflow-hidden sm:bg-[rgba(255,255,255,0.1)]  relative flex flex-col sm:flex-row justify-center items-center">
                <div
                    className={`w-full sm:w-[50%] sm:h-full h-[60%] transition-transform duration-700 ease-in-out  ${swap ? "translate-x-full" : "translate-x-0"}`}
                >

                    {rotation ?
                        <div className={`w-full h-full  flex justify-center items-center flex-col `} >
                            <Signup />
                            <div className=" flex sm:hidden tracking-widest font-semibold text-gray text-xs mt-5">
                                <h6 href="#forget" className="font-serif mt-5 text-sm tracking-wide text-gray-400 " style={{ fontFamily: "Montserrat" }}>
                                    if you already an account ? <a className="text-[#9f64e2]"onClick={checkRotaion}>signin</a>
                                </h6>
                            </div>
                        </div>

                        :
                        <div className={`w-full sm:h-full   flex justify-center items-center flex-col `} >
                            <Signin />
                            <div className="flex sm:hidden tracking-widest font-semibold text-gray text-xs mt-5 ">
                                <h6 href="#forget" className="font-serif mt-5 text-sm tracking-wide text-gray-400" style={{ fontFamily: "Montserrat" }}>{
                                    "if you  don't an have account ?"}

                                    <a className="text-[#9f64e2]" onClick={checkRotaion}>signup</a>
                                </h6>
                            </div>
                        </div>
                    }
                </div>

                <div
                    className={`w-[50%] h-full transition-transform duration-700 ease-in-out sm:flex hidden flex-col justify-center items-center  ${swap ? "-translate-x-full" : "translate-x-0"
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
            text-white border-2 border-[#9f64e2] mt-10 text-xs  "
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