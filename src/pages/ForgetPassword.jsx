import axios from "axios";
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api";
import { validateEmail, validatePasswordForget } from "../helper/PasswordForget";

const ForgetPassword = () => {

    const [userInLocalStorage, setUserInLocalStorage] = useState(false);
    const [showField, setShowFiled] = useState(false);

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [time, setTime] = useState(30);


    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [generateOtp, setGenerateOtp] = useState(true);
    const [resend, setResend] = useState(false);
    const [email, setEmail] = useState(location.state?.email || "");


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserInLocalStorage(true);
            setEmail(user?.email);
        }
    }, [])

    const resendOtp = async () => {
        const validate = validateEmail(email);
        if (!validate) return;

        if (loading) return; // Prevent multiple API calls
        setResend(true);
        setLoading(true)
        try {
            const user = {
                email: email,
            };

            const res = await axios.post(`${api}/api/otp/generate`, user);
            if (res.status === 200) {
                toast.success("OTP sent successfully");
                setGenerateOtp(false);
                setLoading(false)
                setShowFiled(true);
                // Start the countdown
                setIsDisabled(true); // Disable the button
                setTime(30); // Reset countdown timer to 30 seconds

                const countdown = setInterval(() => {
                    setTime((prevTime) => {
                        if (prevTime <= 1) {
                            clearInterval(countdown); // Stop the countdown
                            setIsDisabled(false); // Re-enable the button
                            setLoading(false)

                            return 0;
                        }
                        return prevTime - 1; // Decrement the timer
                    });
                }, 1000);
            }
        } catch (error) {
            toast.error("Error sending OTP.");
            console.error(error);
        } finally {
            setResend(false); // Re-enable the resend button
            setLoading(false)

        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        const validate = validatePasswordForget(email, password);

        if (!validate) {

            return;
        }
        setLoading(true);
        try {
            const fetchuser = JSON.parse(localStorage.getItem("user"));
            const userId = fetchuser.userId
            if (!fetchuser || !fetchuser.userId) {
                toast.warn("Bad Request ");
                return;
            }
            const userPayload = {
                userId: userId,
                otp: otp,
                password: password
            };
            const res = await axios.post(`${api}/auth/forgetpassword`, userPayload);
            if (res) {
                toast.success("Passwod Successfully change");

            } else {
                toast.error("OTP verification failed.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);

            if (error.response) {
                toast.error(error.response.data || "OTP verification failed.");
            } else {
                toast.error("Error verifying OTP. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="md:w-[70%] w-full h-screen sm:h-[80%] sm:border-[0.5px] sm:border-gray-500 rounded-[10px] text-[rgb(255,255,255)] overflow-hidden sm:bg-[rgba(255,255,255,0.1)] relative flex flex-col justify-center items-center">

                <div className=" flex flex-col justify-center items-center">
                    {
                        userInLocalStorage ?
                            <div className="font-serif mt-5 font-bold text-sm tracking-wider text-gray-400 flex justify-center text-center" style={{ fontFamily: "Montserrat" }}>
                                <h5 >Enter Confirmation Code we sent to {email}
                                </h5>
                            </div>
                            : <div className=" flex flex-col justify-center items-center">
                                <div className="font-serif mt-5 font-bold text-sm tracking-wider text-gray-400 flex justify-center text-center" style={{ fontFamily: "Montserrat" }}>
                                    <h5 >Enter your email for sending otp :
                                    </h5>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter Email for sending otp "
                                    autoComplete="username"
                                    onChange={(e) => { setEmail(e.target.value); }}
                                    className="p-3 bg-transparent rounded-lg focus:outline-none ring-2 ring-gray-400 focus:border-none text-white placeholder:text-lg mt-5"
                                />
                            </div>
                    }
                    <input
                        type="number"
                        placeholder="Confirmation Code"
                        onChange={(e) => { setOtp(e.target.value); }}
                        className="p-3 bg-transparent rounded-lg focus:outline-none ring-2 ring-gray-400 focus:border-none text-white placeholder:text-lg mt-5"
                    />
                    <div className="cursor-pointer flex justify-center items-center "  >
                        <div className={`py-2 px-5 rounded-full hover:text-black font-semibold text-xs uppercase tracking-widest text-gray-300 border-2 border-blue-600 mt-5 ${isDisabled == false ? "transition-transform duration-700 ease-in-out hover:scale-110  hover:bg-blue-600 " : ""} ${isDisabled ? "hover:text-red-500" : ""}`}>
                            {
                                generateOtp ?
                                    <button className="uppercase" disabled={isDisabled} onClick={resendOtp}>Gnerate Otp</button>
                                    :
                                    time > 0 ?
                                        <button className="uppercase" disabled={isDisabled} onClick={resendOtp}>{`Resend OTP (${time})`}</button>
                                        :
                                        <button className="uppercase" disabled={isDisabled} onClick={resendOtp}>Resend OTP</button>
                            }

                        </div>
                        <div className={`h-5 w-5 ${resend ? "" : "hidden"} ml-4 mt-5 animate-spin border-t-3 rounded-full border-blue-600 border-x-4`}></div>
                        <ToastContainer theme="dark" />
                    </div>
                    {
                        showField ?
                            <div className="flex flex-col justify-center items-center  ">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    onChange={(e) => { setPassword(e.target.value); }}
                                    className="p-3 bg-transparent rounded-lg focus:outline-none ring-2 ring-gray-400 focus:border-none text-white placeholder:text-lg mt-5"
                                />
                                <button
                                    className="transition-transform duration-700 ease-in-out hover:scale-110 uppercase hover:bg-blue-600 py-4 px-10 rounded-full hover:text-black font-semibold text-xs tracking-widest text-gray-300 border-2 border-blue-600 mt-5 items-center justify-center"
                                    onClick={changePassword}
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <div className="h-5 w-5 mx-auto animate-spin border-t-2 rounded-full border-blue-900 border-x-4"></div>
                                    ) : (
                                        "Verify"
                                    )}
                                </button>
                            </div> : ""
                    }
                </div>

            </div>
        </div>
    )
}

export default ForgetPassword