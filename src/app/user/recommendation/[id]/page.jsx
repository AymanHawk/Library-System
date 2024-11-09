"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import UserNavbar from "../../../../components/UserNavbar";
import { X } from "lucide-react";

export default function Recommendations() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [recommendations, setRecommendations] = useState([]);

  async function getRecommendations() {
    const userInput = "I enjoy lighthearted books that are medium-paced and fall into manga and romance.";
    const weights = [1.5, 1.0, 0.5]; // @katie-andor @fangedShadow what weights should we use?

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput, weights })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Recommendations:', data.recommendations);
        setRecommendations(data.recommendations);
      } else {
        console.error('Error fetching recommendations:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className="mx-20">
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              <Survey />
            </h1>
          </div>
        </div>
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Based on recent Reads
            </h1>
            <div className="w-[10%] h-48 bg-white">Books</div>
          </div>
        </div>
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Genre Picks
            </h1>
            <div className="w-[10%] h-48 bg-white">Books</div>
          </div>
        </div>
        <button
          onClick={getRecommendations}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Get Recommendations
        </button>
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

function Survey() {
  const [isOpen, setIsOpen] = React.useState(false);

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
          <p>
            Help Hermes make specially handpicked recommendations by completing
            the survey!
          </p>
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
