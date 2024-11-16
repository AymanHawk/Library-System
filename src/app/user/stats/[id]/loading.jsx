"use client";
import React from "react";
import Image from "next/image";
import drop from "../../../../images/drop-white.png";

function Loading() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="mx-auto flex flex-row gap-4 flex-wrap justify-center items-center">
          <div className="flex gap-4">
            <div className="flex relative bg-loading rounded-md w-[145px] h-[40px] p-2 justify-center items-center animate-pulse ">
              <div className="h-4 bg-loading rounded w-2/3"></div>
              <Image
                src={drop}
                alt="dropdown"
                height={10}
                width={10}
                className="ml-2"
              />
            </div>

            <div className="flex relative bg-loading rounded-md w-[145px] h-[40px] p-2 justify-center items-center animate-pulse">
              <div className="h-4 bg-loading rounded w-2/3"></div>
              <Image
                src={drop}
                alt="dropdown"
                height={10}
                width={10}
                className="ml-2"
              />
            </div>

            <div className="flex relative bg-loading rounded-md w-[145px] h-[40px] p-2 justify-center items-center animate-pulse">
              <div className="h-4 bg-loading rounded w-2/3"></div>
              <Image
                src={drop}
                alt="dropdown"
                height={10}
                width={10}
                className="ml-2"
              />
            </div>
          </div>
        </div>

        <hr className="my-5 w-[80%] mx-auto border-loading" />

        <div className="flex flex-wrap justify-center items-center text-center ">

          <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden mb-4 flex items-center justify-center animate-pulse bg-loading mx-auto px-8">
            <div
              className="absolute w-[150%] h-[150%] rounded-full bg-gray-600"
              style={{
                clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)",
                transform: "rotate(0deg)",
              }}
            ></div>
            <div
              className="absolute w-[150%] h-[150%] rounded-full bg-loading"
              style={{
                clipPath: "polygon(50% 50%, 100% 0%, 0% 0%)",
                transform: "rotate(45deg)",
              }}
            ></div>
            <div
              className="absolute w-[150%] h-[150%] rounded-full bg-gray-600"
              style={{
                clipPath: "polygon(50% 50%, 0% 0%, 0% 100%)",
                transform: "rotate(90deg)",
              }}
            ></div>
            <div
              className="absolute w-[150%] h-[150%] rounded-full bg-loading"
              style={{
                clipPath: "polygon(50% 50%, 0% 100%, 100% 100%)",
                transform: "rotate(135deg)",
              }}
            ></div>
          </div>

          <div className="md:w-[600px] mx-auto md:h-[400px] sm:w-[480px] h-[350px] w-[340px] xs:w-[250px]  rounded-md relative flex justify-center items-center mb-4 animate-pulse">
            <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-3 bg-loading">
              <div
                className="absolute w-[80px] h-[80px] bg-gray- rounded-full animate-pulse"
                style={{ top: "20%", left: "10%" }}
              ></div>
              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "40%", left: "10%" }}
              ></div>

              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "60%", left: "10%" }}
              ></div>

              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "20%", right: "10%" }}
              ></div>
              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "40%", right: "10%" }}
              ></div>
              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "60%", right: "10%" }}
              ></div>
              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "20%", left: "35%" }}
              ></div>

              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "40%", left: "35%" }}
              ></div>

              <div
                className="absolute w-[80px] h-[80px] bg-gray-600 rounded-full animate-pulse"
                style={{ top: "60%", left: "35%" }}
              ></div>
            </div>
          </div>

          <div className="w-[300px] h-[300px] bg-loading rounded-full relative flex items-center justify-center mb-4 animate-pulse mx-auto  px-8">
            <div className="w-[150px] h-[150px] bg-gray-600 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
          <div className="md:w-[600px] md:h-[300px] sm:w-[480px] w-[340px] h-[250px] bg-loading rounded-md relative flex flex-col justify-between p-4 animate-pulse">
            <div className="flex-grow relative">
              <div className="absolute inset-0 flex flex-col justify-around">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-gray-600"></div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-end p-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-600 h-[2px] w-8 transform origin-left"
                    style={{
                      transform: `rotate(-20deg) translate(${i * 30}px, -${
                        i * 10
                      }px)`,
                    }}
                  ></div>
                ))}
              </div>
              ;
            </div>
          </div>

          <div className="md:w-[600px] md:h-[300px] sm:w-[480px] w-[340px] h-[250px] bg-loading rounded-md relative flex flex-col justify-between p-4 animate-pulse">
            <div className="flex-grow relative">
              <div className="absolute inset-0 flex flex-col justify-around">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-gray-600"></div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-end p-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-600 h-[2px] w-8 transform origin-left"
                    style={{
                      transform: `rotate(-20deg) translate(${i * 30}px, -${
                        i * 10
                      }px)`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
