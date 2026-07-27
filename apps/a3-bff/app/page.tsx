import { HeaderCard } from "@repo/ui/card";
import { data } from "@repo/utils/src/data";
import HomeClientPage from "../pages/home";

export default function Home() {
  return (
    <div className="h-screen !space-y-10">
      {data[2] && <HeaderCard title={data[2]?.title} description={data[2]?.description} options={data[2]?.options} />}
      <HomeClientPage/>
    </div>
  );
}
