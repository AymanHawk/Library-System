'use client'


import { useAuth, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { SignIn } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import { useRouterContext } from "../../utils/RouterContext";


export default function UserLayout({ children }) {
    const { isLoaded, isSignedIn } = useAuth();
    const {user} = useUser();
    const router = useRouterContext();

    const pathname = usePathname();
    const userId = pathname.split('/').pop();

    const id = isLoaded && isSignedIn && user ? user.id : null;

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
            router.push(`/sign-in`);
    
    }

    if (id !== userId) {
        // Redirect or show an error if the user ID doesn't match
        router.push(`/`);
    }

    return <div>{children}</div>;
}

