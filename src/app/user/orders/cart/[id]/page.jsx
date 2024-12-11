'use client'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { useRouterContext } from '../../../../../utils/RouterContext';
import checkicon from "../../../../../images/green_check_two.png";
import xicon from "../../../../../images/red_x_two.png";
import Image from 'next/image';
import Loading from './loading.jsx'

function Cart() {

    const [cart, setCart] = useState(null);
    const [confirmBook, setConfirmBook] = useState([]);
    const router = useRouterContext();


    const handleCheck = (bookId, isChecked) => {
        if (isChecked) {
            setConfirmBook((prev) => [...prev, bookId]);
        } else {
            setConfirmBook((prev) => prev.filter((id) => id !== bookId))
        }
    }

    const handleRoute = (path) => {
        router.push(path);
    }

    const { user } = useUser();
    const getCart = async () => {
        if (user) {
            try {
                const id = user.id;
                const res = await fetch('/api/cart', {
                    method: 'GET',
                    headers: {
                        'userId': id
                    }
                })

                if (!res.ok) {
                    throw new Error('Error getting the user cart')
                }

                const data = await res.json();
                setCart(data);
            } catch (err) {
                console.log("Error getting user cart", err);
            }

        }
    }

    const handleCheckout = () => {
        const filteredBooks = cart.filter(item => confirmBook.includes(item.bookInfo._id) && item.isMember);

        const groupedBooks = filteredBooks.reduce((acc, item) => {
            if (!acc[item.libraryInfo._id]) {
                acc[item.libraryInfo._id] = [];
            }
            acc[item.libraryInfo._id].push(item);
            return acc;
        }, {});

        sessionStorage.setItem('groupedBooks', JSON.stringify(groupedBooks));
        router.push(`/user/orders/checkout/${user.id}`);
    }

    useEffect(() => {
        getCart();
    }, [user]);




    return (
        <div className='flex gap-2 w-[90%] mx-auto'>
            <div className="border-secondary rounded-[5px] border-2 p-2 w-[60%] min-w-[300px] mb-6 h-[600px] overflow-y-scroll">
                <h1 className="text-[36px] text-primary mr-4 ml-4 mt-4 mb-2">Cart</h1>
                <div className="flex flex-col">
                    {(cart) ? (
                        cart.length > 0 ? (
                            <div>
                                {cart.map(item => (
                                    <div className="flex flex-row justify-between items-start p-1 transition-transform duration-300 hover:scale-[1.01] hover:bg-loading" key={item.bookInfo._id}>
                                        <div className="flex flex-row w-[90%] gap-2">
                                            <div className=" xl:w-[180px] lg:w-[250px] md:w-[260px] w-[200px] ">
                                                <img src={item.bookInfo.imgUrl} alt={item.bookInfo.tite} />
                                            </div>
                                            <div className="flex flex-col w-[60%]">
                                                <h2 className="text-primary text-[32px] cursor-pointer" onClick={() => { handleRoute(`/books/${item.bookInfo._id}`) }}>{item.bookInfo.title}</h2>
                                                <h3 className="text-white text-[22px]">{item.bookInfo.author}</h3>
                                                <h4 className="text-white text-[22px]">{item.bookInfo.genre[0]}</h4>
                                                <div className='flex justify-between items-center w-[75%]'>
                                                    <h4 className="text-white text-[22px]">{item.libraryInfo.name}</h4>
                                                    {item.isMember ? (
                                                        <Image src={checkicon} alt='tick' className="w-[20px] h-[20px]" />
                                                    ) : (
                                                        <Image src={xicon} alt='cross' className="w-[20px] h-[20px]" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="m-2 w-6 h-6 appearance-none border-2 cursor-pointer border-primary checked:bg-primary checked:before:content-['✓'] checked:before:text-black checked:before:block checked:before:text-center"
                                            onChange={(e) => handleCheck(item.bookInfo._id, e.target.checked)}
                                        />
                                    </div>
                                ))

                                }
                            </div>
                        ) : (
                            <div>
                                Cart is empty
                            </div>

                        )

                    ) : (
                        <div>
                            <Loading />
                        </div>
                    )

                    }

                </div>
            </div>
            <div className="border-secondary rounded-[5px] border-2 p-2 h-[65%] w-[30%] ml-auto mr-auto">
                <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">Cart Summary</h1>
                <div>
                    <div className='border-secondary p-2 border-solid border-[1px] text-[20px]'>
                        Number of books: {cart ? cart.length : '0'}
                    </div>
                    <div className='mt-4'>
                        <button className='bg-primary rounded-md px-4 py-2 text-background text-[15px] transition-transform duration-300 hover:scale-[1.05]' onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart