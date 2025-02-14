import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verification from "./pages/Verification";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => {
 

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoutes Component={Home}/>}
        />
        <Route
          path="/login"
          element={<Login /> }
        />
        <Route path="/verification" element={<ProtectedRoutes Component={Verification}/>} />
        <Route path="/forgetpassword" element={<ProtectedRoutes Component={ForgetPassword}/>} />
      </Routes>
    </Router>
  )
}

export default App