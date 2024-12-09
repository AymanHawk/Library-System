import React from 'react'

function Loading() {
    return (
        <div>
            <h1 className='bg-loading text-center sm:text-2xl text-xl rounded-md m-2 text-loading'>.</h1>
            {Array.from({length: 8 }).map((_, index) => (
            <div className="border-secondary border-[1px] p-2 rounded-md m-2 animate-pulse" key={index}>
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center justify-center">
                        <div className="bg-loading w-24 h-5 rounded-md"></div>
                        <div className="flex gap-1">
                            <div className="bg-loading w-4 h-4 rounded-full"></div>
                            <div className="bg-loading w-4 h-4 rounded-full"></div>
                            <div className="bg-loading w-4 h-4 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-loading w-24 h-5 rounded-md"></div>
                </div>
                <div className="bg-loading w-3/4 h-6 rounded-md my-2"></div>
                <div className="bg-loading w-full h-8 rounded-md"></div>
            </div>
            ))}
        </div>
    )
}

export default Loading