'use client'
import React, { useEffect, useState } from 'react'
import edit from '../../../../../images/edit-pen.png'
import drop from '../../../../../images/drop-white.png'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Error from 'next/error'


function Preferences() {

  const [stAdd, setStAdd] = useState();
  const [cityAdd, setCityAdd] = useState();
  const [stateAdd, setStateAdd] = useState();
  const [zipAdd, setZipAdd] = useState();
  const { user } = useUser();


  const changeAddress = async () => {
    try {
      const res = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          userId: user.id,
          street: stAdd,
          state: stateAdd,
          city: cityAdd,
          zip: zipAdd
        }),
      });

      const data = await res.json();
      if(!data.success){
        console.error('Failed to update the Address');
      }
    } catch (err) {
      console.error('Error changing address:', err);
    }
  }

  const getAddress = async () => {
    try {
      const res = await fetch('/api/address', {
        method: 'GET',
        headers: {
          'userId': user.id
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

    } catch (err) {
      console.log("Error getting address", err);
    }
  }

  useEffect(() => {
    if (user && user.id) {
      getAddress();
    }
  }, []);


  return (
    <div className='2xl:w-[1400px] xl:w-[1200px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] mx-auto'>
      <h1 className='text-2xl text-White'>
        User Preferences
      </h1 >
      <div className='border-secondary rounded-md border-[1px] p-2 flex justify-between'>
        <div className='2xl:w-[500px] xl:w-[400px] lg:w-[350px] norm:w-[275px] md:w-[250px] sm:w-[175px] w-[140px] xs:w-[100px] py-10'>
          <div className='text-3xl 2xl:w-[350px] xl:w-[300px] lg:w-[275px] norm:w-[250px] md:w-[200px] sm:w-[125px] w-[100px] xs:w-[60px] mx-auto text-center'>
            <div className='bg-primary rounded-sm font-bold text-background py-2'>Liked</div>
            <div className='mt-10'>
              <div className='border-secondary border-[1px] rounded-md text-primary py-1 my-2'>Generes</div>
              <div className='border-secondary border-[1px] rounded-md text-primary py-1 my-2'>Themes</div>
              <div className='border-secondary border-[1px] rounded-md text-primary py-1 my-2'>Paces</div>
            </div>
          </div>
          <div className='text-3xl 2xl:w-[350px] xl:w-[300px] lg:w-[275px] norm:w-[250px] md:w-[200px] sm:w-[125px] w-[100px] xs:w-[60px] mx-auto text-center mt-10'>
            <div className='bg-primary rounded-sm font-bold text-background py-2'>Disliked</div>
            <div className='mt-10'>
              <div className='border-secondary border-[1px] rounded-md text-primary py-1 my-2'>Generes</div>
              <div className='border-secondary border-[1px] rounded-md text-primary py-1 my-2'>Themes</div>
              <div className='border-secondary border-[1px] rounded-md text-primary py-1 my-2'>Paces</div>
            </div>
          </div>
        </div>
        <div className='mt-10 2xl:w-[850px] xl:w-[750px] lg:w-[600px] norm:w-[425px] md:w-[325px] sm:w-[250px] w-[175px] xs:w-[160px]'>
          <div className='mb-10'>
            <h2 className='text-primary text-4xl'>Address</h2>
            <div>
              <div className='flex items-end mb-5'>
                <div className='flex flex-col'>
                  Street Address
                  <input type="text" className='outline-none bg-secondary p-1 w-[427px]' value={stAdd} onChange={(e) => { setStAdd(e.target.value) }} />
                </div>
                <Image src={edit} alt='edit' width={32} height={32} onClick={changeAddress}/>
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
            <h2 className='text-primary'>Library Card</h2>
            <div>
              Location
            </div>
            <div>
              ID#232414
            </div>
            <div>

            </div>
          </div>
          <div>
            <h2 className='text-primary'>Edit Preference</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preferences