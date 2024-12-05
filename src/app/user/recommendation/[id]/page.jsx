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
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [userInput, setUserInput] = useState("");

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  async function getRecommendations() {
    if (!userInput.trim()) {
      alert("Please enter a description of the books you like!");
      return;
    }

    const weights = [themeValue[0], paceValue[0], lengthValue[0]];
    setLoading(true);

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
    } finally {
      setLoading(false);
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
              {loading ? "Loading..." : "Get Recommendations"}
            </button>
          </div>
        </div>
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl mb-4">
            Adjust Preferences
          </h1>
          <div>
            <div> Theme </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={themeValue}
              onValueChange={(value) => setThemeValue(value)}
            />
            <span className="text-white">{themeValue[0]}</span>
            <br />
            <div> Pace </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={paceValue}
              onValueChange={(value) => setPaceValue(value)}
            />
            <span className="text-white">{paceValue[0]}</span>
            <br />
            <div> Length </div>
            <Slider
              min={-3}
              max={3}
              step={0.1}
              value={lengthValue}
              onValueChange={(value) => setLengthValue(value)}
            />
            <span className="text-white">{lengthValue[0]}</span>
          </div>
        </div>

        {recommendations.length > 0 ? (
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
        ) : (
          !loading && (
            <div className="mt-4">
              <h2 className="text-white text-lg">
                No recommendations yet. Adjust your preferences and try again!
              </h2>
            </div>
          )
        )}
      </div>
    </div>
  );
}
