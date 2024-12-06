'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import search from '../images/search.png'
import dashboard from '../images/dashboard.png'
import cart from '../images/cart.png'
import preferences from '../images/preferences.png'
import signOutIcon from '../images/signOut.png'
import { OrganizationSwitcher, SignInButton, SignedIn, useClerk, SignedOut, UserButton, useUser, useOrganizationList, useOrganization, OrganizationList, SignOutButton } from '@clerk/nextjs'
import { useRouterContext } from "../utils/RouterContext";


export default function Navbar() {
    const router = useRouterContext();
    const { organization } = useOrganization();
    const { signOut } = useClerk()
    const { user, isLoaded, isSignedIn } = useUser();
    const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const handleDashboardRedirect = () => {
        if (user) {
            router.push(`/user/dashboard/${user.id}`);
        }
    };

    const handlePreferencesRedirect = () => {
        if (user) {
            router.push(`/user/profile/preferences/${user.id}`)
        }
    }

    const handleLinkCartClick = () => {
        router.push(`/user/orders/cart/${user.id}`)
    }

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

            const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&limit=6`);
            const data = await res.json();
            setResults(data.books);
        };

        const timeoutId = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleLinkClick = () => {
        router.push(`/browse/books/search/results?search=${encodeURIComponent(query)}`)
        setQuery('');
        setResults([]);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            router.push(`/browse/books/search/results?search=${encodeURIComponent(query)}`)
            setIsFocus(false)
            setQuery('');
            setResults([]);

        }
    }

    const handleBookClick = (path) => {
        router.push(path);
    }

    const handleLogoClick = () => {
        router.push('/')
    }

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const hasRefreshed = sessionStorage.getItem('hasRefreshed');
            if (!hasRefreshed) {
                sessionStorage.setItem('hasRefreshed', 'true')
                window.location.reload()
            }
        }
    }, [isLoaded, isSignedIn]);

    return (
        <nav>
            <div className='nav-logo'>
                <div onClick={() => { handleLogoClick() }} className='cursor-pointer'>
                    <Image src={logo} alt='logo' />
                </div>
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
                        onKeyDown={handleEnter}
                    />
                </div>
                {isFocus &&
                    <div className={` ${results.length ? '' : 'hidden'} absolute z-10 bg-background rounded-md w-11/12 mx-auto mb-9 border-primary search-list`}>
                        {results.map((book) => (
                            <div onClick={() => handleBookClick(`/books/${book._id}`)} key={book._id} className='cursor-pointer hover:bg-loading flex m-2 pb-2'>
                                <img src={book.imgUrl} className='search-img' alt={book.title} />
                                <div className='flex flex-col pl-2'>
                                    <span className='font-bold'>{book.title}</span>
                                    <span className='font-light'>{book.author}</span>
                                    <span className={`${book.isbn ? '' : 'hidden'} font-light`}>ISBN: {book.isbn} </span>
                                </div>
                            </div>
                        ))
                        }
                        <div className='text-center py-2 '>
                            <span className='cursor-pointer hover:text-secondary' onClick={handleLinkClick}>View All The Books</span>
                        </div>
                    </div>
                }


            </div>
            {(user && !organization) && (
                <div onClick={handleLinkCartClick} className='h-12 w-[8%] flex justify-center items-center xs:h-9 cursor-pointer bg-primary rounded-md'>
                    <Image src={cart} alt='cart' className='w-[75%] max-w-[36px]' />
                </div>
            )
            }
            {orgsLoaded && userMemberships.data && userMemberships.data.length > 0 ? (
                <div className='nav-user p-1'>
                    <div className='bg-background rounded-md'>
                        <OrganizationSwitcher hidePersonal={true}>
                            <OrganizationSwitcher.OrganizationProfileLink
                                label="Dashboard"
                                url={`/library/inventory/${organization.id}`}
                                labelIcon={<Image src={dashboard} alt="Dashboard Icon" width={20} height={20} />}
                            />
                            <OrganizationSwitcher.OrganizationProfileLink
                                label="Preferences"
                                url={`/library/profile/${organization.id}`}
                                labelIcon={<Image src={preferences} alt="Dashboard Icon" width={20} height={20} />}
                            />
                            <OrganizationSwitcher.OrganizationProfilePage
                                label="Sign Out"
                                url="custom"
                                labelIcon={<Image src={signOutIcon} alt="Dashboard Icon" width={20} height={20} />}
                            >
                                <button onClick={() => signOut({ redirectUrl: '/' })}>
                                    Sign Out
                                </button>
                            </OrganizationSwitcher.OrganizationProfilePage>
                        </OrganizationSwitcher>
                        <SignedOut>
                            <SignInButton>
                                <button className='text-lg'>Sign In</button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            ) : (
                <div className='nav-user2 p-1'>
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
                            <button className='text-lg xs:text-base'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            )}
        </nav>
    )
}
