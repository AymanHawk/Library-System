"use client";

export default function Home() {
  return (
    <div className="bg-background sm:ml-16 sm:w-8/12 mx-10 xs:mx-5">
      <div className="text-primary xs:text-2xl text-4xl md:text-5xl lg:text-6xl mx-auto text-center sm:text-left">
        <h1>
          The Library <br /> Delivery <br className="hidden md:block" /> System
        </h1>
      </div>
      <div className="text-white xs:text-sm text-center sm:text-left text-xl md:text-2xl lg:text-3xl">
        <h2>
          Insert explanation of our service here, Lorem ipsum odor amet,
          consectetuer adipiscing elit. Euismod felis egestas nulla tellus mus;
          luctus fermentum. Augue nibh vehicula lacinia amet, varius est porta.
          Nunc fames montes purus penatibus gravida vehicula cubilia. Aposuere
          suspendisse gravida curae taciti maecenas. Penatibus taciti morbi
          accumsan velit senectus sodales tempor.
        </h2>
      </div>
      <div className="flex justify-center sm:block mt-5">
        <button className="text-white bg-secondary p-2 px-6 lg:py-3 rounded-md sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 text-center text-sm w-32 sm:text-xl md:text-2xl lg:text-3xl">Browse</button>
      </div>
    </div>
  );
}
