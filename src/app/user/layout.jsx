'use client'


import { useAuth, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
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
        return <div>Redirecting to Sign In ...</div>

    }

    if ((id !== userId) && isSignedIn) {
        router.push(`/`);
        return <div>Unauthorized ...</div>
    }

    return <div>{children}</div>;
}

