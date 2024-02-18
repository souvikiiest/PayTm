import { BottomTag } from "../components/Bottomtag";
import { Button } from "../components/Button";
import { TopTag } from "../components/Toptag";
import { InputBox } from "../components/InputBox";
import { useState,useContext, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../context/UserContext";


export function Signin() {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    const {setContextUsername}=useContext(userContext);

    return <div className="flex items-center justify-center h-screen bg-blue-200">
        <div className="flex flex-col border-2 border-black rounded-lg w-[33%] h-auto bg-slate-300">
            <TopTag label={"Sign In"}  />
            <InputBox onChange={(e)=>{
                setUsername(e.target.value)
            }} label={"User name"} placeholder={"Enter you user name"}/>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value)
            }} label={"Password"} placeholder={"Enter you password"}/>
            <Button onPress={async()=>{
                const response = await axios.post("transaction-qeuqh1be7-souvikiiests-projects.vercel.app/api/v1/user/signin",{
                    username,
                    password
                });
               localStorage.setItem("token",response.data.jwt); 
               setContextUsername(response.data.user.firstName);         
               navigate("/dashboard");
               
            }} label={"Sign In"} />
            <BottomTag label={"Don't have an account?"} bottomText={"Sign Up"} to={"/signup"}/>

        </div>
    </div>
}