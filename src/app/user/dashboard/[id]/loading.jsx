import React from 'react'

function Loading() {
    return (
        <div className="flex sm:flex md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 justify-self-center gap-2 py-3 sm:gap-5 md:gap-3 lg:gap-5">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="cursor-pointer bg-loading w-[80px] sm:w-[100px] md:w-[90px] lg:w-[110px] xl:w-[120px] h-[100px] sm:h-[140px] md:h-[140px] lg:h-[160px] xl:h-[165px]" >
                </div>
            ))
            }
        </div>
    )
}

export default Loading