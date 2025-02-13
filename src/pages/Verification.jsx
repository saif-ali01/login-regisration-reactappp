import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import { api } from "../api";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
const Verification = () => {
    const [otp, setOtp] = useState("");
    const [time, setTime] = useState(30);

    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [generateOtp, setGenerateOtp] = useState(true);
    const [resend, setResend] = useState(false);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const fetchuser = JSON.parse(localStorage.getItem("user"));
    const [email, setEmail] = useState(location.state?.email || fetchuser?.email || "");




    const handleOtpVerification = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        try {
            const fetchuser = JSON.parse(localStorage.getItem("user"));
            if (!fetchuser || !fetchuser.userId) {
                toast.warn("Bad Request in your side");
                return;
            }

            console.log("User ID:", fetchuser.userId);

            const userPayload = {
                userId: fetchuser.userId,
                otp: otp
            };

            const res = await axios.post(`${api}/api/otp/verify`, userPayload);

            if (res.status === 200) {
                console.log("OTP verification successful:", res.data);
                toast.success(res.data);
                navigate("/home");
            } else {
                toast.error("OTP verification failed.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            if (error.response) {
                // Log detailed error response from the backend
                console.error("Backend response error:", error.response.data);
                toast.error(error.response.data || "OTP verification failed.");
            } else {
                toast.error("Error verifying OTP. Please try again later.");
            }
        }
    };


    const resendOtp = async () => {
        if (loading) return; // Prevent multiple API calls
        setResend(true);

        try {
            const user = {
                email: email,
            };

            const res = await axios.post(`${api}/api/otp/generate`, user);
            if (res.status === 200) {
                toast.success("OTP sent successfully");
                setGenerateOtp(false);

                // Start the countdown
                setIsDisabled(true); // Disable the button
                setTime(30); // Reset countdown timer to 30 seconds

                const countdown = setInterval(() => {
                    setTime((prevTime) => {
                        if (prevTime <= 1) {
                            clearInterval(countdown); // Stop the countdown
                            setIsDisabled(false); // Re-enable the button
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
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="md:w-[70%] w-full h-screen sm:h-[80%] sm:border-[0.5px] sm:border-gray-500 rounded-[10px] text-[rgb(255,255,255)] overflow-hidden sm:bg-[rgba(255,255,255,0.1)] relative flex flex-col justify-center items-center">
                <div className="h-20 w-20">
                    <TfiEmail className="h-full w-full text-blue-600" />
                </div>
                <h6 className="font-serif mt-5 font-bold text-sm tracking-widest uppercase text-gray-300" style={{ fontFamily: "Montserrat" }}>Enter Confirmation Code</h6>
                <div className="font-serif mt-5 font-bold text-sm tracking-wider text-gray-400 flex justify-center text-center" style={{ fontFamily: "Montserrat" }}>
                    <h5 >Enter Confirmation Code we sent to {email}  <span className={`text-blue-600 text-sm cursor-pointer ${edit ? "hidden" : ""} `} onClick={() => { setEdit(true) }}>edit </span>

                    </h5>


                </div>
                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value); }}
                        className={`${edit ? "" : "hidden"} p-3 bg-transparent rounded-lg focus:outline-none ring-2 ring-gray-400 focus:border-none text-white placeholder:text-lg mt-5`}
                    />
                    <input
                        type="number"
                        placeholder="Confirmation Code"
                        onChange={(e) => { setOtp(e.target.value); }}
                        className="p-3 bg-transparent rounded-lg focus:outline-none ring-2 ring-gray-400 focus:border-none text-white placeholder:text-lg mt-5"
                    />
                    <div className="cursor-pointer flex justify-center items-center "  >
                        <div className={`py-2 px-5 rounded-full hover:text-black font-semibold text-xs uppercase tracking-widest text-gray-300 border-2 border-blue-600 mt-5 ${isDisabled==false?"transition-transform duration-700 ease-in-out hover:scale-110  hover:bg-blue-600 ":""} ${isDisabled?"hover:text-red-500":""}`}>
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
                    <button
                        className="transition-transform duration-700 ease-in-out hover:scale-110 uppercase hover:bg-blue-600 py-4 px-10 rounded-full hover:text-black font-semibold text-xs tracking-widest text-gray-300 border-2 border-blue-600 mt-5"
                        onClick={handleOtpVerification}
                        disabled={loading}  // Disable button during loading
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Verification;
