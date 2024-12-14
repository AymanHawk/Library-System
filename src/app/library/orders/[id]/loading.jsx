import React from 'react'

function Loading() {
  return (
    <div className="space-y-4">

    {[...Array(3)].map((_, index) => (
      <div key={index} className="py-2">
        <div className="animate-pulse">
          <h3 className="h-6 bg-loading w-1/4 rounded mb-1"></h3> 
          <div className="border-loading border-[1px] p-2 flex justify-between rounded-sm">
            <div className="flex flex-col gap-1 justify-evenly">
              {[...Array(2)].map((_, bookIndex) => (
                <div key={bookIndex} className="flex flex-row gap-1 p-2">
                  <div className="h-32 w-20 bg-loading rounded"></div> 
                  <div className="flex flex-col items-start space-y-2">
                    <div className="h-4 bg-loading w-3/4 rounded"></div> 
                    <div className="h-4 bg-loading w-1/2 rounded"></div> 
                    <div className="h-4 bg-loading w-1/3 rounded"></div> 
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-end gap-2">
              <div className="h-8 bg-loading w-24 rounded-md"></div> 
              <div className="h-8 bg-loading w-24 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Loading