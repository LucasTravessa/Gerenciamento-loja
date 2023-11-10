import { getServerAuthSession } from "~/server/auth";
import TestHeader from "../_components/Header/Header";
import LoginModal from "../_components/Modals/LoginModal";

export default async function LayoutHome({children}: {children: React.ReactNode}) {
    const session = await getServerAuthSession()

    return(
        <>
            <TestHeader session={session}/>
            <LoginModal />
            {children}
        </>
    )
}