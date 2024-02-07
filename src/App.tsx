import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home"
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import Create from "./Components/Create/Create"
import ViewPost from "./Pages/ViewPost"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Use Route components directly */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
