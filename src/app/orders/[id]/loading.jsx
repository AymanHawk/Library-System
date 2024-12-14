import React from 'react'

function Loading() {
    return (
        <div className="animate-pulse">
            <div className="text-primary text-xl m-2 ml-6 bg-loading h-6 w-32 rounded"></div>
            <div className="flex flex-wrap justify-evenly items-start">
                <div className="border-secondary p-5 w-[90%] md:w-[60%] mb-4 md:mb-0 border-[1px] rounded-md">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-row gap-1 p-1 border-b-[1px] w-full pb-4 mb-4 last:mb-0 last:border-b-0 transition-transform duration-300"
                        >
                            <div className="w-20 h-32 bg-loading rounded"></div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="bg-loading h-4 w-1/2 rounded"></div>
                                <div className="bg-loading h-4 w-1/3 rounded"></div>
                                <div className="bg-loading h-4 w-1/4 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-[90%] md:w-[35%] min-w-[210px]">
                    <div className="border-secondary p-2 border-[1px] text-primary rounded-md">
                        <div className="bg-loading h-6 w-3/4 rounded mb-4"></div>
                        <div className="flex flex-col gap-2 p-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex justify-between">
                                    <div className="bg-loading h-4 w-1/3 rounded"></div>
                                    <div className="bg-loading h-4 w-1/3 rounded"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mb-2">
                            <div className="bg-loading h-8 w-24 rounded"></div>
                        </div>
                    </div>
                    <div className="flex justify-center my-2">
                        <div className="bg-loading h-8 w-36 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading