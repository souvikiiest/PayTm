import React, {  useState } from "react";

import userContext from "./UserContext";

const UserContextProvider = ({children})=>{
    const [contextusername,setContextUsername]=useState();
    return (
        <userContext.Provider value={{contextusername,setContextUsername}}>
            {children}
        </userContext.Provider>
    )

}

export default UserContextProvider;