"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouterContext } from "../../../../../utils/RouterContext";
import LibNavbar from "../../../../../components/LibNavbar";
import Papa from "papaparse";
import { parseStringPromise } from "xml2js";
import { read, utils } from "xlsx";
import Image from "next/image";
import cross from "../../../../../images/cross.png";

function StockEdit() {
  const id = usePathname().split("/").pop();
  const router = useRouterContext();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [editValue, setEditValue] = useState({});
  const [editingBook, setEditingBook] = useState(null);
  const [imageFiles, setImageFiles] = useState({}); 

  const handleEdit = (isbn, field, value) => {
    setEditValue((prev) => ({
      ...prev,
      [isbn]: {
        ...prev[isbn],
        [field]: value,
      },
    }));
  };

  const handleSave = (isbn) => {
    setResult((prev) =>
      prev.map((book) =>
        book.isbn === isbn ? { ...book, ...editValue[isbn], editable: true } : book
      )
    );
    setEditValue((prev) => {
      const { [isbn]: _, ...rest } = prev;
      return rest;
    });
    setEditingBook(null);
  };

  const handleDelete = (isbn) => {
    setResult((prev) => prev.filter((book) => book.isbn !== isbn));
    setEditValue((prev) => {
      const { [isbn]: _, ...rest } = prev;
      return rest;
    });
    setEditingBook(null);
  };

  const handleRouterClick = (path) => {
    router.push(path);
  };

  const checkBooks = async () => {
    try {
      const query = encodeURIComponent(JSON.stringify(file));
      const res = await fetch(`/api/library/addMultiBookToLib?books=${query}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Error getting the user lib");
      }
      const data = await res.json();
      console.log(data.result);
      setResult(data.result);
    } catch (err) {
      console.log("Error getting books", err);
    }
  };

  
  const handleFileChange = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      let booksData;

      if (files.type === "application/json") {
        booksData = JSON.parse(content);
      } else if (files.type === "text/csv") {
        booksData = Papa.parse(content, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        }).data;
      } else if (files.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        const workbook = read(content, { type: "binary", cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        booksData = utils.sheet_to_json(sheet, { raw: false });
      } else if (files.type === "text/xml" || files.type === "application/xml") {
        try {
          let Data = await parseStringPromise(content, { mergeAttrs: true });
          booksData = Data.root.row;
        } catch (err) {
          console.error("Error parsing XML:", err);
          alert("Failed to parse XML file");
          return;
        }
      } else {
        alert("Unsupported file type");
        return;
      }
      setFile(booksData);
    };

    if (files.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      reader.readAsBinaryString(files);
    } else {
      reader.readAsText(files);
    }
  };

  
  const handleImageSelect = (event, isbn) => {
    const file = event.target.files[0];
    if (!file) return;
    setImageFiles((prev) => ({ ...prev, [isbn]: file }));
  };

  
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    const cloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_LINK
    formData.append("file", file);
    formData.append("upload_preset", "book_image");
    
    try {
      const response = await fetch(cloudUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  
  const handleConfirm = async () => {
    try {
      const booksToUpdate = result.map((book) => {
        const imgFile = imageFiles[book.isbn];
        if (imgFile) {
          
          return uploadImageToCloudinary(imgFile).then((imageUrl) => {
            if (imageUrl) {
              return { ...book, imgSrc: imageUrl }; 
            }
            return book; 
          });
        }
        return Promise.resolve(book); 
      });

      
      const updatedBooks = await Promise.all(booksToUpdate);

      
      let libId = id;
      const res = await fetch("/api/library/addMultiBookToLib", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libId,
          books: updatedBooks,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update the inventory", res.statusText);
        return;
      }

      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the inventory");
        return;
      }
      console.log("Books updated successfully!");
    } catch (err) {
      console.log("Error in adding multiple books:", err);
    }
  };

  return (
    <div>
      <LibNavbar libId={id} libPath={`/library/inventory/${id}`} />
      <div>
        <h2>Book info</h2>
        <div className="cursor-pointer">
          <input
            type="file"
            name="csv"
            id="csv"
            onChange={handleFileChange}
            className="bg-secondary file:bg-secondary file:border-none file:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="border-primary border-[1px] cursor-pointer rounded-md"
          onClick={() => handleRouterClick(`/library/inventory/${id}`)}
        >
          back
        </div>
        <div className="bg-secondary" onClick={checkBooks}>
          Upload
        </div>
      </div>
      <hr />
      <div className="relative">
        <div>
          {result ? (
            result.map((book) => (
              <div key={book.isbn}>
                <div>{book.title}</div>
                {book.editable ? (
                  <div>
                    <button
                      className="bg-secondary mb-0.5"
                      onClick={() => setEditingBook(book.isbn)}
                    >
                      Edit
                    </button>

                    {editingBook === book.isbn && (
                      <div className="grid grid-cols-2 gap-2 gap-y-8 m-4 absolute bg-background p-5 text-background">
                        <div>
                          <Image
                            src={cross}
                            height={25}
                            width={25}
                            alt="cross"
                            onClick={() => setEditingBook(null)} 
                          />
                        </div>
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.title ?? book.title ?? ""}
                          placeholder="Title"
                          onChange={(e) => handleEdit(book.isbn, "title", e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.author ?? book.author ?? ""}
                          placeholder="Author(s)"
                          onChange={(e) => handleEdit(book.isbn, "author", e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.publisher ?? book.publisher ?? ""}
                          placeholder="Publisher"
                          onChange={(e) => handleEdit(book.isbn, "publisher", e.target.value)}
                        />
                        <input
                          type="date"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.publication_date ?? book.publication_date ?? ""}
                          placeholder="Publish Date"
                          onChange={(e) => handleEdit(book.isbn, "publication_date", e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={book.isbn}
                          placeholder="ISBN"
                          disabled
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.language ?? book.language ?? ""}
                          placeholder="Language"
                          onChange={(e) => handleEdit(book.isbn, "language", e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.length ?? book.length ?? ""}
                          placeholder="Length"
                          onChange={(e) => handleEdit(book.isbn, "length", e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.format ?? book.format ?? ""}
                          placeholder="Format"
                          onChange={(e) => handleEdit(book.isbn, "format", e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          value={editValue[book.isbn]?.genre ?? book.genre ?? ""}
                          placeholder="Genre"
                          onChange={(e) => handleEdit(book.isbn, "genre", e.target.value)}
                        />
                        <input
                          type="file"
                          className="w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
                          onChange={(e) => handleImageSelect(e, book.isbn)}
                        />
                        <div className="col-span-2">
                          <textarea
                            className="m-0.5 w-full bg-transparent border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[90px]"
                            value={editValue[book.isbn]?.desc ?? book.desc ?? ""}
                            name="description"
                            id="description"
                            placeholder="Description"
                            onChange={(e) => handleEdit(book.isbn, "desc", e.target.value)}
                          />
                        </div>
                        <div>
                          <button
                            className="bg-secondary"
                            onClick={() => handleSave(book.isbn)}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => handleDelete(book.isbn)}
                            className="bg-red-500 text-white ml-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))
          ) : (
            <div>No book</div>
          )}
        </div>
        <button onClick={handleConfirm} className="bg-secondary">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default StockEdit;
