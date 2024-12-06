import React from 'react'

function BookLoader() {
    return (
        <div className='flex'>
            {Array.from({ length: 15 }).map((_, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 "
                >
                    <div className="lg:w-36 lg:h-52 md:w-32 md:h-48 sm:w-32 sm:h-48 w-28 h-40 m-2 bg-loading animate-pulse rounded-lg">
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookLoader