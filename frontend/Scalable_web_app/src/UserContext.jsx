import { createContext, useState } from "react";

// Global State using context in react
export const UserContext= createContext();

const UserProvider=({children})=>{
    const [user,setUser]=useState(localStorage.getItem("user_name"));

    return(
        <UserContext.Provider value={{
            user,setUser
            }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;