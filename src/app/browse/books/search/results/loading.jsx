export default function Loading() {
  return (
    <div className="2xl:w-[1300px] xl:w-[1200px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] mx-auto">
      <div className="animate-pulse">
        <div className="bg-loading h-8 w-3/4 my-2 md:my-10 ml-5 rounded-md"></div>

        <div className="flex flex-wrap lg:justify-between justify-center">
          
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex 2xl:w-[650px] xl:w-[600px] lg:w-[500px] norm:w-[725px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] 2xl:h-[300px] xl:h-[275px] lg:h-[225px] norm:h-[325px] md:h-[275px] sm:h-[200px] h-[175px] xs:h-[150px] my-3"
            >
              <div className="flex items-stretch bg-loading rounded-md 2xl:w-[225px] xl:w-[200px] lg:w-[175px] norm:w-[225px] md:w-[200px] sm:w-[150px] w-[110px] xs:w-[80px]">
                <div className="w-full h-full"></div>
              </div>
              <div className="flex flex-col justify-between 2xl:w-[425px] xl:w-[400px] lg:w-[325px] norm:w-[500px] md:w-[400px] sm:w-[300px] w-[230px] xs:w-[215px] p-3">
                <div className="space-y-2">
                  <div className="bg-loading h-6 rounded-md w-3/4"></div>
                  <div className="bg-loading h-5 rounded-md w-1/2"></div>
                  <div className="bg-loading h-4 rounded-md w-1/3"></div>
                  <div className="bg-loading h-4 rounded-md w-1/4"></div>
                  <div className="bg-loading h-4 rounded-md w-1/5"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="bg-loading h-10 w-[120px] rounded-md"></div>
                  <div className="flex gap-2">
                    <div className="bg-loading h-10 w-10 rounded-full"></div>
                    <div className="bg-loading h-10 w-10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
