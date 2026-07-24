"use client"
import { LoginForm } from "@repo/ui/login"


const Login = ()=>{
    return(<div className="card flex justify-center items-center ">
        <LoginForm onSubmit={(data)=>{
            console.log(data);
            
        }}/>
    </div>)
}

export default Login