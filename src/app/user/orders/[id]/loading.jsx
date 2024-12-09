import React from 'react'

function Loading() {
    return (
        Array.from({ length: 2 }).map((_, orderIndex) => (
            <div
                key={orderIndex}
                className="border-[1px] border-secondary border-solid rounded-lg flex flex-col px-4 mb-2 py-2 gap-2 overflow-x-auto no-scrollbar animate-pulse"
            >
                <div className="h-[20%] flex justify-between">
                    <div className="flex flex-col">
                        <div className="text-loading md:text-sm text-[10px] m-4">
                            <div className="bg-loading h-4 w-32 mb-2"></div>
                            <div className="flex flex-row gap-4 mt-4 mb-4">
                                {Array.from({ length: 3 }).map((_, bookIndex) => (
                                    <div
                                        key={bookIndex}
                                        className="flex flex-row transition-transform w-[120px] h-[140px] duration-300 hover:scale-[1.01] bg-loading p-2"
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-loading h-8 w-1/4 rounded-full mt-2"></div>
            </div>
        ))
    )
}

export default Loading