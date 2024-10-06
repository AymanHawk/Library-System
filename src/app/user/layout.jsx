'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Make sure to import from next/navigation
import { useAuth } from '@clerk/nextjs';

export default function UserLayout({ children }) {
    const router = useRouter();
    const { userId, isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const pathname = window.location.pathname; 
            const pathSegments = pathname.split('/');
            const id = pathSegments[pathSegments.length - 1];

            if (userId !== id) {
                router.push('/');
            }
        }
    }, [isLoaded, isSignedIn, userId, router]);
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return <div>{children}</div>;
}

