import React from 'react'

function Loading() {
    return (
        <div className="flex flex-col mt-8 ml-6">
            <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="w-full flex items-center space-x-4 border-b-[1px] pb-3">
                        <div className="h-5 bg-loading w-1/4 rounded"></div> 
                        <div className="h-4 bg-loading w-1/4 rounded"></div>
                        <div className="ml-2 bg-loading w-20 h-8 rounded-md"></div> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Loading