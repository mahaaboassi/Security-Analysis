import { HeaderCard } from "@repo/ui/card";
import { data } from "@repo/utils/src/data";
import HomeClientPage from "../pages/home";

export default function Home() {
  return (
    <div className="h-screen !space-y-10">
      {data[1] && <HeaderCard title={data[1]?.title} description={data[1]?.description} options={data[1]?.options} />}
      <HomeClientPage/>
    </div>
  );
}
