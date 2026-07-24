"use client";

import { useEffect, useState } from "react";

const Navigation = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  const data = [
    {
      title: "Overview",
      link: "http://localhost:3001/overview",
    },
    {
      title: "Architecture A1",
      link: "http://localhost:3001/",
    },
    {
      title: "Architecture A2",
      link: "http://localhost:3002/",
    },
    {
      title: "Architecture A3",
      link: "http://localhost:3000/",
    },
    {
      title: "Result",
      link: "http://localhost:3001/result",
    },
  ];

  useEffect(() => {
    setCurrentUrl(
      window.location.origin + window.location.pathname
    );
  }, []);

  return (
    <nav
      className="
        flex items-center gap-6
        bg-[var(--main)]
        !px-5
        sm:!px-10
        md:!px-20
        lg:!px-40
        !py-5
      "
    >
      <div onClick={()=>{alert(currentUrl)}} className="text-white font-medium">
        Auth Architecture Study
      </div>

      <div className="flex gap-4 text-sm">
        {data.map((e, i) => {
          const isActive = e.link === currentUrl;
        
          return (
            <a
              key={`Link_${i}`}
              href={e.link}
              className={`
                rounded
                !p-1
                transition-colors
                duration-300
                hover:bg-[var(--bg-light-grey)]
                ${
                  isActive
                    ? "bg-[var(--bg-light-grey)]"
                    : ""
                }
              `}
            >
              {e.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;