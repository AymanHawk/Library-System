'use client'

import { useAuth, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function UserLayout({ children }) {
    const { isLoaded, isSignedIn } = useAuth();
    const {user} = useUser();

    const pathname = usePathname();
    const userId = pathname.split('/').pop();

    const id = isLoaded && isSignedIn && user ? user.id : null;

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Please sign in to access this page.</div>;
    }

    if (id !== userId) {
        // Redirect or show an error if the user ID doesn't match
        return <div>Access Denied: Invalid User ID.</div>;
    }

    return <div>{children}</div>;
}

