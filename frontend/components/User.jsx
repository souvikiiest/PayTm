import { useEffect, useState } from "react"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function User(){
    const [UserArray,setUserArray]=useState([]);
    const [textSearch,setTextSearch]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk",{
            params:{
                filter:textSearch
            }
        }).
        then(response=>{
            setUserArray(response.data.user);
        })
    },[textSearch]);


    return <div className="rounded-2 bg-slate-100 shadow-md">
        <div className="mx-4 pt-3">Users</div>
        <input onChange={e=>{
            setTextSearch(e.target.value);
        }} type="text" placeholder="Search Users...." className=" w-[100%] my-4 mx-4 py-2 px-2 shadow-lg hover:shadow-xl rounded-lg rounded-2"></input>
        <div>
            {UserArray.map(function renderUser(user){
                return <UserComponent key={user._id} user={user}/> 
            })}
        </div>
    </div>
}
function UserComponent({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex ">
            <div className="rounded-full text-center pt-2 pr-0.8 h-10 w-10 bg-blue-500 text-white mx-3 my-2">{user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}</div>
            <div className="mx-1 my-4">{user.firstName} {user.lastName}</div>
        </div>
        <div className="flex flex-col justify-center mr-2">
            <Button onPress={(e)=>{
                navigate("/send?id="+user._id + "&name=" + user.firstName)
            }} label={"Send Money"}/>
        </div>
    </div>
}