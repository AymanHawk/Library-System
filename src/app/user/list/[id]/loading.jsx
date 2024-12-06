import React from 'react';

function Loading() {
  return (
    <div className="sm:mx-20 mx-5 animate-pulse ">
      {['Read Books', 'Liked Books', 'To-Read Books'].map((section, index) => (
        <div key={index} className="border-bg-loading rounded-md p-3 mb-10 border-loading border-2">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%] mb-4">
              <div className="bg-loading h-6 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 rounded-md"></div>
              <div className="bg-loading h-4 w-1/5 sm:w-1/6 md:w-1/7 lg:w-1/8 rounded-md"></div>
            </div>
            <div className="flex overflow-x-auto no-scrollbar w-[99%] ">
              {Array.from({ length:4  }).map((_, idx) => (
                <div key={idx} className="flex-shrink-0">
                  <div className="bg-loading   rounded-md lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28 m-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
