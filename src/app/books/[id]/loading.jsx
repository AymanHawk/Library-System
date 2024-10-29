export default function Loading() {
  return (
    <div className="flex flex-col 2xl:w-[1400px] xl:w-[1250px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[345px] xs:w-[250px] mx-auto mt-5">
      <div className="flex mb-5 sm:justify-between justify-center flex-wrap items-center sm:px-2 2xl:h-[555px] xl:h-[475px] lg:h-[400px] norm:h-[475px] md:h-[360px] sm:h-[235px]">
        <div className="2xl:w-[350px] xl:w-[300px] lg:w-[250px] norm:w-[300px] md:w-[225px] sm:w-[150px] w-[300px] xs:w-[200px] bg-loading animate-pulse rounded-md h-full"></div>
        <div className="2xl:w-[625px] xl:w-[575px] lg:w-[450px] norm:w-[380px] md:w-[305px] sm:w-[250px] w-[325px] xs:w-[200px] 2xl:h-[555px] xl:h-[475px] lg:h-[400px] norm:h-[475px] md:h-[360px] sm:h-[235px]  animate-pulse rounded-md p-2">
          <div className="text-bg-loading 2xl:text-6xl xl:text-5xl lg:text-4xl norm:text-5xl md:text-3xl sm:text-2xl text-2xl xs:text-xl">
            <span className="bg-loading animate-pulse rounded-md block h-14 w-full"></span>
          </div>

          <div className="xl:my-5 lg:my-3 md:my-2 my-2  md:p-2 p-1 2xl:text-4xl xl:text-3xl lg:text-2xl norm:text-3xl md:text-xl sm:text-lg text-xl xs:text-lg rounded-md">
            <span className="bg-loading animate-pulse rounded-md block h-14 w-full"></span>
          </div>

          <div className="2xl:text-2xl xl:text-xl lg:text-lg norm:text-xl md:text-base sm:text-sm text-base xs:text-sm 2xl:h-[325px] xl:h-[280px] lg:h-[240px] norm:h-[260px] md:h-[210px] sm:h-[125px] h-[210px] xs:h-[150px] no-scrollbar overflow-y-scroll p-2 border-bg-loading ">
            <div className="2xl:text-2xl xl:text-xl  lg:text-lg norm:text-xl md:text-base sm:text-sm text-base xs:text-sm 2xl:h-[325px] xl:h-[280px] lg:h-[240px] norm:h-[260px] md:h-[210px] sm:h-[125px] h-[210px] xs:h-[150px] no-scrollbar overflow-y-scroll p-2 border-bg-loading ">
              <span className="w-full max-w-[100%] bg-loading animate-pulse rounded-md h-full max-h-full block"></span>
            </div>
          </div>
        </div>

        <div className="2xl:w-[350px] xl:w-[300px] lg:w-[250px] 2xl:h-[550px]  border-bg-loading lg:flex flex-col justify-center hidden">
          <div className="flex flex-wrap h-[45px] mb-[15px]">
            <div className="cursor-default flex justify-start items-center h-max 2xl:w-[225px] xl:w-[200px] lg:w-[150px] ">
              <section className=" h-[45px] 2xl:w-[175px] xl:w-[150px] lg:w-[105px] 2xl:text-2xl xl:text-xl lg:text-base content-center my-auto text-center animate-pulse bg-loading"></section>
              <section className=" h-[45px] w-[45px] flex items-center justify-end bg-loading">
                {/* Placeholder for loading icon */}
                <div className="mx-auto relative animate-pulse bg-loading">
                  
                </div>
                <section
                  className={` z-10 absolute 2xl:w-[150px] xl:w-[125px] lg:w-[95px] 2xl:text-2xl xl:text-xl lg:text-base 2xl:mt-[142px] xl:mt-[134px] lg:mt-[127px] text-center`}
                >
                  <ul className="text-white"></ul>
                </section>
              </section>
            </div>
            <div className="flex flex-nowrap xl:w-[100px] xl:gap-2 w-[90px]bg-gray-400 ">
              {/* Placeholders for like and dislike buttons */}
              <div className="cursor-default">
                <div className="animate-pulse h-10 w-10 bg-loading rounded-full"></div>
              </div>
              <div className="cursor-default">
                <div className="animate-pulse h-10 w-10 bg-loading rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="h-[50px] bg-loading  rounded-md flex items-center justify-center">
            <section
              className="2xl:text-4xl xl:text-3xl lg:text-2xl text-black"
              name="libraries"
              id="libraries"
            ></section>
          </div>
          <div className="my-3 text-loading font-bold 2xl:text-3xl xl:text-2xl lg:text-lg">
            <div className="my-3 text-loading font-bold 2xl:text-3xl xl:text-2xl lg:text-lg">
              <div className="flex justify-between items-center my-2">
                <div className="w-1/4 bg-loading animate-pulse rounded-md h-6"></div>
                <div className="text-right text-loading font-normal w-2/4 bg-loading animate-pulse rounded-md h-6">
                  {" "}
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-1/4 bg-loading animate-pulse rounded-md h-6"></div>
                <div className="text-right text-loading font-normal w-2/4 bg-loading animate-pulse rounded-md h-6">
                  {" "}
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-1/4 bg-loading animate-pulse rounded-md h-6"></div>
                <div className="text-right text-loading font-normal w-2/4 bg-loading animate-pulse rounded-md h-6">
                  {" "}
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-1/4 bg-loading animate-pulse rounded-md h-6"></div>
                <div className="text-right text-loading font-normal w-2/4 bg-loading animate-pulse rounded-md h-6">
                  {" "}
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-1/4 bg-loading animate-pulse rounded-md h-6"></div>
                <div className="text-right text-loading font-normal w-2/4 bg-loading animate-pulse rounded-md h-6">
                  {" "}
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-1/4 bg-loading animate-pulse rounded-md h-6"></div>
                <div className="text-right text-loading font-normal w-2/4 bg-loading animate-pulse rounded-md h-6">
                  {" "}
                </div>
              </div>
            </div>
          </div>
          <button className="bg-loading w-full h-16 py-2 rounded-md text-2xl relative overflow-hidden">
            <span className="bg-loading animate-pulse rounded-md h-full w-full block"></span>
          </button>
        </div>
      </div>
      <div className="w-[80%] h-1  mx-auto my-5 animate-pulse "></div>
      <div className="flex justify-around flex-wrap">
        <div className="norm:w-[350px] md:w-[275px] sm:w-[275px] w-[300px] xs:w-[250px] 2xl:h-[550px]  animate-pulse rounded-md">
          {/* Skeleton for the heading */}
          <h2 className="text-transparent font-bold bg-loading rounded-md 2xl:text-5xl xl:text-4xl lg:text-3xl norm:text-4xl md:text-3xl sm:text-2xl text-3xl h-10 mb-4"></h2>

          {/* Skeleton for the list */}
          <ul className="flex flex-col justify-around">
            {Array.from({ length: 9 }).map((_, index) => (
              <li key={index} className="flex justify-between mb-2">
                {/* Skeleton for each list item */}
                <span className="font-bold bg-loading rounded-md h-10 w-3/5"></span>
                <span className="bg-loading rounded-md h-10 w-1/4"></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="2xl:w-[400px] xl:w-[375px] lg:w-[300px] norm:w-[350px] md:w-[275px] sm:w-[215px] w-[160px] xs:w-[200px]">
          <h2 className="text-transparent font-bold bg-loading rounded-md 2xl:text-5xl xl:text-4xl lg:text-3xl norm:text-4xl md:text-3xl sm:text-2xl text-3xl h-10 mb-4"></h2>


          <div className="flex flex-wrap gap-2 justify-evenly">
            {/* Placeholder for tags */}
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                className="bg-loading rounded-3xl capitalize p-4 2xl:text-4xl xl:text-3xl lg:text-2xl norm:text-3xl md:text-2xl sm:text-xl text-lg animate-pulse  h-16 w-40"
                key={index}
              >
                {/* Placeholder text could be added here if needed */}
                <span className="rounded-3xl 2xl:w-[200px] xl:w-[180px] lg:w-[160px] norm:w-[170px] md:w-[160px] sm:w-[150px] w-[140px] xs:w-[150px] h-14  animate-pulse"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="2xl:w-[400px] xl:w-[375px] lg:w-[300px] norm:w-[350px] md:w-[275px] sm:w-[215px] w-[160px] xs:w-[200px]  animate-pulse rounded-md p-4 ">
          {/* Header placeholder */}
          <h2 className="text-transparent font-bold bg-loading rounded-md 2xl:text-5xl xl:text-4xl lg:text-3xl norm:text-4xl md:text-3xl sm:text-2xl text-3xl h-10 mb-4 -mt-4"></h2>

          {/* Placeholder for loading tags */}
          <ul className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <li className="flex justify-between items-center" key={index}>
                {/* Tag text skeleton */}
                <span className="bg-loading rounded-3xl 2xl:w-[200px] xl:w-[180px] lg:w-[160px] norm:w-[170px] md:w-[160px] sm:w-[150px] w-[140px] xs:w-[150px] h-14 animate-pulse"></span>

                {/* Number skeleton */}
                <span className="bg-loading rounded-md animate-pulse h-8 w-14"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[80%] h-1 bg-gray-300 mx-auto my-5 animate-pulse"></div>
      <div className="flex flex-col w-11/12 mx-auto mt-5 mb-10 gap-4">
        <div className="flex justify-between items-end">
          <span className="2xl:w-[200px] xl:w-[180px] lg:w-[160px] norm:w-[150px] md:w-[140px] sm:w-[120px] w-[100px] xs:w-[90px] bg-loading animate-pulse rounded-md h-[50px] block"></span>
          <span className="2xl:w-[200px] xl:w-[180px] lg:w-[160px] norm:w-[150px] md:w-[140px] sm:w-[120px] w-[100px] xs:w-[90px] bg-loading animate-pulse rounded-md h-[50px] block"></span>
        </div>
        <div className="flex justify-between">
          <div className="h-48 w-[55%] lg:w-[65%] border-[1px] border-loading border-solid rounded-md">
            <span className="w-full max-w-[100%] bg-loading animate-pulse rounded-md h-full max-h-full block"></span>
          </div>
          <div className="h-48 w-[40%] lg:w-[30%] border-[1px] border-loading border-solid rounded-md">
            <span className="w-full max-w-[100%] bg-loading animate-pulse rounded-md h-full max-h-full block"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
