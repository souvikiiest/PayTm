
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopTag } from "../components/Toptag";


export function SendMoney(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id= searchParams.get("id");
    const name=searchParams.get("name");
    const [successMsg,setSuccessMsg]=useState('');
    const [amount,setAmount]=useState("0");
    const transfer = async()=>{
        try{
            await axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:id,
                amount:amount
            },{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
            });
            setSuccessMsg("Amount sent Successfully Re-directing")
            setTimeout(()=>{
                navigate("/dashboard")
            },3000)
           }catch(err){
            setSuccessMsg(err.response.data);
           }
        }

    return <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
        <div className="flex flex-col border-2 border-black rounded-lg w-[33%]  h-auto bg-slate-300">
            <div className="flex justify-start">
                <div className="rounded-full text-center pt-2 pr-0.8 h-10 w-10 bg-blue-500 text-white mx-3 my-2">{name[0].toUpperCase()}</div>
                <div className=" pt-3 font-bold text-lg ">{name.toUpperCase()}</div>
            </div>
            <InputBox onChange={(e) => {
                setAmount(e.target.value);
            }} label={"Amount"} placeholder={"Enter Amount..."} />
            <Button onPress={transfer} label={"Send"} />
        </div>
       {successMsg && <div className="mt-5 px-2 py-2 rounded-lg w-uto bg-yellow-200 text-black flex justify-center items-center">{successMsg}</div>
       } 
    </div>
}