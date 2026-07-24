import { HeaderCard } from "@repo/ui/card";
import { data } from "@repo/utils/src/data";
import HomeClientPage from "../pages/home";

export default function Home() {
  return (
    <div className="h-screen !space-y-10">
      {data[0] && <HeaderCard title={data[0]?.title} description={data[0]?.description} options={data[0]?.options} />}
      <HomeClientPage/>
    </div>
  );
}
