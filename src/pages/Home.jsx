import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate =useNavigate();
  const [user,setUser]=useState({})

           useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
          navigate("/login"); // Redirect if no user is found
        } else {
          setUser(userData);
        }
      }, [navigate]);
      
      const logout=()=>{
        localStorage.removeItem("user");
        navigate("/login")
      }
  
  return (
    <div className="h-screen w-screen flex justify-center" style={{
      backgroundImage: `url(/img.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="font-serif px-4 bg-[rgba(0,0,0,0.5)] h-2/4 rounded-xl justify-center tracking-wider text-gray-400 flex flex-col items-center mt-[15%] text-center" style={{ fontFamily: "Montserrat" }}>
                    <h5  className={`text-[#d86834] font-bold  text-[40px]  `} style={{fontFamily:  "Zen Dots",fontWeight:900 }} > hey! {user?.name}</h5>
               
                    <h5  className={`text-[#cec32d] font-bold mt-[20px] text-[30px] `} style={{fontFamily:  "Zen Dots",fontWeight:900 }} >You Succsessfully Login our System</h5>
                    <button
                        className="w-40 py-5 transition-transform duration-700 ease-in-out hover:scale-110 uppercase bg-[#d4a72a] rounded-full text-black font-semibold text-xs tracking-widest  mt-5 items-center justify-center"
                       onClick={logout}
                    >
                      Logout                       
                    </button>
                </div>
    </div>
  )
}

export default Home