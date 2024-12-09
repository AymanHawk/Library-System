function Loading() {
  return (
    <div className="mx-auto 2xl:w-[1400px] xl:w-[1250px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[350px] xs:w-[250px] animate-pulse">
      <div className="lg:ml-[20px] flex flex-row flex-wrap justify-start gap-6">
        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col 2xl:w-[256px] w-[250px] h-[550px] xl:w-[226px] xl:h-[600px] lg:w-[220px] norm:w-[210px] lg:h-[630px] md:w-[250px] md:h-[630px] sm:w-[200px] sm:h-[580px] border-loading border-6 rounded-md p-4">
              <div className="bg-loading rounded-md w-full xl:h-[350px] lg:h-[350px] md:h-[350px] h-[300px] mb-4"></div>
              <div className="bg-loading h-8 w-3/4 rounded-md mb-2"></div>
              <div className="bg-loading h-6 w-1/2 rounded-md mb-2"></div>
              <div className="bg-loading h-6 w-1/3 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="bg-loading h-10 w-40 rounded-md"></div>
      </div>
    </div>
  );
}

export default Loading;
