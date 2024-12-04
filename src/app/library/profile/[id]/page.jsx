'use client'
import { useOrganization, UserButton, useUser } from '@clerk/nextjs'
import dashboard from '../../../../images/dashboard.png'
import preferences from '../../../../images/preferences.png'
import React, { useEffect, useState } from 'react'
import { useRouterContext } from '../../../../utils/RouterContext'
import Image from 'next/image'
import edit from '../../../../images/edit-pen.png'
import drop from '../../../../images/drop-white.png'
import LibNavbar from '../../../../components/LibNavbar'
import { usePathname } from 'next/navigation'

function Profile() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const { user } = useUser();
  const [stAdd, setStAdd] = useState();
  const [cityAdd, setCityAdd] = useState();
  const [stateAdd, setStateAdd] = useState();
  const [zipAdd, setZipAdd] = useState();
  const [email, setEmail] = useState();

  const handleDashboardRedirect = () => {
    if (user) {
      router.push(`/user/dashboard/${user.id}`);
    }
  };

  const getLibDetail = async () => {
    try {

      const res = await fetch('/api/library/details', {
        method: 'GET',
        headers: {
          'libId': id
        }
      })

      if (!res.ok) {
        throw new Error('Error getting the user Address')
      }

      const data = await res.json();
      setCityAdd(data.address.city);
      setStAdd(data.address.street);
      setZipAdd(data.address.zip);
      setStateAdd(data.address.state);
      setEmail(data.email);

    } catch (err) {
      console.log("Error getting address", err);
    }
  }

  const changeDetails = async () => {
    try {
      const res = await fetch('/api/library/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          libId: id,
          street: stAdd,
          state: stateAdd,
          city: cityAdd,
          zip: zipAdd,
          email: email,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Failed to update the Address');
      }

    } catch (err) {
      console.error('Error changing address:', err);
    }
  }

  useEffect(() => {
    if (id) {
      getLibDetail();
    }
  }, [])

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
      <div>
        Email
        <input type="text" className='outline-none bg-secondary p-1 w-[427px]' value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </div>
      <div>
        Address
        <div>
          <div className='flex items-end mb-5'>
            <div className='flex flex-col'>
              Street Address
              <input type="text" className='outline-none bg-secondary p-1 w-[427px]' value={stAdd} onChange={(e) => { setStAdd(e.target.value) }} />
            </div>
            <Image src={edit} alt='edit' width={32} height={32} />
          </div>
          <div className='flex justify-start gap-3'>
            <div className='flex flex-col'>
              City
              <input type="text" className='outline-none bg-secondary p-1 w-[200px]' value={cityAdd} onChange={(e) => { setCityAdd(e.target.value) }} />
            </div>
            <div className='flex flex-col'>
              State
              <div className='w-[120px] flex items-center bg-secondary'>
                <input type="text" className='outline-none bg-secondary p-1 w-[90px] border-r-[1px]' value={stateAdd} onChange={(e) => { setStateAdd(e.target.value) }} />
                <Image src={drop} alt='dropdown' className='bg-secondary mx-auto ' width={15} height={15} />
              </div>
            </div>
            <div className='flex flex-col'>
              Zip
              <input type="text" className='outline-none bg-secondary p-1 w-[115px]' value={zipAdd} onChange={(e) => { setZipAdd(e.target.value) }} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={changeDetails}>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Profile