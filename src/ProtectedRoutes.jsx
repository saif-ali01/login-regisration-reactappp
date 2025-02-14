/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ Component }) => {
    
    const navigate =useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem("user");
        if(!login){
            navigate("/login")
        }
    })
    return <Component />;
}

export default ProtectedRoutes