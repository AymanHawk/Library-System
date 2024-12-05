"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import UserNavbar from "../../../../components/UserNavbar";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

export default function Recommendations() {
  const [themeValue, setThemeValue] = useState([0]);
  const [paceValue, setPaceValue] = useState([0]);
  const [lengthValue, setLengthValue] = useState([0]);

  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [recommendations, setRecommendations] = useState([]);
  const [userInput, setUserInput] = useState("");

  async function getRecommendations() {
    const weights = [themeValue[0], paceValue[0], lengthValue[0]];

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput, weights }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Recommendations:", data.recommendations);
        setRecommendations(data.recommendations);
      } else {
        console.error("Error fetching recommendations:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className="mx-20">
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Get Your Book Recommendations
            </h1>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe what kind of books you like..."
              className="w-full p-2 mt-2 mb-4 rounded-md border-2 text-black"
            />
            <button
              onClick={getRecommendations}
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Get Recommendations
            </button>
          </div>
        </div>
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl mb-4">
            Adjust Preferences
          </h1>
          <div className="">
            <div> Theme </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={themeValue}
              onValueChange={(value) => setThemeValue(value)}
            />{" "}
            {themeValue}
            <br />
            <div> Pace </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={paceValue}
              onValueChange={(value) => setPaceValue(value)}
            />{" "}
            {paceValue}
            <br />
            <div> Length </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={lengthValue}
              onValueChange={(value) => setLengthValue(value)}
            />{" "}
            {lengthValue}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-4">
            <h2 className="text-white text-lg">Recommended Books:</h2>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index} className="text-white">
                  {rec.title} (ID: {rec._id})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Survey({
  themeValue,
  setThemeValue,
  paceValue,
  setPaceValue,
  lengthValue,
  setLengthValue,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>
        Use Shelves™ Recommendation Guru <i>Hermes</i> to curate book
        recommendations just for you
      </p>
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Modal
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Hermes Survey"
        >
          <p className="text-xl">
            Complete the following to receive recommendations!
          </p>
          <div className="">
            <div> Theme </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={themeValue}
              onValueChange={(value) => setThemeValue(value)}
            />
            <br />
            <div> Pace </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={paceValue}
              onValueChange={(value) => setPaceValue(value)}
            />
            <br />
            <div> Length </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={lengthValue}
              onValueChange={(value) => setLengthValue(value)}
            />
          </div>

          <br />

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md border px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-lg rounded-lg bg-[#1F1C1C] shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
