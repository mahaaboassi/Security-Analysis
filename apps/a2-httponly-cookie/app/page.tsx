import Login from "../components/login";
import { data } from "@repo/utils/src/data"

export default function Home() {
  console.log(data)
  return (
    <div className="h-screen ">
      <Login/>
    </div>
  );
}
