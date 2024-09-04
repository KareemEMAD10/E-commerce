import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserTokenContext = createContext (null);

export default function UserTokenContextProvider({children}){
    let[userId,setUserId]=useState()
    let[token,setToken]=useState(null)
    function convertToken(){
        let data = jwtDecode(localStorage.getItem("token"))
        setUserId(data?.id)
        console.log("data => ",data);
        
    }
    useEffect(()=>{
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            convertToken()
            // console.log(data.id,"datadtdatadtdatdadraasdsafgatataaadsftsftaftfa");
            
        }
    })
   return <UserTokenContext.Provider value={{token,setToken,convertToken,userId}}>
    {children}
   </UserTokenContext.Provider>
}