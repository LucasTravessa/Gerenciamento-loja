import { getServerAuthSession } from "~/server/auth";
import { BarGraph } from "../_components/Graphs/BarGraph";
import { Description } from "../_components/Description/description";

export default async function Home() {

  const session = await getServerAuthSession();
  if(!session){
    return(
      <main className="flex flex-col items-center justify-between text-white">
        <Description/>
      </main>
    )
  }
  return (
    <main className="flex flex-col items-center justify-between text-white">
      <BarGraph />
    </main>
  );
}
