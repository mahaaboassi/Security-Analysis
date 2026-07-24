"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
type CardData = {
  title: string;
  description: string;
  link: string;
};

type Props = {
  data: CardData;
};
const Card = ({data}:Props)=>{
    return (<Link className="w-full h-full" href={data?.link? data.link : "#"}>
    <div className="border border-[var(--hint)] rounded !p-5 h-full
                    hover:border-[var(--secondary)] group transition-all duration-300 ease-in-out">
                        <div className="flex justify-between">
                            <h2 className="text-md font-semibold text-[var(--main)]">{data.title}</h2>
                            <ArrowRight size={"17"} className="text-[var(--hint)] group-hover:text-[var(--secondary)]" />
                        </div>
                        
                        <p className="text-sm">{data.description}</p>
                    </div>
    </Link>)
}
export default Card