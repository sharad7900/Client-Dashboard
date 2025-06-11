import { createContext, useEffect, useState } from "react";


export const AssigneeContext = createContext();

export const AssigneeIDs = ({children})=>{

    const [ID,setID] = useState(()=>{
        const stored = localStorage.getItem("AssigneeIDList");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
    localStorage.setItem("AssigneeIDList", JSON.stringify(ID));
  }, [ID]);
    return(<AssigneeContext.Provider value={{ID,setID}}>{children}</AssigneeContext.Provider>)
}