'use client'
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserNavbar from '../../../../../components/UserNavbar'
import ThreeWaySlider from "@/components/custom/ThreeWaySlider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Survey() {
  const [sliderValues, setSliderValues] = useState([33, 66]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [constructedInput, setConstructedInput] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const genre = [
    "dystopian",
    "comics",
    "literary",
    "nature",
    "science",
    "economics",
    "manga",
    "essays",
    "religion",
    "short stories",
    "design",
    "contemporary",
    "self help",
    "childrens",
    "sports",
    "technology",
    "computer science",
    "romance",
    "education",
    "sociology",
    "horror",
    "philosophy",
    "history",
    "graphic novel",
    "science fiction",
    "thriller",
    "mathematics",
    "fiction",
    "classics",
    "speculative fiction",
    "art",
    "magical realism",
    "cookbook",
    "food and drink",
    "race",
    "autobiography",
    "video games",
    "nonfiction",
    "fantasy",
    "true crime",
    "lgbtqia+",
    "feminism",
    "poetry",
    "gender",
    "psychology",
    "erotica",
    "middle grade",
    "memoir",
    "biography",
    "mystery",
    "young adult",
    "politics",
    "crime",
    "music",
    "health",
    "business",
    "historical",
    "travel",
  ];

  const theme = [
    "adventurous",
    "challenging",
    "dark",
    "emotional",
    "funny",
    "hopeful",
    "informative",
    "inspiring",
    "lighthearted",
    "mysterious",
    "reflective",
    "relaxing",
    "sad",
    "tense",
  ];

  useEffect(() => {
    const newInput = [
      ...selectedBooks.map(
        (book) =>
          `${book.title} (${book.genre.join(", ")}, rating: ${book.rating})`
      ),
      selectedGenres.join(", "),
      selectedThemes.join(", "),
    ].join("; ");
    setConstructedInput(newInput);
  }, [selectedBooks, selectedGenres, selectedThemes]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}&limit=6`
        );
        const data = await res.json();
        setSearchResults(data.books || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const timeoutId = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const calculateNormalizedWeights = () => {
    const percentages = [
      sliderValues[0],
      sliderValues[1] - sliderValues[0],
      100 - sliderValues[1],
    ];

    const total = percentages.reduce((sum, val) => sum + val, 0);
    return percentages.map((value) => (value / total) * 3);
  };

  const handleBookSelection = (book) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.some((b) => b._id === book._id)
        ? prevSelected.filter((b) => b._id !== book._id)
        : [...prevSelected, book]
    );
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleThemeSelection = (theme) => {
    setSelectedThemes((prev) =>
      prev.includes(theme)
        ? prev.filter((t) => t !== theme)
        : [...prev, theme]
    );
  };

  async function getRecommendations() {
    if (selectedBooks.length === 0) {
      alert("Please select at least one book!");
      return;
    }

    const weights = calculateNormalizedWeights();
    setLoading(true);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: constructedInput, 
          weights,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const bookDetailsResponse = await fetch("/api/book-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookIds: data.recommendations.map((rec) => rec._id),
          }),
        });

        if (bookDetailsResponse.ok) {
          const bookDetailsData = await bookDetailsResponse.json();
          setRecommendations(bookDetailsData.books); 
          
          const userId = id; 
          const bookIds = data.recommendations.map((rec) => rec._id);

          const res = await fetch("/api/add-recommendations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, recommendations: bookIds }),
          });

          const dataRec = await res.json();
          if (dataRec.success) {
            toast.success('Recommendation successfully added!');
          } else {
            toast.info('Failed to get Recommendation');

          }
        } else {
          console.error(
            "Error fetching book details:",
            bookDetailsResponse.statusText
          );
          toast.info('Failed to get Recommendation');
        }
      } else {
        console.error("Error fetching recommendations:", response.statusText);
        toast.info('Failed to get Recommendation');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.info('Failed to get Recommendation');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className="mx-20">
        {/* Search and Select Books */}
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl mb-4">
            Search and Select Books
          </h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="w-full p-2 mt-2 mb-4 rounded-md border-2 text-black"
          />
          {searchResults.length > 0 && (
            <div className="bg-loading p-3 rounded-md">
              {searchResults.map((book) => (
                <div
                  key={book._id}
                  className="flex items-center justify-between border-b border-loading py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={book.imgUrl}
                      alt={book.title}
                      className="w-12 h-12 rounded-md mr-4"
                    />
                    <div>
                      <h3 className="text-primary font-bold">{book.title}</h3>
                      <p className="text-white">{book.author}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookSelection(book)}
                    className={`px-4 py-2 rounded-md ${selectedBooks.some((b) => b._id === book._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-secondary transition-transform duration-300 hover:scale-[1.01] hover:bg-[#4f5aa3]"
                      } text-white`}
                  >
                    {selectedBooks.some((b) => b._id === book._id)
                      ? "Deselect"
                      : "Select"}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-white text-lg">Selected Books:</h2>
            {selectedBooks.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedBooks.map((book) => (
                  <li key={book._id} className="text-white">
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No books selected.</p>
            )}
          </div>
        </div>

        {/* Genres */}
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl mb-4">
            Genres
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {genre.map((g) => (
              <button
                key={g}
                onClick={() => handleGenreSelection(g)}
                className={`px-4 py-2 rounded-md ${selectedGenres.includes(g)
                  ? "bg-[#4CC860] hover:bg-green-600"
                  : "bg-secondary transition-transform duration-300 hover:scale-[1.01] hover:bg-[#4f5aa3]"
                  } text-white text-sm font-medium`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl mb-4">
            Themes
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {theme.map((t) => (
              <button
                key={t}
                onClick={() => handleThemeSelection(t)}
                className={`px-4 py-2 rounded-md ${selectedThemes.includes(t)
                  ? "bg-[#5F2D77] hover:bg-fuchsia-900"
                  : "bg-secondary transition-transform duration-300 hover:scale-[1.01] hover:bg-[#4f5aa3]"
                  } text-white text-sm font-medium`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Adjust Preferences */}
        <div className="border-secondary rounded-md border-2 p-3 mb-10">
          <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl mb-4">
            Adjust Preferences
          </h1>
          <ThreeWaySlider
            sliderValues={sliderValues}
            setSliderValues={setSliderValues}
          />
        </div>

        {/* Get Recommendations Button */}
        <button
          onClick={getRecommendations}
          className="mt-4 rounded-md px-4 py-2 text-white bg-secondary transition-transform duration-300 hover:scale-[1.01] hover:bg-[#4f5aa3]"
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-4">
            <h2 className="text-white text-lg">Recommended Books:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {recommendations.map((book) => (
                <div key={book._id} className="bg-loading p-4 rounded-lg">
                  <a href={`/books/${book._id}`} className="hover:underline">
                    <img
                      src={book.imgUrl}
                      alt={book.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-white font-bold text-lg">
                      {book.title}
                    </h3>
                  </a>
                  <p className="text-gray-400 text-sm">{book.author}</p>
                  <p className="text-gray-400 text-sm">
                    Genre: {book.genre.join(", ")}
                  </p>
                  <p className="text-gray-400 text-sm">Rating: {book.rating}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default Survey