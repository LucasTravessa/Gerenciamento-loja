import { ReactNode } from 'react';
import Header from "@/app/components/Header/Header";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}