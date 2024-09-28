"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Dashboard } from "../components/aceturnity-ui/Sidebar";

import { ImagesSlider } from "../components/aceturnity-ui/ImageSlider";
import { InfiniteMovingCards } from "../components/aceturnity-ui/messageSlider";

export default function Home() {
  return (
    <div className="bg-background">
      <div className="text-primary text-4xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl ml-[5%] mt-[5%] mr-[20%] leading-tight">
        <h1>
          The Library <br /> Delivery <br /> System
        </h1>
      </div>
      <div className="text-white text-1xl sm:text-1xl md:text-2xl lg:text-2xl xl:text-2xl ml-[5%] mt-[2%] mr-[15%] sm:mr-[15%] md:mr-[15%] lg:mr-[33%]">
        <h2>
          Insert explanation of our service here, Lorem ipsum odor amet,
          consectetuer adipiscing elit. Euismod felis egestas nulla tellus mus;
          luctus fermentum. Augue nibh vehicula lacinia amet, varius est porta.
          Nunc fames montes purus penatibus gravida vehicula cubilia. Aposuere
          suspendisse gravida curae taciti maecenas. Penatibus taciti morbi
          accumsan velit senectus sodales tempor.
        </h2>
      </div>
      <div>
        <button className="text-white text-1xl sm:text-1xl md:text-2xl lg:text-2xl xl:text-2xl ml-[5%] mt-[2%] bg-[#5D68B0] p-2 pr-6 pl-6 rounded-md"> Browse </button>
      </div>
    </div>
  );
}
