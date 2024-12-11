import React from 'react'

function Loading() {
    return (
        <div className="flex flex-row flex-wrap mr-8 ml-8 mt-6 gap-1 justify-start sm:justify-center md:justify-evenly lg:justify-start">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="flex flex-row w-[80%] sm:w-[400px] md:w-[480px] lg:w-[416px] sm:h-[400px] h-[230px] sm:h-[350px] md:h-[400px] p-1 animate-pulse">
                    <div className="w-full lg:h-[350px] md:h-[375px] sm:h-[320px] h-[200px] bg-primary mr-4"></div>
                    <div className="flex flex-col h-[400px] w-[400px]">
                        <div className="bg-loading h-[32px] mb-4 rounded-md"></div>
                        <div className="bg-loading h-[23px] mb-2 rounded-md"></div>
                        <div className="bg-loading h-[23px] mb-2 rounded-md"></div>
                        <div className="bg-loading h-[23px] mb-2 rounded-md"></div>
                        <div className="bg-loading h-[23px] mb-2 rounded-md"></div>
                        <div className="bg-loading h-[23px] mb-2 rounded-md"></div>
                        <div className="bg-loading h-[40px] w-[90px] rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Loading