'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import dropdown from '../../../images/dd.png';
import { useUser } from '@clerk/nextjs';


function Books() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [drop, setDrop] = useState(false);
  const [dropText, setDropText] = useState('Add to a List');
  const {user} = useUser();
  const [userList, setUserLists] = useState({
    readBooks: [],
    toReadBooks: [],
  })


  const handleTextChange = (listName) => {
    setDropText(listName);
    if(user) {
      updateBookList(listName);
    }
  };

  const handleHover = () => {
    setDrop(!drop)
  }

  useEffect(() => {
    if (id) {
      fetch(`/api/bookID/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setBook(data);
            if(user && user.id) {
              checkUserBookLists();
            }
          }
        })
        .catch((err) => setError('Error', err))
    }
  }, [id, user])

  const checkUserBookLists = async () => {
    if(user && user.id) {
      try {
        const res = await fetch(`/api/bookList?userId=${user.id}`);
        const data = await res.json();
        setUserLists(data);

        if (data.readBooks.includes(id)) {
          setDropText('Finished');
        } else if (data.toReadBooks.includes(id)) {
          setDropText('To-Read');
        } else {
          setDropText('Add to the List');
        }
      } catch(err) {
        console.error('Error Fetching user book Lists:', err )
      }
    }
  };

  const updateBookList = async (list) => {
    try{
      let newList;
      if(list === 'Finished') {newList = 'readBooks'}
      else if(list === 'To-Read') {newList = 'toReadBooks'}
      const userId = user.id;
      const bookId = id;
      const res = await fetch('/api/bookList', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId, newList }),
      });
      const data = await res.json();
      if (!data.success) {
        console.error('Error updating book list:', data.error);
      } else {
        setUserLists(data.bookList);
        await checkUserBookLists(); 
      }

    } catch (err) {
      console.error("error updating book list:", err);
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div className='book-top-div'>
        {/* book image */}
        <div className='book-img'>
          <Image src={book.imgUrl}
            alt='book image'
            width={10}
            height={20}
            layout='responsive'
          />
        </div>
        <div className='book-info-mid'>
          <div className='book-title'>
            <h1>{book.title}</h1>
          </div>
          <div className='book-author'>
            {book.author}
          </div>
          <div className='book-description'>
            <p dangerouslySetInnerHTML={{ __html: book.description }} />
          </div>
        </div>
        <div className='book-info-left'>
          <div onClick={handleHover} className=' cursor-pointer flex justify-start items-center mb-3'>
            <section className='bg-secondary hover:bg-[#4f5aa3] text-white font-normal z-10 py-2 px-2 w-48 h-[48px] content-center my-auto text-left'>{dropText}</section>
            <section className='bg-secondary hover:bg-[#4f5aa3] flex items-center z-20 justify-end w-[48px] h-[48px] border-l-2  py-2 '>
              <Image src={dropdown} alt='dd'  className='mx-auto relative' width={25} height={20}></Image>
              <section className={`bg-secondary ${drop ? '' : 'hidden'} z-10 absolute xl:mt-[197px] mt-[185px] w-36 text-center`}>
                <ul className='text-white'>
                  <li onClick={() => handleTextChange('Finished')} className='border-y-2 hover:bg-[#4f5aa3] p-2 w-full'>Finished</li>
                  <li onClick={() => handleTextChange('To-Read')} className='border-b-2 hover:bg-[#4f5aa3] p-2 w-full'>To-Read</li>
                </ul>
              </section>
            </section>
          </div>
          <section className='lib-dropdown text-black' name="libraries" id="libraries">
            Libraries
          </section>
          <div className='justify-between'>
            <div>ISBN: </div>
            <div>{book.isbn}</div>
          </div>
          <div className='justify-between'>
            <div>Publisher: </div>
            <div>{book.publishName}</div>
          </div>
          <div className='justify-between'>
            <div>Length: </div>
            <div>{book.length}</div>
          </div>
          <div className='justify-between'>
            <div>Format:</div>
            <div>{book.format}</div>
          </div>
          <div className='justify-between'>
            <div>Language:</div>
            <div>{book.language}</div>
          </div>
          <div className='justify-between'>
            <div>Publish Date:</div>
            <div>{new Date(book.publishDate).toDateString()}</div>
          </div>
          <button className='bg-secondary w-full py-2 rounded-md mt-5 text-2xl'>
            Add to Cart
          </button>
        </div>
      </div>
      <hr />
      <div className='book-mid-div'>
        <div className='book-bott-left'>
          <div onClick={handleHover} className=' cursor-pointer flex justify-start items-center mb-3'>
            <section className='bg-secondary hover:bg-[#4f5aa3] text-white font-normal py-2 px-2 w-24 sm:w-48 h-[40px] sm:text-lg text-sm xs:w-20 xs:text-[10px] leading-none content-center text-left'>{dropText}</section>
            <section className='bg-secondary hover:bg-[#4f5aa3] flex items-center z-20 justify-end w-[40px] h-[40px] border-l-2  py-2 '>
              <Image src={dropdown} alt='dd'  className='mx-auto relative' width={25} height={20}></Image>
              <section className={`bg-secondary ${drop ? '' : 'hidden'} z-10 absolute xs:mt-[122px] mt-[133px] sm:mt-[163px] sm:w-36 w-[90px] xs:w-16 text-center`}>
                <ul className='text-white'>
                  <li onClick={() => handleTextChange('Finished')} className='border-y-2 hover:bg-[#4f5aa3] p-2 w-full'>Finished</li>
                  <li onClick={() => handleTextChange('To-Read')} className='border-b-2 hover:bg-[#4f5aa3] p-2 w-full'>To-Read</li>
                </ul>
              </section>
            </section>
          </div>
          <section className='lib-dropdown text-black' name="libraries" id="libraries">
            Libraries
          </section>
          <div className='justify-between'>
            <div>ISBN: </div>
            <div>{book.isbn}</div>
          </div>
          <div className='justify-between'>
            <div>Publisher: </div>
            <div>{book.publishName}</div>
          </div>
          <div className='justify-between'>
            <div>Length: </div>
            <div>{book.length}</div>
          </div>
          <div className='justify-between'>
            <div>Format:</div>
            <div>{book.format}</div>
          </div>
          <div className='justify-between'>
            <div>Language:</div>
            <div>{book.language}</div>
          </div>
          <div className='justify-between'>
            <div>Publish Date:</div>
            <div>{new Date(book.publishDate).toDateString()}</div>
          </div>
          <button className='bg-secondary w-full py-2 rounded-md mt-5 xs:text-sm text-base sm:text-2xl'>
            Add to Cart
          </button>
        </div>
        <div className='book-feel'>
          <h2>Feel</h2>
          <ul>
            {Object.entries(book.reviewData.theme)
              .sort((a, b) => b[1] - a[1])
              .filter(([_, value]) => value > 0)
              .map(([key, value]) => (
                <li key={key}>
                  <span>{key}</span>  {value}
                </li>
              ))}
          </ul>
        </div>
        <hr />
        <div className='book-genre'>
          <h2>Tags</h2>
          <div className='tag-list'>
            {
              (book.genre)
                .map((tag) => (
                  <div key={tag}>{tag}</div>
                ))
            }
          </div>
        </div>
        <div className='book-pace'>
          <h2>Pace</h2>
          <ul>
            {Object.entries(book.reviewData.pace)
              .sort((a, b) => b[1] - a[1])
              .filter(([_, value]) => value > 0)
              .map(([key, value]) => (
                <li key={key}>
                  <span>{key}</span>  {value}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <hr />
      <div className='flex flex-col w-11/12 mx-auto mt-5 mb-10 gap-4'>
        <div className='flex justify-between items-end'>
          <h3 className='text-primary text-left content-end xs:text-sm text-xl font-bold md:text-2xl lg:text-4xl xl:text-5xl'>Reviews</h3>
          <h3 className='text-primary text-right xs:text-sm text-xl font-bold md:text-2xl lg:text-4xl xl:text-5xl'>Leave a Review</h3>
        </div>
        <div className='flex justify-between'>
          <div className='h-48 w-[55%] lg:w-[65%] border-[1px] border-secondary border-solid rounded-md'></div>
          <div className='h-48 w-[40%] lg:w-[30%] border-[1px] border-secondary border-solid rounded-md'></div>
        </div>
      </div>
    </div>
  )
}

export default Books