import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login"); // Redirect if no user is found
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false once the image is loaded
  };

  return (
    <div
      className="h-screen w-screen flex justify-center "
      style={{
        backgroundImage: `url(/img.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading ? (
        <div className="loading-spinner">
          <div className="w-screen h-screen justify-center items-center">
          <div className="h-5 w-5 mx-auto animate-spin border-t-2 rounded-full border-[#6247c5] border-x-4"></div>
          </div>
        </div> 
      ) : (
        <div
          className="font-serif px-4 bg-[rgba(0,0,0,0.5)] h-2/4 rounded-xl justify-center tracking-wider text-gray-400 flex flex-col items-center mt-[15%] text-center"
          style={{ fontFamily: "Montserrat" }}
        >
          <h5
            className={`text-[#d86834] font-bold text-[40px]`}
            style={{ fontFamily: "Zen Dots", fontWeight: 900 }}
          >
            hey! {user?.name}
          </h5>

          <h5
            className={`text-[#cec32d] font-bold mt-[20px] text-[30px]`}
            style={{ fontFamily: "Zen Dots", fontWeight: 900 }}
          >
            You Successfully Logged into our System
          </h5>
          <button
            className="w-40 py-5 transition-transform duration-700 ease-in-out hover:scale-110 uppercase bg-[#d4a72a] rounded-full text-black font-semibold text-xs tracking-widest mt-5 items-center justify-center"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Use onLoad to detect when the image is fully loaded */}
      <img
        src="/img.png"
        alt="background"
        onLoad={handleImageLoad}
        style={{ display: "none" }} // Hide the image element itself
      />
    </div>
  );
};

export default Home;
