// import { useEffect, useState} from "react";
// import supabase from "./config/supabase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserProvider from "./context/userProvider.tsx"

import Home from "./Pages/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";

function App() {
  console.log("Project URL:", import.meta.env.VITE_PROJECT_URL);
  console.log("Anonymous Token:", import.meta.env.VITE_ANON);

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedSession = localStorage.getItem("supabaseSession");
  //   if (storedSession) {
  //     const sessionData = JSON.parse(storedSession);
  //     const userData = sessionData.user;
  //     // Redirect to home page programmatically if session exists
  //     if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
  //       window.location.href = "/";
  //     }
  //     console.log(user)
  //     setUser(user)
  //     console.log("session exists");
  //   } else {
  //     console.log("no session");
  //   }
  // }, []);

  // Conditional rendering based on session existence
  if (!localStorage.getItem("supabaseSession")) {
    return (
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </UserProvider>
    );
  }

  // Render routes if session exists
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
          {/* Add other routes here if needed */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
