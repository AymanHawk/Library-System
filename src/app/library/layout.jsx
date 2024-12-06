'use client'
import { useRouterContext } from '@/utils/RouterContext';
import { useAuth, useOrganization } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function LibLayout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { organization } = useOrganization();
  const router = useRouterContext();
  const pathname = usePathname()
  const userId = pathname.split('/').pop();

  const id = isLoaded && isSignedIn && organization ? organization.id : null;


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

  return (
    <div>
      {children}
    </div>
  )
}
