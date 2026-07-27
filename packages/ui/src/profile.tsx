"use client"
import { Button } from "./button"
type ProfileProps = {
    accessToken?: string,
    address?: string,
    email?: string,
    file?: string,
    id?: number,
    name?: string,
    username?: string
}
type DataProps = {
    data: ProfileProps,
    logout: ()=> void
}
const Profile = ({data, logout}: DataProps)=>{
    return(<div className="!space-y-4">
        <div className="!space-y-1">
            <h2 className="text-2xl font-semibold text-[var(--main)]">
            User Profile
            </h2>
            <p className="text-sm">
            Authenticated session — read-only view.
            </p>
        </div>
        <ul className="!space-y-2 border text-sm rounded border-[var(--hint)] !p-2">
            <li className="flex justify-between border-b border-[var(--hint)] !pb-1">
                <div className="uppercase text-[var(--secondary)]">Name</div>
                <div className="font-semibold">{data?.name || "-"}</div>
            </li>
            <li className="flex justify-between border-b border-[var(--main-light)] !pb-1">
                <div className="uppercase text-[var(--main-light)]">Username</div>
                <div className="font-semibold">{data?.username || "-"}</div>
            </li>
            <li className="flex justify-between border-b border-[var(--hint)] !pb-1">
                <div className="uppercase text-[var(--main-light)]">Email</div>
                <div className="font-semibold">{data?.email || "-"}</div>
            </li>
            <li className="flex justify-between !pt-1">
                <div className="uppercase text-[var(--main-light)]">Address</div>
                <div className="font-semibold">{data?.address || "-"}</div>
            </li>
        </ul>
        <div>
            <Button onClick={logout} className="outline w-full" appName="Localy">Logout</Button>
        </div>
    </div>)
}

export default Profile