"use client";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "./results/Pagination.jsx";
import drop from "../../../../images/drop-yellow.png";
import Image from "next/image.js";
import { useRouterContext } from "../../../../utils/RouterContext.jsx";
import { useUser } from "@clerk/nextjs";
import dropdown from "../../../../images/dd.png";
import like from "../../../../images/like.png";
import dislike from "../../../../images/dislike.png";
import activeLike from "../../../../images/like_active.png";
import activeDislike from "../../../../images/dislike_active.png";
import Loading from './loading.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState("asc");
  const limit = 10;
  const [sort, setSort] = useState("alpha");
  const [genreDrop, setGenreDrop] = useState(false);
  const [themeDrop, setThemeDrop] = useState(false);
  const [paceDrop, setPaceDrop] = useState(false);
  const [langDrop, setLangDrop] = useState(false);
  const [formatDrop, setFormatDrop] = useState(false);
  const [genreSmallDrop, setGenreSmallDrop] = useState(false);
  const [themeSmallDrop, setThemeSmallDrop] = useState(false);
  const [paceSmallDrop, setPaceSmallDrop] = useState(false);
  const [langSmallDrop, setLangSmallDrop] = useState(false);
  const [formatSmallDrop, setFormatSmallDrop] = useState(false);
  const [filters, setFilters] = useState({
    genre: [],
    theme: [],
    pace: [],
    format: [],
    language: [],
    rating: [0, 5],
    publishDate: [new Date("1900-01-01"), new Date()],
  });
  const router = useRouterContext();
  const [dropState, setDropState] = useState({});
  const [dropTextState, setDropTextState] = useState({});
  const { user } = useUser();
  const [userBookLists, setUserBookLists] = useState({
    readBooks: [],
    toReadBooks: [],
  });
  const dropRefs = useRef({});
  const [likePref, setLikePref] = useState({});
  const [userLikePref, setUserLikePref] = useState({
    likedBooks: [],
    dislikedBooks: [],
  });

  const [hoveringUp, setHoveringUp] = useState(false);
  const [hoveringDown, setHoveringDown] = useState(false);

  const genreRef = useRef(null);
  const themeRef = useRef(null);
  const paceRef = useRef(null);
  const formatRef = useRef(null);
  const langRef = useRef(null);
  const genreSmallRef = useRef(null);
  const themeSmallRef = useRef(null);
  const paceSmallRef = useRef(null);
  const formatSmallRef = useRef(null);
  const langSmallRef = useRef(null);

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
  const pace = ["fast", "medium", "slow"];
  const format = ["Paperback", "Audio", "Hardcover", "Digital"];
  const language = [
    "Slovak",
    "Norwegian",
    "Hindi",
    "Български",
    "Polski",
    "Vietnamese",
    "Mandarin",
    "Swedish",
    "Italiano",
    "Latvian",
    "Latin",
    "Mandarine",
    "Slovenian",
    "Malay",
    "Scottish gaelic",
    "Dutch",
    "Afrikaans",
    "Danish",
    "Chineset",
    "Romanian",
    "German",
    "Bulgarian",
    "Tamil",
    "Hungarian",
    "Ukrainian",
    "Japanese",
    "Catalan",
    "Tagalog",
    "Português",
    "Estonian",
    "Russian",
    "Serbian",
    "Finnish",
    "Ukranian",
    "Basque",
    "Lithuanian",
    "Spanish",
    "Albanian",
    "Indonesian",
    "Croatian",
    "Czech",
    "Maltese",
    "Scots",
    "Svenska",
    "Engliah",
    "Greek",
    "Norwegian bokmål",
    "Galician",
    "Polish",
    "Arabic",
    "French",
    "Bengali",
    "Filipino",
    "Icelandic",
    "English",
    "Korean",
    "Italian",
    "English translated",
    "Welsh",
    "Malayalam",
    "Nepali",
    "Français",
    "Deutsch",
    "Turkish",
    "Belarusian",
    "Chinese",
    "Hebrew",
    "Portuguese",
    "Swahili",
  ];

  const toggleLike = async (bookId) => {

    try {
      const updatedPref = likePref[bookId] === 'like' ? null : 'like';


      const res = await fetch('/api/bookList/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          bookId,
          prefList: 'likedBooks'
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLikePref((prev) => ({
          ...prev,
          [bookId]: updatedPref,
        }))
        toast.success('Book liked successfully!', {
          className: 'bg-green-500 text-white',
        });
      } else {
        toast.error('Failed to update like status');
      }
    } catch (err) {
      console.error('Error liking the book:', err);
      toast.error('Login to Like a book');
    }

  };

  const toggleDislike = async (bookId) => {
    try {
      const updatedPref = likePref[bookId] === 'dislike' ? null : 'dislike';


      const res = await fetch('/api/bookList/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          bookId,
          prefList: 'dislikedBooks'
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLikePref((prev) => ({
          ...prev,
          [bookId]: updatedPref,
        }))
        toast.success('Book disliked successfully!');
      } else {
        toast.error('Failed to update dislike status');
      }
    } catch (err) {
      console.error('Error disliking the book:', err);
      toast.error('Login to Dislike a book');

    }
  };

  const toggleDrop = (bookId) => {
    setDropState((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleTextChange = async (bookId, list) => {
    try {
      const userId = user.id;
      let newList;
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      if (list === 'Finished') { newList = 'readBooks' }
      else if (list === 'To-Read') { newList = 'toReadBooks' }
      else if (list === 'Add to List' || null) { newList = 'remove' }


      const res = await fetch('/api/bookList/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId, newList }),
      });

      const data = await res.json();
      if (data.success) {
        setDropTextState((prev) => ({
          ...prev,
          [bookId]: list,
        }));
        setUserBookLists(data.bookList);
        toggleDrop(bookId);
        toast.success('Book list updated successfully!');
      } else {
        toast.error('Failed to update book list');
      }
    } catch (err) {
      console.log(err);
      toast.error('Login to Add to the List');

    }
  };

  const handleClickOutside = (event) => {
    const isOutside = Object.keys(dropRefs.current).every(
      (key) => !dropRefs.current[key]?.contains(event.target)
    );
    if (isOutside) {
      setDropState({});
    }

    if (genreRef.current && !genreRef.current.contains(event.target)) {
      setGenreDrop(false);
    }
    if (themeRef.current && !themeRef.current.contains(event.target)) {
      setThemeDrop(false);
    }
    if (paceRef.current && !paceRef.current.contains(event.target)) {
      setPaceDrop(false);
    }
    if (formatRef.current && !formatRef.current.contains(event.target)) {
      setFormatDrop(false);
    }
    if (langRef.current && !langRef.current.contains(event.target)) {
      setLangDrop(false);
    }
    if (genreSmallRef.current && !genreSmallRef.current.contains(event.target)) {
      setGenreSmallDrop(false);
    }
    if (themeSmallRef.current && !themeSmallRef.current.contains(event.target)) {
      setThemeSmallDrop(false);
    }
    if (paceSmallRef.current && !paceSmallRef.current.contains(event.target)) {
      setPaceSmallDrop(false);
    }
    if (formatSmallRef.current && !formatSmallRef.current.contains(event.target)) {
      setFormatSmallDrop(false);
    }
    if (langSmallRef.current && !langSmallRef.current.contains(event.target)) {
      setLangSmallDrop(false);
    }
  };

  const handleBookClick = (path) => {
    router.push(path);
  };

  const handleGenreDrop = () => {
    setGenreDrop(!genreDrop);
  };

  const handleThemeDrop = () => {
    setThemeDrop(!themeDrop);
  };

  const handlePaceDrop = () => {
    setPaceDrop(!paceDrop);
  };

  const handleLangDrop = () => {
    setLangDrop(!langDrop);
  };

  const handleFormatDrop = () => {
    setFormatDrop(!formatDrop);
  };

  const handleGenreSmallDrop = () => {
    setGenreSmallDrop(!genreSmallDrop);
  };

  const handleThemeSmallDrop = () => {
    setThemeSmallDrop(!themeSmallDrop);
  };

  const handlePaceSmallDrop = () => {
    setPaceSmallDrop(!paceSmallDrop);
  };

  const handleLangSmallDrop = () => {
    setLangSmallDrop(!langSmallDrop);
  };

  const handleFormatSmallDrop = () => {
    setFormatSmallDrop(!formatSmallDrop);
  };

  const fetchBooks = async () => {
    const headers = {
      page: currentPage,
      limit,
      sortBy: sort,
      order: order,
      genre: filters.genre.join(","),
      theme: filters.theme.join(","),
      pace: filters.pace.join(","),
      format: filters.format.join(","),
      language: filters.language.join(","),
      minRating: filters.rating[0],
      maxRating: filters.rating[1],
      startDate: filters.publishDate[0].toISOString(),
      endDate: filters.publishDate[1].toISOString(),
    };

    const res = await fetch("/api/bookFilter", {
      method: "GET",
      headers,
    });

    const data = await res.json();
    setResults(data.books);
    setTotalCount(data.totalCount);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const toggleUp = () => {
    setOrder("asc");
  };

  const toggleDown = () => {
    setOrder("desc");
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => {
      if (type === "checkbox") {
        const values = prevFilters[name].includes(value)
          ? prevFilters[name].filter((v) => v !== value)
          : [...prevFilters[name], value];
        return { ...prevFilters, [name]: values };
      }
      return { ...prevFilters, [name]: value };
    });
  };

  const handleRatingChange = (min, max) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: [min, max],
    }));
  };

  const handlePublishDateChange = (start, end) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      publishDate: [new Date(start), new Date(end)],
    }));
  };

  const handleSubmit = () => {
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentPage, sort, order]);

  useEffect(() => {
    const fetchUserBookLists = async () => {
      try {
        const userId = user.id;
        if (!userId || !user) {
          console.error("User ID is undefined");
          return;
        }
        const res = await fetch(`/api/bookList/read?userId=${userId}`);
        const data = await res.json();
        const { readBooks, toReadBooks, likedBooks, dislikedBooks } = data;
        setUserBookLists({ readBooks, toReadBooks });
        setUserLikePref({ likedBooks, dislikedBooks });
        const updatedDropTextState = {};
        const updatedUserPref = {};
        [...readBooks, ...toReadBooks].forEach((bookId) => {
          if (readBooks.includes(bookId)) {
            updatedDropTextState[bookId] = "Finished";
          } else if (toReadBooks.includes(bookId)) {
            updatedDropTextState[bookId] = "To-Read";
          }
        });

        [...likedBooks, ...dislikedBooks].forEach((bookId) => {
          if (likedBooks.includes(bookId)) {
            updatedUserPref[bookId] = "like";
          } else if (dislikedBooks.includes(bookId)) {
            updatedUserPref[bookId] = "dislike";
          }
        });
        setDropTextState(updatedDropTextState);
        setLikePref(updatedUserPref);
      } catch (err) {
        console.error(err);
      }
    };
    if (user && user.id) {
      fetchUserBookLists();
    }
  }, [user]);

  return (
    <div className="2xl:w-[1400px] text-primary xl:w-[1200px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] mx-auto">
      <h2 className="text-center text-4xl">Explore Books</h2>
      {/* Top Filter for when screen gets too small */}
      <div className="2xl:w-[250px] text-primary xl:w-[200px] lg:w-[200px] norm:w-[700px] md:w-[600px] block sm:block md:block lg:hidden ">
        <h2 className="text-center text-2xl">Filters</h2>
        <div className="mb-5">
          <div className="flex flex-nowrap">
            <div className="w-[350px]">
              <div className="relative" ref={genreSmallRef}>
                <div
                  className="flex gap-2 items-center cursor-pointer justify-end"
                  onClick={handleGenreSmallDrop}

                >
                  <h3 className="text-xl">Genres</h3>
                  <Image src={drop} width={15} height={10} alt="drop" />
                  <div
                    className={
                      (genreSmallDrop ? `` : `hidden`) +
                      ` flex flex-col mt-[260px] gap-1 border-secondary absolute z-50 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px]`
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                      {filters.genre.map((g) => (
                        <h2
                          key={g}
                          className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                        >
                          {g}
                        </h2>
                      ))}
                    </div>
                    <div className="flex flex-wrap p-2 h-[150px] overflow-y-auto no-scrollbar">
                      {genre.map((genre) => (
                        <div key={genre}>
                          <label
                            className={
                              (filters.genre.includes(genre)
                                ? `text-secondary hover:text-white`
                                : "hover:text-secondary cursor-pointer text-white") +
                              ` mx-1 capitalize`
                            }
                            htmlFor={genre}
                          >
                            {genre}
                          </label>
                          <input
                            type="checkbox"
                            name="genre"
                            value={genre}
                            onChange={handleFilterChange}
                            className="hidden"
                            id={genre}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="flex gap-2 items-center cursor-pointer justify-end"
                  onClick={handleThemeSmallDrop}
                  ref={themeSmallRef}
                >
                  <h3 className="text-xl relative">Themes</h3>
                  <Image src={drop} width={15} height={10} alt="drop" />
                  <div
                    className={
                      (themeSmallDrop ? `` : `hidden`) +
                      ` flex flex-col mt-[260px] gap-1 border-secondary absolute z-40 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px]`
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                      {filters.theme.map((t) => (
                        <h2
                          key={t}
                          className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                        >
                          {t}
                        </h2>
                      ))}
                    </div>
                    <div className="flex flex-wrap p-2 h-[150px] overflow-y-auto no-scrollbar">
                      {theme.map((theme) => (
                        <div key={theme}>
                          <label
                            className={
                              (filters.theme.includes(theme)
                                ? `text-secondary hover:text-white`
                                : "hover:text-secondary cursor-pointer text-white") +
                              ` mx-1 capitalize`
                            }
                            htmlFor={theme}
                          >
                            {theme}
                          </label>
                          <input
                            type="checkbox"
                            name="theme"
                            value={theme}
                            onChange={handleFilterChange}
                            className="hidden"
                            id={theme}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="flex gap-2 items-center cursor-pointer justify-end"
                  onClick={handlePaceSmallDrop}
                  ref={paceSmallRef}
                >
                  <h3 className="text-xl relative">Paces</h3>
                  <Image src={drop} width={15} height={10} alt="drop" />
                  <div
                    className={
                      (paceSmallDrop ? `` : `hidden`) +
                      ` flex flex-col gap-1 mt-[170px] border-secondary absolute z-30 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px]`
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                      {filters.pace.map((p) => (
                        <h2
                          key={p}
                          className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                        >
                          {p}
                        </h2>
                      ))}
                    </div>
                    <div className="flex flex-wrap p-2 overflow-y-auto no-scrollbar">
                      {pace.map((pace) => (
                        <div key={pace}>
                          <label
                            className={
                              (filters.pace.includes(pace)
                                ? `text-secondary hover:text-white`
                                : "hover:text-secondary cursor-pointer text-white") +
                              ` mx-1 capitalize`
                            }
                            htmlFor={pace}
                          >
                            {pace}
                          </label>
                          <input
                            type="checkbox"
                            name="pace"
                            value={pace}
                            onChange={handleFilterChange}
                            className="hidden"
                            id={pace}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
              <div
                className="flex gap-2 items-center cursor-pointer justify-end"
                onClick={handleFormatSmallDrop}
                ref={formatSmallRef}
              >
                <h3 className="text-xl relative">Formats</h3>
                <Image src={drop} width={15} height={10} alt="drop" />
                <div
                  className={
                    (formatSmallDrop ? `` : `hidden`) +
                    ` flex flex-col gap-1 mt-[170px] border-secondary absolute z-20 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px]`
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                    {filters.format.map((f) => (
                      <h2
                        key={f}
                        className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                      >
                        {f}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-wrap p-2 overflow-y-auto no-scrollbar">
                    {format.map((format) => (
                      <div key={format}>
                        <label
                          className={
                            (filters.format.includes(format)
                              ? `text-secondary hover:text-white`
                              : "hover:text-secondary cursor-pointer text-white") +
                            ` mx-1 capitalize`
                          }
                          htmlFor={format}
                        >
                          {format}
                        </label>
                        <input
                          type="checkbox"
                          name="format"
                          value={format}
                          onChange={handleFilterChange}
                          className="hidden"
                          id={format}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="flex gap-2 items-center cursor-pointer justify-end"
                  onClick={handleLangSmallDrop}
                  ref={langSmallRef}
                >
                  <h3 className="text-xl relative">Languages</h3>
                  <Image src={drop} width={15} height={10} alt="drop" />
                  <div
                    className={
                      (langSmallDrop ? `` : `hidden`) +
                      ` flex flex-col gap-1 mt-[260px] border-secondary absolute z-10 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px]`
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                      {filters.language.map((l) => (
                        <h2
                          key={l}
                          className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                        >
                          {l}
                        </h2>
                      ))}
                    </div>
                    <div className="flex flex-wrap p-2 h-[150px] overflow-y-auto no-scrollbar">
                      {language.map((language) => (
                        <div key={language}>
                          <label
                            className={
                              (filters.language.includes(language)
                                ? `text-secondary hover:text-white`
                                : "hover:text-secondary cursor-pointer text-white") +
                              ` mx-1 capitalize`
                            }
                            htmlFor={language}
                          >
                            {language}
                          </label>
                          <input
                            type="checkbox"
                            name="language"
                            value={language}
                            onChange={handleFilterChange}
                            className="hidden"
                            id={language}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[350px] flex-wrap flex-row gap-6 ml-[20px] mb-4 justify-start">
              <div>
                <h3 className="text-xl mb-1">Rating</h3>
                <div className="flex flex-nowrap gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    onChange={(e) =>
                      handleRatingChange(e.target.value, filters.rating[1])
                    }
                    className="w-[75px] bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                    max={5}
                    min={0}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    onChange={(e) =>
                      handleRatingChange(filters.rating[0], e.target.value)
                    }
                    className="w-[75px] bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                    max={5}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-1">Publish Date</h3>
                <div className="flex flex-row gap-1 flex-wrap">
                  <input
                    type="date"
                    placeholder="Start date"
                    onChange={(e) =>
                      handlePublishDateChange(
                        e.target.value,
                        filters.publishDate[1]
                      )
                    }
                    className="bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                  />
                  <input
                    type="date"
                    placeholder="End date"
                    onChange={(e) =>
                      handlePublishDateChange(
                        filters.publishDate[0],
                        e.target.value
                      )
                    }
                    className="bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                  />
                </div>
              </div>
            </div>


          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-secondary mx-auto block w-[250px] rounded-md my-2 text-2xl text-white"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-nowrap gap-6 ">
          <div>
            <label htmlFor="sortOptions" className="text-xl">
              Sort By:{" "}
            </label>
            <select
              onChange={handleSortChange}
              value={sort}
              name="sort"
              id="sortOptions"
              className="w-full h-[40px] text-lg bg-background border-secondary border-[1px] rounded-md p-1 outline-none text-secondary"
            >
              <option value="alpha">Alphabetic</option>
              <option value="userRead">Popular</option>
              <option value="userLiked">Liked</option>
              <option value="userRented">Rented</option>
              <option value="rating">Rated</option>
              <option value="publishDate">Publish Date</option>
            </select>
          </div>
          <div className="flex gap-2 mt-3 items-center">
            <label htmlFor="orderOptions" className="text-xl">
              Order by:{" "}
            </label>
            <div id="orderOptions" className="flex gap-4 cursor-pointer">
              <div
                onClick={toggleUp}
                onMouseEnter={() => setHoveringUp(true)}
                onMouseLeave={() => setHoveringUp(false)}
              >
                <svg
                  fill={
                    order === "asc"
                      ? hoveringUp
                        ? "#ffffff"
                        : "#5D68B0"
                      : hoveringUp
                        ? "#5D68B0"
                        : "#ffffff"
                  }
                  height="25px"
                  width="25px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="XMLID_21_"
                      d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
                           c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15
                           c8.284,0,15-6.716,15-15V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div
                onClick={toggleDown}
                onMouseEnter={() => setHoveringDown(true)}
                onMouseLeave={() => setHoveringDown(false)}
              >
                <svg
                  fill={
                    order === "desc"
                      ? hoveringDown
                        ? "#ffffff"
                        : "#5D68B0"
                      : hoveringDown
                        ? "#5D68B0"
                        : "#ffffff"
                  }
                  height="25px"
                  width="25px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
                  transform="rotate(180)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="XMLID_21_"
                      d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
                           c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15
                           c8.284,0,15-6.716,15-15V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md: just">
        {/* Side Filter for when screen is large */}

        {/* from hereeeee */}
        <div className="2xl:w-[250px] text-primary xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px] hidden sm:hidden md:hidden lg:block xl:block 2xl:block">
          <h2 className="text-center text-2xl">Filters</h2>
          <div className="mb-5">
            <div className="relative">
              <div
                className="flex gap-2 items-center cursor-pointer "
                onClick={handleGenreDrop}
                ref={genreRef}
              >
                <h3 className="text-xl relative">Genres</h3>
                <Image src={drop} width={15} height={10} alt="drop" />
                <div
                  className={
                    (genreDrop ? `` : `hidden`) +
                    ` flex flex-col gap-1 border-secondary absolute z-50 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px] top-full mt-1`

                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b-[1px] h-[60px] border-secondary pb-2 px-2 flex gap-2 py-1 items-center overflow-x-auto no-scrollbar">
                    {filters.genre.map((g) => (
                      <h2
                        key={g}
                        className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                      >
                        {g}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-wrap p-2 h-[150px] overflow-y-auto no-scrollbar">
                    {genre.map((genre) => (
                      <div key={genre}>
                        <label
                          className={
                            (filters.genre.includes(genre)
                              ? `text-secondary hover:text-white`
                              : "hover:text-secondary cursor-pointer text-white") +
                            ` mx-1 capitalize`
                          }
                          htmlFor={genre}
                        >
                          {genre}
                        </label>
                        <input
                          type="checkbox"
                          name="genre"
                          value={genre}
                          onChange={handleFilterChange}
                          className="hidden"
                          id={genre}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div className="relative">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleThemeDrop}
                ref={themeRef}
              >
                <h3 className="text-xl relative">Themes</h3>
                <Image src={drop} width={15} height={10} alt="drop" />
                <div
                  className={
                    (themeDrop ? `` : `hidden`) +
                    ` flex flex-col gap-1 border-secondary absolute z-40 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px] top-full mt-1`
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b-[1px] h-[60px] border-secondary items-center pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                    {filters.theme.map((t) => (
                      <h2
                        key={t}
                        className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                      >
                        {t}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-wrap p-2 h-[150px] overflow-y-auto no-scrollbar">
                    {theme.map((theme) => (
                      <div key={theme}>
                        <label
                          className={
                            (filters.theme.includes(theme)
                              ? `text-secondary hover:text-white`
                              : "hover:text-secondary cursor-pointer text-white") +
                            ` mx-1 capitalize`
                          }
                          htmlFor={theme}
                        >
                          {theme}
                        </label>
                        <input
                          type="checkbox"
                          name="theme"
                          value={theme}
                          onChange={handleFilterChange}
                          className="hidden"
                          id={theme}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div className="relative">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handlePaceDrop}
                ref={paceRef}
              >
                <h3 className="text-xl relative">Paces</h3>
                <Image src={drop} width={15} height={10} alt="drop" />
                <div
                  className={
                    (paceDrop ? `` : `hidden`) +
                    ` flex flex-col gap-1 border-secondary absolute z-30 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px] top-full mt-1`
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b-[1px] h-[50px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                    {filters.pace.map((p) => (
                      <h2
                        key={p}
                        className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                      >
                        {p}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-wrap p-2 overflow-y-auto no-scrollbar">
                    {pace.map((pace) => (
                      <div key={pace}>
                        <label
                          className={
                            (filters.pace.includes(pace)
                              ? `text-secondary hover:text-white`
                              : "hover:text-secondary cursor-pointer text-white") +
                            ` mx-1 capitalize`
                          }
                          htmlFor={pace}
                        >
                          {pace}
                        </label>
                        <input
                          type="checkbox"
                          name="pace"
                          value={pace}
                          onChange={handleFilterChange}
                          className="hidden"
                          id={pace}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div className="relative">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleFormatDrop}
                ref={formatRef}
              >
                <h3 className="text-xl relative">Formats</h3>
                <Image src={drop} width={15} height={10} alt="drop" />
                <div
                  className={
                    (formatDrop ? `` : `hidden`) +
                    ` flex flex-col gap-1 border-secondary absolute z-20 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px] top-full mt-1`
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                    {filters.format.map((f) => (
                      <h2
                        key={f}
                        className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                      >
                        {f}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-wrap p-2 overflow-y-auto no-scrollbar">
                    {format.map((format) => (
                      <div key={format}>
                        <label
                          className={
                            (filters.format.includes(format)
                              ? `text-secondary hover:text-white`
                              : "hover:text-secondary cursor-pointer text-white") +
                            ` mx-1 capitalize`
                          }
                          htmlFor={format}
                        >
                          {format}
                        </label>
                        <input
                          type="checkbox"
                          name="format"
                          value={format}
                          onChange={handleFilterChange}
                          className="hidden"
                          id={format}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="relative">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleLangDrop}
                ref={langRef}
              >
                <h3 className="text-xl relative">Languages</h3>
                <Image src={drop} width={15} height={10} alt="drop" />
                <div
                  className={
                    (langDrop ? `` : `hidden`) +
                    ` flex flex-col gap-1 border-secondary absolute z-10 border-[1px] rounded-md py-2 bg-background 2xl:w-[250px] xl:w-[200px] lg:w-[200px] norm:w-[200px] md:w-[150px] sm:w-[150px] w-[100px] xs:w-[100px] top-full mt-1`
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b-[1px] h-[60px] items-center border-secondary pb-2 px-2 flex gap-2 py-1 overflow-x-auto no-scrollbar">
                    {filters.language.map((l) => (
                      <h2
                        key={l}
                        className="border-secondary capitalize text-secondary border-[1px] rounded-md p-1"
                      >
                        {l}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-wrap p-2 h-[150px] overflow-y-auto no-scrollbar">
                    {language.map((language) => (
                      <div key={language}>
                        <label
                          className={
                            (filters.language.includes(language)
                              ? `text-secondary hover:text-white`
                              : "hover:text-secondary cursor-pointer text-white") +
                            ` mx-1 capitalize`
                          }
                          htmlFor={language}
                        >
                          {language}
                        </label>
                        <input
                          type="checkbox"
                          name="language"
                          value={language}
                          onChange={handleFilterChange}
                          className="hidden"
                          id={language}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div>
              <h3 className="text-xl mb-1">Rating</h3>
              <div className="flex flex-nowrap gap-1">
                <input
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    handleRatingChange(e.target.value, filters.rating[1])
                  }
                  className="w-[75px] bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                  max={5}
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    handleRatingChange(filters.rating[0], e.target.value)
                  }
                  className="w-[75px] bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                  max={5}
                  min={0}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-1">Publish Date</h3>
              <div className="flex flex-row gap-1 flex-wrap">
                <input
                  type="date"
                  placeholder="Start date"
                  onChange={(e) =>
                    handlePublishDateChange(
                      e.target.value,
                      filters.publishDate[1]
                    )
                  }
                  className=" bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                />
                <input
                  type="date"
                  placeholder="End date"
                  onChange={(e) =>
                    handlePublishDateChange(
                      filters.publishDate[0],
                      e.target.value
                    )
                  }
                  className=" bg-background border-secondary border-[1px] rounded-md p-1 text-secondary outline-none"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="bg-secondary w-full rounded-md my-2 text-2xl text-white"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="sortOptions" className="text-xl">
                Sort By:{" "}
              </label>
              <select
                onChange={handleSortChange}
                value={sort}
                name="sort"
                id="sortOptions"
                className="w-full h-[40px] text-lg bg-background border-secondary border-[1px] rounded-md p-1 outline-none text-secondary"
              >
                <option value="alpha">Alphabetic</option>
                <option value="userRead">Popular</option>
                <option value="userLiked">Liked</option>
                <option value="userRented">Rented</option>
                <option value="rating">Rated</option>
                <option value="publishDate">Publish Date</option>
              </select>
            </div>
            <div className="flex gap-2 mt-3 items-center">
              <label htmlFor="orderOptions" className="text-xl">
                Order by:{" "}
              </label>
              <div id="orderOptions" className="flex gap-4 cursor-pointer">
                <div
                  onClick={toggleUp}
                  onMouseEnter={() => setHoveringUp(true)}
                  onMouseLeave={() => setHoveringUp(false)}
                >
                  <svg
                    fill={
                      order === "asc"
                        ? hoveringUp
                          ? "#ffffff"
                          : "#5D68B0"
                        : hoveringUp
                          ? "#5D68B0"
                          : "#ffffff"
                    }
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xmlSpace="preserve"
                    transform="rotate(0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        id="XMLID_21_"
                        d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
                           c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15
                           c8.284,0,15-6.716,15-15V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div
                  onClick={toggleDown}
                  onMouseEnter={() => setHoveringDown(true)}
                  onMouseLeave={() => setHoveringDown(false)}
                >
                  <svg
                    fill={
                      order === "desc"
                        ? hoveringDown
                          ? "#ffffff"
                          : "#5D68B0"
                        : hoveringDown
                          ? "#5D68B0"
                          : "#ffffff"
                    }
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xmlSpace="preserve"
                    transform="rotate(180)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        id="XMLID_21_"
                        d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
                           c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15
                           c8.284,0,15-6.716,15-15V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:w-[1150px] xl:w-[1000px] lg:w-[800px] norm:w-[500px] md:w-[450px] sm:w-[300px] w-[250px] xs:w-[150px] p-1">
          {results && results.length > 0 ? (
            <div>
              <div className="flex flex-wrap lg:justify-between justify-center">
                {results.map((book) => (
                  <div
                    key={book._id}
                    className=" transition-transform duration-300 hover:scale-[1.01] flex 2xl:w-[650px] xl:w-[600px] lg:w-[500px] norm:w-[725px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] 2xl:h-[300px] xl:h-[275px] lg:h-[225px] norm:h-[325px] md:h-[275px] sm:h-[200px]  h-[175px] xs:h-[150px] my-3"
                  >
                    <div className="flex items-stretch 2xl:w-[225px] xl:w-[200px] lg:w-[175px] norm:w-[225px] md:w-[200px] sm:w-[150px] w-[110px] xs:w-[80px]">
                      <img
                        src={book.imgUrl}
                        className="px-2 xs:px-0.5 w-full"
                        alt={book.title}
                      />
                    </div>
                    <div className="flex 2xl:w-[425px] xl:w-[400px] lg:w-[325px] norm:w-[500px] md:w-[400px] sm:w-[300px] w-[230px] xs:w-[215px] flex-col justify-between">
                      <div className="2xl:h-[250px] xl:h-[225px] lg:h-[180px] norm:h-[275px] md:h-[225px] sm:h-[165px] h-[150px] xs:h-[100px]">
                        <h1
                          onClick={() => handleBookClick(`/books/${book._id}`)}
                          className="text-primary cursor-pointer text-wrap 2xl:text-4xl xl:text-3xl lg:text-xl norm:text-4xl md:text-3xl sm:text-lg text-base xs:text-sm"
                        >
                          {book.title.length > 40
                            ? `${book.title.slice(0, 40)}...`
                            : book.title}
                        </h1>
                        <h3 className="text-primary 2xl:text-2xl xl:text-2xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px]">
                          {book.author}
                        </h3>
                        <h4 className="2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px]">
                          {book.isbn}
                        </h4>
                        <h4 className="2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px] capitalize">
                          {book.genre[0]}, {book.genre[1]}, {book.genre[2]},{" "}
                          {book.genre[book.genre.length - 1]}
                        </h4>
                        <h4 className="2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px] capitalize">
                          {book.format}
                        </h4>
                        <h4 className="2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px]">
                          {book.length}
                        </h4>
                      </div>
                      <div className="flex 2xl:h-[50px] xl:h-[50px] lg:h-[45px] norm:h-[50px] md:h-[50px] sm:h-[35px] h-[25px] xs:h-[25px] justify-between 2xl:gap-2">
                        <div
                          ref={(el) => (dropRefs.current[book._id] = el)}
                          onClick={() => toggleDrop(book._id)}
                          className=" cursor-pointer flex justify-start items-center h-full 2xl:w-[250px] xl:w-[225px] lg:w-[175px] norm:w-[250px] md:w-[225px] sm:w-[175px] w-[130px] xs:w-[115px]"
                        >
                          <section className="bg-secondary hover:bg-[#4f5aa3] text-white h-full 2xl:w-[175px] xl:w-[150px] lg:w-[125px] norm:w-[200px] md:w-[150px] sm:w-[140px] w-[105px] xs:w-[90px] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] text-center  content-center">
                            {dropTextState[book._id] || "Add to a List"}
                          </section>
                          <section className="bg-secondary hover:bg-[#4f5aa3] flex items-center justify-end h-full 2xl:w-[50px] xl:w-[50px] lg:w-[45px] norm:w-[50px] md:w-[50px] sm:w-[35px] w-[25px] xs:w-[25px] border-l-2">
                            <Image
                              src={dropdown}
                              alt="dd"
                              className="mx-auto relative"
                              width={25}
                              height={20}
                            />
                            <section
                              className={`bg-secondary ${dropState[book._id] ? "" : "hidden"
                                } absolute 2xl:w-[150px] xl:w-[125px] lg:w-[100px] norm:w-[175px] md:w-[125px] sm:w-[110px] 2xl:mt-[148px] xl:mt-[140px] lg:mt-[134px] norm:mt-[147px] md:mt-[140px] sm:mt-[116px] mt-[99px] xs:mt-[99px]`}
                            >
                              <ul className="text-white text-center">
                                <li
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTextChange(book._id, "Finished");
                                  }}
                                  className={
                                    dropTextState[book._id] === "Finished"
                                      ? `hidden`
                                      : `` +
                                      ` border-y-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full`
                                  }
                                >
                                  Finished
                                </li>
                                <li
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTextChange(book._id, "To-Read");
                                  }}
                                  className={
                                    dropTextState[book._id] === "To-Read"
                                      ? `hidden`
                                      : `` +
                                      ` border-b-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full`
                                  }
                                >
                                  To-Read
                                </li>
                                <li
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTextChange(book._id, "Add to List");
                                  }}
                                  className={
                                    (dropTextState[book._id] === "Finished" ||
                                      dropTextState[book._id] === "To-Read"
                                      ? ` `
                                      : `hidden`) +
                                    ` border-b-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full`
                                  }
                                >
                                  Remove
                                </li>
                              </ul>
                            </section>
                          </section>
                        </div>
                        <div className="flex justify-start 2xl:w-[175px] xl:w-[150px] lg:w-[125px] norm:w-[200px] md:w-[150px] sm:w-[100px] w-[90px] xs:w-[80px] gap-2">
                          <div onClick={() => toggleLike(book._id)}>
                            {likePref[book._id] === "like" ? (
                              <Image
                                src={activeLike}
                                alt="like active"
                                width={45}
                                height={45}
                                className="md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]"
                              />
                            ) : (
                              <Image
                                src={like}
                                alt="active"
                                width={45}
                                height={45}
                                className="md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]"
                              />
                            )}
                          </div>
                          <div onClick={() => toggleDislike(book._id)}>
                            {likePref[book._id] === "dislike" ? (
                              <Image
                                src={activeDislike}
                                alt="active Dislike"
                                width={45}
                                height={45}
                                className="md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]"
                              />
                            ) : (
                              <Image
                                src={dislike}
                                alt="dislike"
                                width={45}
                                height={45}
                                className="md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                limit={limit}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <div> 
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
