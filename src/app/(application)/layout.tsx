import { getServerAuthSession } from "~/server/auth";
import TestHeader from "../_components/Header/Header";

export default async function LayoutHome({children}: {children: React.ReactNode}) {
    const session = await getServerAuthSession()

    return(
        <>
            <TestHeader session={session}/>
            {children}
        </>
    )
}