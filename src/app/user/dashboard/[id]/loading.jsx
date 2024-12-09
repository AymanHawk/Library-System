import React from 'react'

function Loading() {
    return (
        <div className="flex flex-wrap justify-evenly gap-5 py-3">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="cursor-pointer bg-loading w-[125px] h-[175px]" >
                </div>
            ))
            }
        </div>
    )
}

export default Loading