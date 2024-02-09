import { useContext } from "react";
import UserContext from "./userContext.tsx";

const useUser = () => useContext(UserContext);

export default useUser;
