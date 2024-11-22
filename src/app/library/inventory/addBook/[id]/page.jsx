"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useRouterContext } from "../../../../../utils/RouterContext";
import LibNavbar from "../../../../../components/LibNavbar";
import cross from "../../../../../images/cross.png";
import Image from "next/image";


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
   formData.append("file", file);
   formData.append("upload_preset", "book_image");
   try {
     const response = await fetch(
       `https://api.cloudinary.com/v1_1/dou1i4rdx/image/upload`,
       {
         method: "POST",
         body: formData,
       }
     );


     const data = await response.json();
     if (data.secure_url) {
       setImg(data.secure_url); //cloudinary image  url
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
     console.log(data);
     setResult(data.books);
     setPopUp(true);
   } catch (err) {
     console.log("Error getting books", err);
   }
 };


 const handleAddExistBook = async () => {
   try {
     console.log(selectedExistingBook);
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
     }
     setPopUp(false);
   } catch (err) {
     console.log(err);
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
       return;
     }


     const data = await res.json();
     if (!data.success) {
       console.error("API response indicates failure to update the inventory");
     }
     setPopUp(false);
   } catch (err) {
     console.log(err);
   }
 };


 return (
   <div>
     <LibNavbar libId={id} libPath={`/library/inventory/${id}`} />
     <div className="relative">
       <div
         className={
           (popUp ? "" : "hidden ") +
           ` absolute bg-background border-secondary border-[1px] p-10 ml-40`
         }
       >
         <div>
           <Image
             src={cross}
             height={25}
             width={25}
             alt="cross"
             onClick={() => {
               setPopUp(false);
             }}
           />
         </div>
         {result && result.length > 0 ? (
           <div>
             {result.map((book) => (
               <div key={book._id}>
                 <label htmlFor={`book${book._id}`}>{book.title}</label>
                 <input
                   type="radio"
                   name="book"
                   onChange={(e) => {
                     setSelectedExistingBook(e.target.value);
                   }}
                   value={`${book._id}`}
                   id={`book${book._id}`}
                 />
               </div>
             ))}
             <div className="bg-secondary" onClick={handleAddExistBook}>
               add selected book
             </div>
             <div className="bg-secondary" onClick={handleNewBook}>
               add the inputed book
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
       <div className="border-2 border-solid border-secondary rounded-xl mx-[8%] h-[80%]">
         <div className="text-[34px] text-primary text-center sm:ml-4 mt-2">
           Book Information
         </div>
         <div className="grid grid-cols-2 gap-2 gap-y-8 m-4 text-background">
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={title}
             placeholder="Title"
             onChange={(e) => setTitle(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={author}
             placeholder="Author(s)"
             onChange={(e) => setAuthor(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={publisher}
             placeholder="Publisher"
             onChange={(e) => setPublisher(e.target.value)}
           />
           <input
             type="date"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={date}
             placeholder="Publish Date"
             onChange={(e) => setDate(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={isbn}
             placeholder="ISBN"
             onChange={(e) => setIsbn(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={lang}
             placeholder="Language"
             onChange={(e) => setLang(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={length}
             placeholder="Length"
             onChange={(e) => setLength(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={format}
             placeholder="Format"
             onChange={(e) => setFormat(e.target.value)}
           />
           <input
             type="text"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             value={genre}
             placeholder="Genre"
             onChange={(e) => setGenre(e.target.value)}
           />


           {/* Cloudinary Image Upload where it happems*/}
           <input
             type="file"
             className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
             onChange={handleImageUpload}
           />


           <div className="col-span-2">
             <textarea
               className="m-0.5 w-full  bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[90px]"
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
       <div className="bg-secondary cursor-pointer rounded-lg px-8 sm:px-14 py-2 text-white text-[20px]" onClick={onAddClick}>
         Upload
       </div>
     </div>
   </div>
 );
}


export default AddBook;



