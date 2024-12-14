import React from 'react'

function Loading() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, libIndex) => (
                <div key={libIndex} className="border-b-[1px] border-loading last:border-b-0">
                    <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2 bg-loading h-6 w-[30%] rounded-md"></h1>
                    <div className=" mb-2 mt-2 ml-4 mr-4 bg-loading h-6 rounded-md"></div>
                    <div className=" w-[95%] mb-2 mt-2 ml-4 mr-4 bg-loading h-6 rounded-md"></div>
                    <ul>
                        {Array.from({ length: 2 }).map((_, bookIndex) => (
                            <li
                                key={bookIndex}
                                className="flex flex-row items-start mt-4 p-1 animate-pulse"
                            >
                                <div className="mr-4 ml-4 mb-4 h-32 w-20 bg-loading rounded-md"></div>
                                <div className="flex flex-col mr-4 gap-2">
                                    <div className="bg-loading h-1 w-[70%] rounded-md"></div>
                                    <div className="bg-loading h-1 w-[50%] rounded-md"></div>
                                    <div className="bg-loading h-1 w-[40%] rounded-md"></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Loading