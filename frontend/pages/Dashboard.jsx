import { useContext,useMemo, useState,useEffect } from "react";
import { AppBar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { User } from "../components/User";
import userContext from "../context/UserContext";
import axios from "axios";

export function Dashboard(){
    const [balance,setBalance]=useState("0");
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("transaction-qeuqh1be7-souvikiiests-projects.vercel.app/api/v1/account/balance", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            });
    
            setBalance(response.data.balance);
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        };
    
        fetchData(); 
    
      }, []);
    
    //const {contextusername} = useContext(userContext);
    // const firstUsername = useMemo(() => {
    //     if (contextusername.length > 0) {
    //       return contextusername[0].toUpperCase();
    //     }
    //     return null;
    //   }, []);
    return <div>
            <AppBar />
            <Balance balance={balance}/>
            <User />
        

    </div>
}