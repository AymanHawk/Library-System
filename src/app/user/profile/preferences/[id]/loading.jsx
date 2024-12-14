import React from 'react'

function Loading() {
    return (
        <div className='2xl:w-[850px] xl:w-[750px] lg:w-[550px] norm:w-[525px] md:w-[390px] sm:w-[270px] w-[280px] overflow-x-auto no-scrollbar'>
            <div className='flex gap-3'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className='border-secondary 2xl:w-[850px] xl:w-[750px] lg:w-[550px] norm:w-[525px] md:w-[390px] sm:w-[270px] w-[280px] border-[1px] p-2 rounded-md animate-pulse'
                    >
                        <div>
                            <div className='bg-loading h-4 w-3/4 rounded mb-2'></div>
                            <div className='bg-loading h-4 w-1/2 rounded mb-2'></div>
                        </div>
                        <div>
                            <div className='bg-loading h-4 w-3/4 rounded mb-2'></div>
                        </div>
                        <div>
                            <div className='bg-loading h-4 w-1/2 rounded'></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Loading