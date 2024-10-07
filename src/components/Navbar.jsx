'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import search from '../images/search.png'
import dashboard from '../images/dashboard.png'
import preferences from '../images/preferences.png'
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { useRouterContext } from "../utils/RouterContext";


export default function Navbar() {
    const router = useRouterContext();
    const { user } = useUser();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    // 

    const handleDashboardRedirect = () => {
        if (user) {
        router.push(`/user/dashboard/${user.id}`);
        }
    };

    const handlePreferencesRedirect = () => {
        if(user) {
            router.push(`/user/profile/preferences/${user.id}`)
        }
    }

    const handleFocus = () => {
        setIsFocus(true);
    }
    const handleBlue = () => {
        setTimeout(() => {
            setIsFocus(true);
        }, 225)
    }


    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setResults([]);
                return;
            }

            const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
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
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="Dashboard"
                                labelIcon={<Image src={dashboard} alt="Dashboard Icon" width={20} height={20} />}
                                onClick={handleDashboardRedirect}
                            />
                        </UserButton.MenuItems>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="Preferences"
                                labelIcon={<Image src={preferences} alt="Preferences Icon" width={20} height={20} />}
                                onClick={handlePreferencesRedirect}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <button className='text-lg'>Sign In</button>
                    </SignInButton>
                </SignedOut>
                </ul>

        </nav>
    )
}
