import React from 'react'
import edit from '../../../../../images/edit-pen.png'
import Image from 'next/image'


function Preferences() {
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
                  <input type="text" className='outline-none bg-secondary p-1 w-[400px]' />
                </div>
                <Image src={edit} alt='edit' width={32} height={32} />
              </div>
              <div className='flex justify-start gap-3'>
                <div className='flex flex-col'>
                  City
                  <input type="text" className='outline-none bg-secondary p-1 w-[200px]' />
                </div>
                <div className='flex flex-col'>
                  State
                  <input type="text" className='outline-none bg-secondary p-1 w-[60px]' />
                </div>
                <div className='flex flex-col'>
                  Zip
                  <input type="text" className='outline-none bg-secondary p-1 w-[115px]' />
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