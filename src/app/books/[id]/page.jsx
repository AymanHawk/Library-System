'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import like from "../../../images/like.png";
import dislike from "../../../images/dislike.png";
import activeLike from '../../../images/like_active.png'
import activeDislike from '../../../images/dislike_active.png'

import dropdown from '../../../images/dd.png';
import { useUser } from '@clerk/nextjs';


function Books() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [drop, setDrop] = useState(false);
  const [dropText, setDropText] = useState('Add to a List');
  const { user } = useUser();
  const [userList, setUserLists] = useState({
    readBooks: [],
    toReadBooks: [],
  })
  const [likePref, setLikePref] = useState();
  
  const largeDropRef = useRef(null); // Ref for large screen dropdown
  const smallDropRef = useRef(null);
  

  const handleClickOutside = (event) => {
    if (
      (largeDropRef.current && !largeDropRef.current.contains(event.target)) &&
      (smallDropRef.current && !smallDropRef.current.contains(event.target))
    ) {
      setDrop(false);
    }
  }


  const toggleLike = async () => {
    try {
      setLikePref((prev) => {
        (
          prev === 'like' ? setLikePref(null) : setLikePref('like')
        )
      })
      const userId = user.id;
      const bookId = id;

      const res = await fetch('/api/bookList/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          bookId,
          prefList: 'likedBooks'
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Failed to update like status');
      }
    } catch (err) {
      console.error('Error liking the book:', err);
    }


  }
  const toggleDislike = async () => {
    try {
      setLikePref((prev) => {
        (
          prev === 'dislike' ? setLikePref(null) : setLikePref('dislike')
        )
      })
      const userId = user.id;
      const bookId = id;

      const res = await fetch('/api/bookList/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          bookId,
          prefList: 'dislikedBooks'
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Failed to update dislike status');
      }
    } catch (err) {
      console.error('Error disliking the book:', err);
    }
  }

  const handleTextChange = (listName) => {
    setDropText(listName);
    if (user) {
      updateBookList(listName);
    }
    handleDrop();
  };

  const handleDrop = () => {
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
            if (user && user.id) {
              checkUserBookLists();
            }
          }
        })
        .catch((err) => setError('Error', err))
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }


  }, [id, user])

  const checkUserBookLists = async () => {
    if (user && user.id) {
      try {
        const res = await fetch(`/api/bookList/read?userId=${user.id}`);
        const data = await res.json();
        setUserLists(data);

        if (data.readBooks.includes(id)) {
          setDropText('Finished');
        } else if (data.toReadBooks.includes(id)) {
          setDropText('To-Read');
        } else {
          setDropText('Add to the List');
        }

        if (data.likedBooks.includes(id)) {
          setLikePref('like')
        } else if (data.dislikedBooks.includes(id)) {
          setLikePref('dislike')
        } else {
          setLikePref(null);
        }
      } catch (err) {
        console.error('Error Fetching user book Lists:', err)
      }
    }
  };

  const updateBookList = async (list) => {
    try {
      let newList;
      if (list === 'Finished') { newList = 'readBooks' }
      else if (list === 'To-Read') { newList = 'toReadBooks' }
      else { newList = 'remove' };
      const userId = user.id;
      const bookId = id;
      const res = await fetch('/api/bookList/read', {
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
    <div className='flex flex-col 2xl:w-[1400px] xl:w-[1250px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[345px] xs:w-[250px] mx-auto mt-5'>
      <div className='flex mb-5 sm:justify-between justify-center flex-wrap items-center sm:px-2 2xl:h-[555px] xl:h-[475px] lg:h-[400px] norm:h-[475px] md:h-[360px] sm:h-[235px] '>
        <div className='2xl:w-[350px] xl:w-[300px] lg:w-[250px] norm:w-[300px] md:w-[225px] sm:w-[150px] w-[300px] xs:w-[200px]'>
          <img src={book.imgUrl}
            alt='book image'
            className='w-full'
          />
        </div>
        <div className='2xl:w-[625px] xl:w-[575px] lg:w-[450px] norm:w-[380px] md:w-[305px] sm:w-[250px] w-[325px] xs:w-[200px] 2xl:h-[555px] xl:h-[475px] lg:h-[400px] norm:h-[475px] md:h-[360px] sm:h-[235px] no-scrollbar overflow-y-scroll p-2'>
          <div className='text-primary 2xl:text-6xl xl:text-5xl lg:text-4xl norm:text-5xl md:text-3xl sm:text-2xl text-2xl xs:text-xl'>
            <h1>{book.title}</h1>
          </div>
          <div className='text-primary xl:my-5 lg:my-3 md:my-2 my-2 border-primary border-2 md:p-2 p-1 2xl:text-4xl xl:text-3xl lg:text-2xl norm:text-3xl md:text-xl sm:text-lg text-xl xs:text-lg rounded-md'>
            {book.author}
          </div>
          <div className='2xl:text-2xl xl:text-xl lg:text-lg norm:text-xl md:text-base sm:text-sm text-base xs:text-sm 2xl:h-[325px] xl:h-[280px] lg:h-[240px] norm:h-[260px] md:h-[210px] sm:h-[125px] h-[210px] xs:h-[150px] no-scrollbar overflow-y-scroll p-2'>
            <p dangerouslySetInnerHTML={{ __html: book.description }} />
          </div>
        </div>
        <div className='2xl:w-[350px] xl:w-[300px] lg:w-[250px] 2xl:h-[550px] lg:flex flex-col justify-center hidden'>
          <div className="flex flex-wrap h-[45px] mb-[15px]">
            <div
              ref={largeDropRef}
              onClick={handleDrop}
              className=' cursor-pointer flex justify-start items-center h-max 2xl:w-[225px] xl:w-[200px] lg:w-[150px]'
            >
              <section className='bg-secondary hover:bg-[#4f5aa3] text-white font-normal h-[45px] 2xl:w-[175px] xl:w-[150px] lg:w-[105px] 2xl:text-2xl xl:text-xl lg:text-base content-center my-auto text-center'>{dropText}</section>
              <section className='bg-secondary hover:bg-[#4f5aa3] h-[45px] w-[45px] flex items-center  justify-end border-l-2 '>
                <Image src={dropdown} alt='dd' className='mx-auto relative' width={30} height={25}></Image>
                <section className={`bg-secondary ${drop ? '' : 'hidden'} z-10 absolute 2xl:w-[150px] xl:w-[125px] lg:w-[95px] 2xl:text-2xl xl:text-xl lg:text-base 2xl:mt-[142px] xl:mt-[134px] lg:mt-[127px] text-center`}>
                  <ul className='text-white'>
                    <li onClick={() => handleTextChange('Finished')} className={dropText === 'Finished' ? `hidden` : `` + ` border-y-2 hover:bg-[#4f5aa3] p-2 w-full`}>Finished</li>
                    <li onClick={() => handleTextChange('To-Read')} className={dropText === 'To-Read' ? `hidden` : `border-t-2` + ` border-b-2 hover:bg-[#4f5aa3] p-2 w-full`}>To-Read</li>
                    <li onClick={() => handleTextChange('Add to a List')} className={((dropText === 'Finished' || dropText === 'To-Read') ? ` ` : `hidden`) + ` border-b-2 hover:bg-[#4f5aa3] p-2 w-full`}>Remove</li>
                  </ul>
                </section>
              </section>
            </div>
            <div className="flex flex-nowrap xl:w-[100px] xl:gap-2 w-[90px]">
              <div onClick={toggleLike}>
                {
                  likePref === 'like' ?
                    <Image src={activeLike} alt='like active' width={45} height={45} className='md:w-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />
                    :
                    <Image src={like} alt='active' width={45} height={45} className='md:w-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />
                }
              </div>
              <div onClick={toggleDislike}>
                {
                  likePref === 'dislike' ?
                    <Image src={activeDislike} alt='like active' width={45} height={45} className='md:w-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />
                    :
                    <Image src={dislike} alt='active' width={45} height={45} className='md:w-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />
                }
              </div>
            </div>
          </div>
          <div className='h-[50px] bg-primary rounded-md flex items-center justify-center'>
            <section className='2xl:text-4xl xl:text-3xl lg:text-2xl text-black' name="libraries" id="libraries">
              Libraries
            </section>
          </div>
          <div className='my-3 text-primary font-bold 2xl:text-3xl xl:text-2xl lg:text-lg'>
            <div className='flex justify-between'>
              <div>ISBN: </div>
              <div className='text-right text-white font-normal'>{book.isbn}</div>
            </div>
            <div className='flex justify-between'>
              <div>Publisher: </div>
              <div className='text-right text-white font-normal'>{book.publishName}</div>
            </div>
            <div className='flex justify-between'>
              <div>Length: </div>
              <div className='text-right text-white font-normal'>{book.length}</div>
            </div>
            <div className='flex justify-between'>
              <div>Format:</div>
              <div className='text-right text-white font-normal'>{book.format}</div>
            </div>
            <div className='flex justify-between'>
              <div>Language:</div>
              <div className='text-right text-white font-normal'>{book.language}</div>
            </div>
            <div className='flex justify-between'>
              <div>Publish Date:</div>
              <div className='text-right text-white font-normal'>{new Date(book.publishDate).toDateString()}</div>
            </div>
          </div>
          <button className='bg-secondary w-full py-2 rounded-md text-2xl'>
            Add to Cart
          </button>
        </div>
      </div>
      <hr className='my-5 w-[80%] mx-auto' />
      <div className='flex justify-around flex-wrap'>
        <div className='norm:w-[350px] md:w-[275px] sm:w-[275px] w-[300px] xs:w-[250px] 2xl:h-[550px] flex flex-col justify-center lg:hidden'>
          <div className="flex flex-wrap h-[45px] mb-[15px]">
            <div
              ref={smallDropRef}
              onClick={handleDrop}
              className=' cursor-pointer flex justify-start items-center h-max norm:w-[225px] md:w-[175px] sm:w-[150px] w-[190px] xs:w-[150px]'
            >
              <section className='bg-secondary hover:bg-[#4f5aa3] text-white font-normal h-[45px] norm:w-[175px] md:w-[150px] sm:w-[105px] w-[145px] norm:text-2xl md:text-xl sm:text-base content-center my-auto text-center'>{dropText}</section>
              <section className='bg-secondary hover:bg-[#4f5aa3] h-[45px] w-[45px] flex items-center  justify-end border-l-2 '>
                <Image src={dropdown} alt='dd' className='mx-auto relative' width={30} height={25}></Image>
                <section className={`bg-secondary ${drop ? '' : 'hidden'} z-10 absolute norm:w-[150px] md:w-[125px] sm:w-[95px] w-[125px] norm:text-2xl md:text-xl sm:text-base norm:mt-[142px] md:mt-[134px] sm:mt-[127px] mt-[128px] xs:mt-[125px] text-center`}>
                  <ul className='text-white'>
                    <li onClick={() => handleTextChange('Finished')} className={dropText === 'Finished' ? `hidden` : `` + ` border-y-2 hover:bg-[#4f5aa3] p-2 w-full`}>Finished</li>
                    <li onClick={() => handleTextChange('To-Read')} className={dropText === 'To-Read' ? `hidden` : `border-t-2` + ` border-b-2 hover:bg-[#4f5aa3] p-2 w-full`}>To-Read</li>
                    <li onClick={() => handleTextChange('Add to a List')} className={((dropText === 'Finished' || dropText === 'To-Read') ? ` ` : `hidden`) + ` border-b-2 hover:bg-[#4f5aa3] p-2 w-full`}>Remove</li>
                  </ul>
                </section>
              </section>
            </div>
            <div className="flex flex-nowrap w-[100px] md:gap-2 justify-around ">
              <div onClick={toggleLike}>
                {
                  likePref === 'like' ?
                    <Image src={activeLike} alt='like active' width={45} height={45} className='w-[45px]' />
                    :
                    <Image src={like} alt='active' width={45} height={45} className='w-[45px]' />
                }
              </div>
              <div onClick={toggleDislike}>
                {
                  likePref === 'dislike' ?
                    <Image src={activeDislike} alt='like active' width={45} height={45} className='w-[45px]' />
                    :
                    <Image src={dislike} alt='active' width={45} height={45} className='w-[45px]' />
                }
              </div>
            </div>
          </div>
          <div className='h-[50px] bg-primary rounded-md flex items-center justify-center'>
            <section className='norm:text-4xl md:text-3xl sm:text-2xl text-3xl xs:text-2xl text-black' name="libraries" id="libraries">
              Libraries
            </section>
          </div>
          <div className='my-3 text-primary font-bold 2xl:text-3xl xl:text-2xl lg:text-lg sm:text-base text-lg'>
            <div className='flex justify-between'>
              <div>ISBN: </div>
              <div className='text-right text-white font-normal'>{book.isbn}</div>
            </div>
            <div className='flex justify-between'>
              <div>Publisher: </div>
              <div className='text-right text-white font-normal'>{book.publishName}</div>
            </div>
            <div className='flex justify-between'>
              <div>Length: </div>
              <div className='text-right text-white font-normal'>{book.length}</div>
            </div>
            <div className='flex justify-between'>
              <div>Format:</div>
              <div className='text-right text-white font-normal'>{book.format}</div>
            </div>
            <div className='flex justify-between'>
              <div>Language:</div>
              <div className='text-right text-white font-normal'>{book.language}</div>
            </div>
            <div className='flex justify-between'>
              <div>Publish Date:</div>
              <div className='text-right text-white font-normal'>{new Date(book.publishDate).toDateString()}</div>
            </div>
          </div>
          <button className='bg-secondary w-full py-2 rounded-md text-2xl'>
            Add to Cart
          </button>
        </div>
        <hr className='sm:hidden block my-5 w-[80%] mx-auto'/>
        <div className='2xl:w-[400px] xl:w-[375px] lg:w-[300px] norm:w-[350px] md:w-[275px] sm:w-[150px] w-[300px] xs:w-[200px]'>
          <h2 className='text-primary font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl norm:text-4xl md:text-3xl sm:text-2xl text-3xl'>Feel</h2>
          <ul className='flex flex-col justify-around 2xl:text-3xl xl:text-2xl lg:text-xl norm:text-2xl md:text-xl sm:text-lg text-xl'>
            {Object.entries(book.reviewData.theme)
              .sort((a, b) => b[1] - a[1])
              .filter(([_, value]) => value > 10)
              .map(([key, value]) => (
                <li key={key} className='flex justify-between'>
                  <span className='font-bold capitalize'>{key}</span>  {value}
                </li>
              ))}
          </ul>
        </div>
        <hr className='lg:hidden block my-5 w-[80%] mx-auto'/>
        <div className='2xl:w-[400px] xl:w-[375px] lg:w-[300px] norm:w-[350px] md:w-[275px] sm:w-[215px] w-[160px] xs:w-[200px]' >
          <h2 className='text-primary font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl norm:text-4xl md:text-3xl sm:text-2xl text-3xl mb-5'>Tags</h2>
          <div className='flex flex-wrap gap-2 justify-evenly'>
            {
              (book.genre)
                .map((tag) => (
                  <div className='bg-secondary rounded-3xl capitalize  p-3 2xl:text-3xl xl:text-2xl lg:text-xl norm:text-2xl md:text-xl sm:text-lg text-base' key={tag}>{tag}</div>
                ))
            }
          </div>
        </div>
        <hr className='hidden xs:block my-5 w-[80%] mx-auto'/>
        <div className='2xl:w-[400px] xl:w-[375px] lg:w-[300px] norm:w-[350px] md:w-[275px] sm:w-[215px] w-[160px] xs:w-[200px]'>
          <h2 className='text-primary font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl norm:text-4xl md:text-3xl sm:text-2xl text-3xl mb-5'>Pace</h2>
          <ul className='flex justify-evenly flex-col gap-5'>
            {Object.entries(book.reviewData.pace)
              .sort((a, b) => b[1] - a[1])
              .filter(([_, value]) => value > 0)
              .map(([key, value]) => (
                <li className='flex justify-between items-center 2xl:text-3xl xl:text-2xl lg:text-xl norm:text-2xl md:text-xl sm:text-lg text-base' key={key}>
                  <span className='bg-secondary rounded-3xl capitalize 2xl:w-[225px] xl:w-[200px] lg:w-[175px] norm:w-[200px] md:w-[175px] sm:w-[150px] w-[100px] xs:w-[125px] text-center p-3 '>{key}</span>  {value}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <hr className=' my-5 w-[80%] mx-auto'/>
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