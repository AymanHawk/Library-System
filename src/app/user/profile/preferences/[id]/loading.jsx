import React from 'react'

function Loading() {
    return (
        <div className='w-[500px] overflow-x-auto no-scrollbar'>
            <div className='flex gap-3'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className='border-secondary w-[250px] border-[1px] p-2 rounded-md animate-pulse'
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