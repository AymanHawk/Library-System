'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

function ReadList() {

  const { user } = useUser();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch('/api/bookList/user/one', {
          method: 'GET',
          headers: {
            'userId': user.id,
            'reqList': 'readBooks'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to get read list');
        }

        const data = await response.json();
        setList(Object.values(data.list));
      } catch (err) {
        console.log(err);
      }
    };

    if (user && user.id) {
      fetchList();
    }
  }, [user])

  return (
    <div>
      <div className='flex'>
        {list.map((book) => (
          <div key={book.id} className=''>
            <Image src={book.imgUrl} alt={book.id} width={50} height={60} className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28" />
          </div>
        ))
        }
      </div>

    </div>
  )
}

export default ReadList