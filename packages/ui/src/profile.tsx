import { Button } from "./button"

const Profile = ()=>{
    return(<div>
        <div className="!space-y-1">
            <h2 className="text-2xl font-semibold text-[var(--main)]">
            User Profile
            </h2>
            <p className="text-sm">
            Authenticated session — read-only view.
            </p>
        </div>
        <ul>
            <li className="flex justify-between">
                <div className="uppercase">Name</div>
                <div>Maha</div>
            </li>
            <li className="flex justify-between">
                <div className="uppercase">Username</div>
                <div>mahaab</div>
            </li>
            <li className="flex justify-between">
                <div className="uppercase">Email</div>
                <div>maha@gmail.com</div>
            </li>
            <li className="flex justify-between">
                <div className="uppercase">Address</div>
                <div>address</div>
            </li>
        </ul>
        <div>
            <Button className="outline" appName="Localy">Logout</Button>
        </div>
    </div>)
}

export default Profile