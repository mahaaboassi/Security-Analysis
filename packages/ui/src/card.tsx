"use client"
import { useState, type JSX } from "react";

export function HeaderCard({
  title,
  description,
  options
}: {
  description: string;
  title: string;
  options: string[];
}): JSX.Element {
  const [ isCollapse, setIsCollapse ] = useState(false)
  return (
    <div>
       <div className="flex items-center justify-between gap-5 border border-[var(--hint)] rounded !p-4">
          <div className="!space-y-2">
              <h2 className="text-md font-semibold text-[var(--main)]">{title}</h2>
              <p className="text-sm">{description}</p>
          </div>
          <div onClick={()=>setIsCollapse(!isCollapse)} className="flex items-center text-sm group hover:cursor-pointer">
            <div className="group-hover:text-[var(--secondary)]">About this architecture </div>
            <span className="group-hover:text-[var(--secondary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
       </div>
       {isCollapse && <ul className="text-sm !space-y-1 border-b border-[var(--hint)] !p-4">
        {options.map((e,i)=>{
          return <p className="flex items-center gap-2" key={`Architecture_${title}_${i}`}>
            <span className="h-2 w-2 rounded-full bg-[var(--hint)]"></span>
            {e}
            </p>
        })}
       </ul>}
    </div>
  );
}
