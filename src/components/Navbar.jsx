'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import dropdown from '../images/dropdown.png'
import search from '../images/search.png'
import profile from '../images/profile.png'
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = () => {
        setIsFocus(true);
    }
    const handleBlue = () => {
        setTimeout(() => {
            setIsFocus(false);
        }, 225)
    }


    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setResults([]);
                return;
            }

            const res = await fetch(`../api/search?query=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data);
        };

        const timeoutId = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <nav>
            <div className='nav-logo'>
                <a href="/">
                    <Image src={logo} alt='logo' />
                </a>
            </div>
            <div className='nav-search-bar relative'>
                <div className='nav-search'>
                    {!isFocus && <Image src={search} alt='search' id='search-icon' />}
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlue}
                    />
                </div>
                {isFocus &&
                    <div className={` ${results.length ? '' : 'hidden'} absolute z-10 bg-background rounded-md w-11/12 mx-auto mb-9 border-primary search-list`}>
                        {results.map((book) => (
                            <a href={`/books/${book._id}`} key={book._id} className='flex m-2 pb-2'>
                                <img src={book.imgUrl} className='search-img' alt={book.title} />
                                <div className='flex flex-col pl-2'>
                                    <span className='font-bold'>{book.title}</span>
                                    <span className='font-light'>{book.author}</span>
                                    {/* <span className='font-light'>{book._id}</span> */}
                                    <span className={`${book.isbn ? '' : 'hidden'} font-light`}>ISBN: {book.isbn} </span>
                                </div>
                            </a>

                        ))
                        }
                    </div>
                }


            </div>
            <ul className='nav-user p-1'>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                </ul>

        </nav>
    )
}
