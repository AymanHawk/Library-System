'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import dashboard from '../../../../images/dashboard.png'
import preferences from '../../../../images/preferences.png'
import React from 'react'
import { useRouterContext } from '../../../../utils/RouterContext'
import Image from 'next/image'
import LibNavbar from '../../../../components/LibNavbar'
import { usePathname } from 'next/navigation'

function Profile() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const { user } = useUser();

  const handleDashboardRedirect = () => {
    if (user) {
      router.push(`/user/dashboard/${user.id}`);
    }
  };

  const handlePreferencesRedirect = () => {
    if (user) {
      router.push(`/user/profile/preferences/${user.id}`)
    }
  }
  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      Profile
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="Dashboard"
            labelIcon={<Image src={dashboard} alt="Dashboard Icon" width={20} height={20} />}
            onClick={handleDashboardRedirect}
          />
        </UserButton.MenuItems>
        <UserButton.MenuItems>
          <UserButton.Action
            label="Preferences"
            labelIcon={<Image src={preferences} alt="Preferences Icon" width={20} height={20} />}
            onClick={handlePreferencesRedirect}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  )
}

export default Profile