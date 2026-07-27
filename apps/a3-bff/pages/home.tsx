"use client"
import { LoginForm } from "@repo/ui/login"
import Profile from "@repo/ui/profile"
import { Helper } from "@repo/utils/src/helper"
import { useEffect, useState } from "react"

type Props = {
    username: string,
    password: string
}
type ErrorProps = {
    msg: string,
    type: "error" | "success" 
}
type ProfileProps = {
    accessToken?: string,
    address?: string,
    email?: string,
    file?: string,
    id?: number,
    name?: string,
    username?: string
}
const HomeClientPage = ()=>{
    const [ profile, setProfile ] = useState<ProfileProps>({})
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ result, setResult ] = useState<ErrorProps>({msg: "", type: "error"})
    const onSubmit = async(data:Props)=>{
        console.log(data);
        setIsSubmit(true)
        const res = await Helper({
            url: "http://localhost:5000/auth/login",
            body: data,
            method: "POST"
        })  
        console.log("*******res*******", res);
        if(res){
            if(res.err == 1){
                setResult({msg: res.msg, type: "error"})
            }else{
                localStorage.setItem("accessToken",res.data.accessToken)
                getProfile(res.data.accessToken)
            }
            
        }else{
            setResult({msg: "Something is wrong", type: "error"})
        }
 
        setIsSubmit(false)
    }
    const getProfile = async(token:any)=>{
        const res = await Helper({
            url: "http://localhost:5000/auth/me",
            token: token,
            method: "GET"
        })  
        console.log("*******22222*******", res);
        if(res.err == 1){
            setResult({msg: res.msg, type: "error"})
        }else{
            setProfile(res.data)
        }
    }
    const logout = ()=>{
        setProfile({})
        localStorage.removeItem("accessToken")
    }
    return(<div className="!space-y-4">
        {result.msg && <div className={`text-center !p-2 ${result.type === "error" ? "rounded border text-red-500 border-red-500" : ""}`}>
            {result.msg}
        </div>}
        <div className="card flex justify-center items-center ">
            {Object.keys(profile).length > 0  ? <Profile logout={logout} data={profile} /> : <LoginForm isSubmitting={isSubmit} onSubmit={(data)=>{onSubmit(data)}}/>}
        </div>
    </div>)
}

export default HomeClientPage