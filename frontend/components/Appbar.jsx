import {useNavigate} from "react-router-dom";
import axios from "axios";


export function AppBar({firstUsername}){
    const navigate=useNavigate();
    const handleLogout=async()=>{
        localStorage.removeItem("token");
        navigate("/signin");
        // axios.get("http://localhost:3000/api/v1/user/logout")
        // .then(()=>{
        //     navigate("./signin");
        // })
    } 
    return <>
        <div className=" shadow-md  flex justify-between">
            <div className="flex items-center justify-start ml-3 font-extrabold">TRANSACTION APP</div>
            <div className="flex items-center">
                <div>Hello</div>
                <div className="rounded-full text-center pt-2 pr-0.8 h-10 w-10 bg-blue-500 text-white mx-3 my-2">{firstUsername}</div>
                <div onClick={handleLogout} className="cursor-pointer mr-2">Logout</div>
            </div>
        </div>
    </>
}