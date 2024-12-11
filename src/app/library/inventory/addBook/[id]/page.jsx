"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useRouterContext } from "../../../../../utils/RouterContext";
import LibNavbar from "../../../../../components/LibNavbar";
import cross from "../../../../../images/cross.png";
import nobookcover from "../../../../../images/no_cover_available.png";
import Image from "next/image";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBook() {
  const id = usePathname().split("/").pop();
  const router = useRouterContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState("");
  const [isbn, setIsbn] = useState("");
  const [lang, setLang] = useState("");
  const [length, setLength] = useState("");
  const [format, setFormat] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");
  const [imgSrc, setImg] = useState("");
  const [selectedExistingBook, setSelectedExistingBook] = useState(null);
  const [result, setResult] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const handleRouterClick = (path) => {
    router.push(path);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    const cloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_LINK;
    formData.append("file", file);
    formData.append("upload_preset", "book_image");
    try {
      const response = await fetch(cloudUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setImg(data.secure_url);
      } else {
        console.error("Error uploading to Cloudinary", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onAddClick = async () => {
    try {
      const res = await fetch("/api/library/checkBook", {
        method: "GET",
        headers: {
          title,
          author,
          isbn,
          lang,
          format,
        },
      });

      if (!res.ok) {
        throw new Error("Error getting the user lib");
      }

      const data = await res.json();
      setResult(data.books);
      setPopUp(true);
    } catch (err) {
      console.log("Error getting books", err);
    }
  };

  const handleAddExistBook = async () => {
    try {
      let libId = id;
      let bookId = selectedExistingBook;

      const res = await fetch("/api/library/addBookToInvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ libId, bookId }),
      });

      if (!res.ok) {
        console.error("Failed to update the inventory", res.statusText);
        return;
      }

      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the inventory");
        toast.error('Failed to Add the Book');
      } else {
        toast.success('Added the Selected Book to the Inventory');
        router.push(`/library/inventory/${libId}`)
      }
      setPopUp(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Add the Book');

    }
  };

  const handleNewBook = async () => {
    try {
      let libId = id;

      const res = await fetch("/api/library/addBookToLib", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          publisher,
          date,
          isbn,
          lang,
          length,
          format,
          desc,
          genre,
          libId,
          imgSrc,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update the inventory", res.statusText);
        toast.error('Failed to Add the Book, Missing Information');
        return;
      }

      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the inventory");
        toast.error('Failed to Add the Book');
      } else {
        toast.success('Added the Selected Book to the Inventory');
        router.push(`/library/inventory/${libId}`)
      }
      setPopUp(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Add the Book');

    }
  };

  return (
    <div>
      <LibNavbar libId={id} libPath={`/library/inventory/${id}`} />
      <div className="relative">
        <div
          className={
            (popUp ? "" : "hidden ") +
            ` absolute top-0 left-[-150px] sm:left-[-80px] md:left-[-40px] rounded-md bg-background border-secondary border-[1px] p-10 ml-40 w-[50%]`
          }
        >
          <div>
            <Image
              className="absolute top-2 left-2 transition-transform duration-300 hover:scale-[1.065] cursor-pointer"
              src={cross}
              height={30}
              width={30}
              alt="cross"
              onClick={() => {
                setPopUp(false);
              }}
            />
          </div>
          {result && result.length > 0 ? (
            <div className="">
              <div className="flex overflow-x-auto p-2">
                {result.map((book) => (
                  <div key={book._id} className="p-1 transition-transform duration-300 hover:scale-[1.01] hover:bg-loading">
                    <div className="flex flex-row ml-2">
                      <div className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28">
                        {book.imgUrl !== "N/A" ? (
                          <img src={book.imgUrl} alt={book.title} />
                        ) : (
                          <Image
                            className="w-full lg:h-[350px] sm:h-[320px] h-[200px] bg-primary mr-4"
                            src={nobookcover}
                            alt={`${book.title} cover`}
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-start ml-2">
                        <div className="text-primary sm:text-lg norm:text-2xl lg:text-2xl text-nowrap text-base">
                          <label
                            htmlFor={`book${book._id}`}
                            className="text-[24px] mr-2 cursor-pointer"
                            onClick={()=>{handleRouterClick(`/books/${book._id}`)}}
                          >
                            {book.title}
                          </label>
                        </div>
                        <p className="text-[#D9D9D9]] sm:text-base norm:text-lg lg:text-lg text-sm">
                          {book.author}
                        </p>
                        <p className="text-[#D9D9D9]] sm:text-base norm:text-lg lg:text-lg text-sm">
                          #{book.isbn}
                        </p>
                        <input
                          type="radio"
                          name="book"
                          className="appearance-none cursor-pointer w-3 h-3 border border-primary rounded-full checked:bg-primary checked:border-primary focus:outline-none"
                          onChange={(e) => {
                            setSelectedExistingBook(e.target.value);
                          }}
                          value={`${book._id}`}
                          id={`book${book._id}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row">
                <div
                  className="bg-secondary cursor-pointer mt-4 mb-2 text-center text-[20px] rounded-md py-2 px-4 transition-transform duration-300 hover:scale-[1.01]"
                  onClick={handleAddExistBook}
                >
                  Add Selected Book
                </div>
                <div
                  className="bg-secondary cursor-pointer ml-4 mt-4 mb-2 text-center text-[20px] rounded-md py-2 px-4 transition-transform duration-300 hover:scale-[1.01]"
                  onClick={handleNewBook}
                >
                  Add Uploaded Book
                </div>
              </div>
            </div>
          ) : (
            <div>
              empty no
              <div className="bg-secondary" onClick={handleNewBook}>
                add book
              </div>
            </div>
          )}
        </div>
        <div className="border-2 border-solid  border-secondary rounded-xl mx-[8%] h-[80%]">
          <div className="text-[34px] text-primary text-center sm:ml-4 mt-2 ">
            Book Information
          </div>
          <div className="grid grid-cols-2 gap-2 gap-y-8 m-4 text-background">
            <input
              type="text"
              className="w-full placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={author}
              placeholder="Author(s)"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={publisher}
              placeholder="Publisher"
              onChange={(e) => setPublisher(e.target.value)}
            />
            <input
              type="date"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={date}
              placeholder="Publish Date"
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={isbn}
              placeholder="ISBN"
              onChange={(e) => setIsbn(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={lang}
              placeholder="Language"
              onChange={(e) => setLang(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={length}
              placeholder="Length"
              onChange={(e) => setLength(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={format}
              placeholder="Format"
              onChange={(e) => setFormat(e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              value={genre}
              placeholder="Genre"
              onChange={(e) => setGenre(e.target.value)}
            />

            <input
              type="file"
              className="w-full file:bg-background  file:border-primary file:border-solid file:border-r-[1px] file:border-0 file:cursor-pointer file:text-white border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[40px]"
              onChange={handleImageUpload}
            />

            <div className="col-span-2">
              <textarea
                className="m-0.5 w-full placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-[18px] sm:text-[23px] pl-2 text-white h-[90px]"
                value={desc}
                name="description"
                id="description"
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-[8%] mt-4">
        <div
          className="border-primary border-2 cursor-pointer rounded-lg px-8 sm:px-14 py-2 text-primary text-[20px]"
          onClick={() => handleRouterClick(`/library/inventory/${id}`)}
        >
          Back
        </div>
        <div
          className="bg-secondary cursor-pointer rounded-lg px-8 sm:px-14 py-2 text-white text-[20px] transition-transform duration-300 hover:scale-[1.01]"
          onClick={onAddClick}
        >
          Upload
        </div>
      </div>
    </div>
  );
}

export default AddBook;
