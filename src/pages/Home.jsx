import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login")
    } else {
      setUser(userData);
      setLoading(false);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

 

  return (
    <div      className="h-screen w-screen flex justify-center "    >
      {loading ? (
        <div className=" w-screen h-screen flex justify-center items-center ">
          <div className="h-10 w-10  animate-spin border-t-2 rounded-full border-[#6247c5] border-x-4"></div>
        </div> 
      ) : (
        <div
          className="font-serif px-4 sm:bg-[rgba(255,255,255,0.1)] h-2/4 rounded-xl justify-center tracking-wider text-gray-400 flex flex-col items-center mt-[15%] text-center"
          style={{ fontFamily: "Montserrat" }}
        >
          <h5
            className={ `uppercase px-2 font-bold text-[40px]`}
            style={{ fontFamily: "Zen Dots", fontWeight: 900 }}
          >
            hey! {user?.name}
          </h5>

          <h5
            className={` font-bold mt-[20px] text-[20px] sm:text-[30px]`}
            style={{ fontFamily: "Zen Dots", fontWeight: 900 }}
          >
            You Successfully Logged into our System
          </h5>
          <button
            className="transition-transform duration-700 ease-in-out hover:scale-110 uppercase bg-blue-600 py-4 px-10 rounded-full text-black font-semibold text-xs tracking-widest  hover:border-blue-600 mt-5 items-center justify-center"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

   
    </div>
  );
};

export default Home;
