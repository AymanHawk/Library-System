
'use client'

import { useRouterContext } from "@/utils/RouterContext";

export default function Home() {

  const router = useRouterContext();

  const handlePath = (path) => {
    router.push(path)
  }
  return (
    <div className="bg-background sm:ml-16 sm:w-8/12 mx-10 xs:mx-5 mt-10">
      <div className="text-primary xs:text-2xl text-4xl md:text-5xl lg:text-6xl mx-auto text-center sm:text-left mb-2">
        <h1>
          The <br /> Shelves
        </h1>
      </div>
      <div className="text-white xs:text-sm text-center sm:text-left text-xl md:text-2xl lg:text-3xl">
        <h2>
          The one-stop-shop for all your reading needs. The Shelves is a service that works with public libararies in order to make
          access to library books more convenient and accesible to all. We provide users with the option to have books checked out and
          delivered to your home, entirely through our website.
        </h2>
      </div>
      <div className="flex justify-cart w-[50%] sm:flex mt-5">
        <button onClick={() => { handlePath('/browse/books') }} className=" text-white bg-secondary mr-[5%] p-3 px-6 lg:py-3 rounded-md sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4 text-center text-sm w-32 sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl transition-transform duration-300 hover:scale-[1.01]">
          Books
        </button>
      </div>
    </div>
  );
}
