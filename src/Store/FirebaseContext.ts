import { createContext } from "react";

interface FirebaseContextType {
    auth: any
    db: any
    storage:any
    // other properties
}

export const FirebaseContext = createContext({} as FirebaseContextType)