"use client";

import React from "react";
import * as Slider from "@radix-ui/react-slider";

const ThreeWaySlider = ({
  sliderValues,
  setSliderValues,
}: {
  sliderValues: number[];
  setSliderValues: (values: number[]) => void;
}) => {
  const handleSliderChange = (newValues: number[]) => {
    setSliderValues(newValues); // Update parent state
  };

  const percentages = {
    tempo: sliderValues[0],
    genre: sliderValues[1] - sliderValues[0],
    theme: 100 - sliderValues[1],
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Attribute Slider </h2>
      <div className="relative">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={sliderValues}
          onValueChange={handleSliderChange}
          min={0}
          max={100}
          step={1}
          aria-label="Three-way slider"
        >
          <Slider.Track className="bg-slate-200 relative grow rounded-full h-2 overflow-hidden">
            <div
              className="absolute h-full bg-secondary hover:bg-[#4f5aa3]"
              style={{ width: `${percentages.tempo}%` }}
            />
            <div
              className="absolute h-full bg-[#4CC860] hover:bg-green-600"
              style={{ width: `${percentages.genre}%`, left: `${percentages.tempo}%` }}
            />
            <div
              className="absolute h-full bg-[#5F2D77] hover:bg-fuchsia-900"
              style={{ width: `${percentages.theme}%`, left: `${100 - percentages.theme}%` }}
            />
          </Slider.Track>
          {sliderValues.map((value, index) => (
            <Slider.Thumb
              key={index}
              className="block w-5 h-5 bg-white shadow-md rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-100"
            />
          ))}
        </Slider.Root>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium flex items-center">
          <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
          Tempo: {percentages.tempo}%
        </p>
        <p className="text-sm font-medium flex items-center">
          <span className="w-3 h-3 bg-[#4CC860] rounded-full mr-2"></span>
          Genre: {percentages.genre}%
        </p>
        <p className="text-sm font-medium flex items-center">
          <span className="w-3 h-3 bg-[#5F2D77] rounded-full mr-2"></span>
          Theme: {percentages.theme}%
        </p>
      </div>
    </div>
  );
};

export default ThreeWaySlider;
