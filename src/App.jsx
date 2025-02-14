import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verification from "./pages/Verification";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
  )
}

export default App