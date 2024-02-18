import { BottomTag } from "../components/Bottomtag";
import { Button } from "../components/Button";
import { TopTag } from "../components/Toptag";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signup() {
    const[firstName,setFirstname]=useState("");
    const[lastName,setLastname]=useState("");
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();


    return <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col border-2 border-black rounded-lg w-[33%] h-[80%] bg-slate-300">
            <TopTag label={"Sign Up"} />
            <InputBox onChange={(e) => {
                setFirstname(e.target.value);
            }} label={"First Name"} placeholder={"Enter you First name"} />
            <InputBox onChange={(e)=>{
                setLastname(e.target.value);
            }} label={"Last Name"} placeholder={"Enter you Last name"} />
            <InputBox onChange={(e)=>{
                setUsername(e.target.value);
            }} label={"Username"} placeholder={"Enter you user name"} />
            <InputBox onChange={(e)=>{
                setPassword(e.target.value);
            }} label={"Password"} placeholder={"Enter you password"} />
            <Button onPress={async()=>{
               const response = await axios.post("transaction-qeuqh1be7-souvikiiests-projects.vercel.app/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password
                });
                navigate("/signin")
            }} label={"Sign Up"} />
            <BottomTag label={"Already have an account?"} bottomText={"Sign In"} to={"/signin"} />
        </div>
    </div>
}