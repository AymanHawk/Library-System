'use client'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useRouterContext } from '../../../../../utils/RouterContext';
import LibNavbar from '../../../../../components/LibNavbar';

function AddBook() {

  const id = usePathname().split('/').pop();
  const router = useRouterContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [date, setDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [lang, setLang] = useState('');
  const [length, setLength] = useState('');
  const [format, setFormat] = useState('');
  const [genre, setGenre] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedExistingBook, setSelectedExistingBook] = useState(null);
  const [result, setResult] = useState([]);

  const handleRouterClick = (path) => {
    router.push(path);
  }

  const onAddClick = async () => {
    try {
      const res = await fetch('/api/library/addBook', {
        method: 'GET',
        headers: {
          title,
          author,
          publisher,
          date,
          isbn,
          lang,
          format,
        }
      })

      if (!res.ok) {
        throw new Error('Error getting the user lib')
      }

      const data = await res.json();
      console.log(data);
      setResult(data.books);
    } catch (err) {
      console.log("Error getting books", err);
    }
  }

  const handleAddExistBook = () => {
    console.log(selectedExistingBook);
  }

  return (

    <div>
      <LibNavbar libId={id} libPath={`/library/inventory/${id}`} />
      <div>
        <div>Book Information</div>
        <div className='flex gap-2 flex-wrap text-background'>
          <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
          <input type="text" value={author} placeholder='Author(s)' onChange={(e) => setAuthor(e.target.value)} />
          <input type="text" value={publisher} placeholder='Publisher' onChange={(e) => setPublisher(e.target.value)} />
          <input type="text" value={date} placeholder='Publish Date' onChange={(e) => setDate(e.target.value)} />
          <input type="text" value={isbn} placeholder='ISBN' onChange={(e) => setIsbn(e.target.value)} />
          <input type="text" value={lang} placeholder='Language' onChange={(e) => setLang(e.target.value)} />
          <input type="text" value={length} placeholder='Length' onChange={(e) => setLength(e.target.value)} />
          <input type="text" value={format} placeholder='Format' onChange={(e) => setFormat(e.target.value)} />
          <input type="text" value={genre} placeholder='Genre' onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <textarea className='m-0.5 text-background' value={desc} name="description" id="description" placeholder='Description' onChange={(e) => setDesc(e.target.value)} />
        </div>
      </div>
      <div className='relative'>
        <div className='absolute bg-background ml-40'>
          {(result && result.length > 0) ? (
            <div>
              {result.map((book) => (
                <div key={book._id}>
                  <label htmlFor={`book${book._id}`} >{book.title}</label>
                  <input type="radio" name="book" onChange={(e)=>{setSelectedExistingBook(e.target.value)}} value={`${book._id}`} id={`book${book._id}`} />
                </div>
              ))}
              <div className='bg-secondary' onClick={handleAddExistBook}>
                add selected book
              </div>
            </div>
          ) : (
            <div>
              empty no
              <div className='bg-secondary'>
                add book
              </div>
            </div>
          )

          }
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='border-primary border-[1px] cursor-pointer rounded-md' onClick={() => handleRouterClick(`/library/inventory/${id}`)}>
          back
        </div>
        <div className='bg-secondary cursor-pointer' onClick={onAddClick}>
          upload
        </div>
      </div>
    </div>
  )
}

export default AddBook