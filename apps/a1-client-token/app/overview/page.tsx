import Card from "../../components/card"
import { data } from "@repo/utils/src/data"

const Overview = ()=>{

    const overviewData = [
        ...data,
        {
            title: "Result", 
            description: "Comparative analysis table, discussion, and empirical test log.",
            link: "http://localhost:3001/result",
            options: []
        }
    ]
    return(<div className="!space-y-6">
        <div className="!space-y-2">
            <div className="text-xs vtext-[var(--hint)] uppercase">Research Demonstration</div>
            <h1 className="text-xl font-bold">A Comparative Security Analysis of Authentication Architectures</h1>
        </div>
        <p className="text-sm">
         This study examines three common patterns for handling authentication tokens in web applications — localStorage, HttpOnly cookies, and a Backend-for-Frontend proxy — evaluating each against key security criteria including token exposure, XSS susceptibility, and API surface visibility. The goal is to provide a structured, empirical comparison to inform architecture decisions in security-sensitive contexts.            
        </p>
        <div className="grid grid-cols-2 gap-4">
            {
                overviewData.map((e,i)=>{
                    return(<Card key={`Card_${e.title}_${i}`} data={e} />)
                })
            }
        </div>
    </div>)
}
export default Overview