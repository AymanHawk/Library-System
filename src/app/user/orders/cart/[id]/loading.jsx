import React from 'react'

function Loading() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    className="flex flex-row justify-between items-start p-1 animate-pulse"
                    key={index}
                >
                    <div className="flex flex-row w-[90%] gap-2">
                        <div className="xl:w-[180px] lg:w-[250px] md:w-[190px] sm:w-[170px] w-[120px] bg-loading h-[150px] rounded-md"></div>
                        <div className="flex flex-col w-[60%] gap-2">
                            <div className="bg-loading h-8 w-[70%] rounded-md"></div>
                            <div className="bg-loading h-6 w-[50%] rounded-md"></div>
                            <div className="bg-loading h-6 w-[40%] rounded-md"></div>
                            <div className="flex justify-between items-center w-[75%]">
                                <div className="bg-loading h-6 w-[40%] rounded-md"></div>
                                <div className="bg-loading h-6 w-6 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-loading h-6 w-6 rounded-full m-2"></div>
                </div>
            ))}
        </div>
    )
}

export default Loading