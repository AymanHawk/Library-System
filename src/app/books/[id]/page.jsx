'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image';

function Books() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`/api/bookID/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setBook(data);
          }
        })
        .catch((err) => setError('Error'))
    }
  }, [id])

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
          <select className='lib-dropdown' name="libraries" id="libraries">
            <option value="lib-default" disabled selected> Libraries</option>
            <option value="lib-1"> Library 1 </option>
            <option value="lib-2"> Library 2 </option>
            <option value="lib-3"> Library 3 </option>
          </select>
          <div>
            <div>ISBN: </div>
            <div>{book.isbn}</div>
          </div>
          <div>
            <div>Publisher: </div>
            <div>{book.publishName}</div>
          </div>
          <div>
            <div>Length: </div>
            <div>{book.length}</div>
          </div>
          <div>
            <div>Format:</div>
            <div>{book.format}</div>
          </div>
          <div>
            <div>Language:</div>
            <div>{book.language}</div>
          </div>
          <div>
            <div>Publish Date:</div>
            <div>{new Date(book.publishDate).toDateString()}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className='book-mid-div'>
        <div className='book-bott-left'>
          <select className='lib-dropdown' name="libraries" id="libraries">
            <option value="lib-default" disabled selected> Libraries</option>
            <option value="lib-1"> Library 1 </option>
            <option value="lib-2"> Library 2 </option>
            <option value="lib-3"> Library 3 </option>
          </select>
          <div>
            <div>ISBN: </div>
            <div>{book.isbn}</div>
          </div>
          <div>
            <div>Publisher: </div>
            <div>{book.publishName}</div>
          </div>
          <div>
            <div>Length: </div>
            <div>{book.length}</div>
          </div>
          <div>
            <div>Format:</div>
            <div>{book.format}</div>
          </div>
          <div>
            <div>Language:</div>
            <div>{book.language}</div>
          </div>
          <div>
            <div>Publish Date:</div>
            <div>{new Date(book.publishDate).toDateString()}</div>
          </div>
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
                  <div>{tag}</div>
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
      <div>
        reviews
      </div>
    </div>
  )
}

export default Books