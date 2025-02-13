import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verification from "./pages/Verification";
import Home from "./pages/Home";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
  )
}

export default App