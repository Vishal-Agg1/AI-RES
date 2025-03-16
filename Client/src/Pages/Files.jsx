import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
export default function Files(){
    const [files,setfiles] = useState();
    const user_id = useSelector((state)=>{
        return state.auth.user;
    })
    axios.post("http://localhost:8000/v1/fetchfiles",{
        id:user_id,
    })
    .then(response=>{

    })
    .catch((error)=>{
        console.log(error);
    })
    return(
       <>
       </>
    )
}
