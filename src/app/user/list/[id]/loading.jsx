import React from 'react';

function Loading() {
  return (

    <div className="flex overflow-x-auto no-scrollbar w-[99%] ">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex-shrink-0">
          <div className="bg-loading   rounded-md lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28 m-2"></div>
        </div>
      ))}
    </div>

  );
}

export default Loading;
