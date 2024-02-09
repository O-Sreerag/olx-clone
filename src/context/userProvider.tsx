import React, {useState, useEffect, ReactNode } from "react";
import UserContext from "./userContext.tsx";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("supabaseSession");
    if (storedSession) {
      const sessionData = JSON.parse(storedSession);
      const userData = sessionData.user;
      // Redirect to home page programmatically if session exists
      if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
        window.location.href = "/";
      }
      console.log(user)
      setUser(userData)
      console.log("session exists");
    } else {
      console.log("no session");
    }
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export default UserProvider;
