'use client'
import React, { useEffect, useState } from 'react'
import Pagination from '../../../browse/books/search/results/Pagination.jsx'
import { useParams } from 'next/navigation';
import rated from '../../../../images/rated_star.png';
import Image from 'next/image';




function BookReview() {

    const { id } = useParams();
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState('');
    const limit = 25;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/bookReview', {
                    method: 'GET',
                    headers: {
                        'bookId': id,
                        'limit': 5,
                        'page': currentPage,
                    }
                })

                if (!res.ok) {
                    throw new Error("Failed to get review")
                }

                const { bookReview, totalCount, bookTitle } = await res.json();
                setResults(bookReview);
                setTotalCount(totalCount);
                setTitle(bookTitle);
            } catch (err) {
                console.error(err)
            }
        }

        fetchReviews();
    }, [currentPage])

    return (
        <div>
            <h1 className='text-primary text-center sm:text-2xl text-xl'>Review For: '{title}'</h1>
            {results ? (
                <div>
                    {results.map((review) => (
                        <div className='border-secondary border-[1px] p-2 rounded-md m-2' key={review._id}>
                            <div className='flex justify-between'>
                                <div className='flex gap-2 items-center justify-center'>
                                    <h2 className='text-primary capitalize'>{review.authorId.username}</h2>
                                    {
                                        Array.from({ length: review.rating }, ( _, index) => (
                                            <div key={index}>
                                                <Image
                                                    src={rated}
                                                    alt="star"
                                                    width={15}
                                                    height={15}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <h2>{new Date(review.createdAt).toLocaleDateString()}</h2>
                            </div>
                            <h2 className='text-secondary text-xl'>{review.title}</h2>
                            <h2>{review.description}</h2>

                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    No Reviews
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                limit={limit}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default BookReview