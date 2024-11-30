'use client'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { useRouterContext } from '../../../../../utils/RouterContext';

function Cart() {

    const [cart, setCart] = useState([]);
    const [confirmBook, setConfirmBook] = useState([]);
    const router = useRouterContext();


    const handleCheck = (bookId, isChecked) => {
        if (isChecked) {
            setConfirmBook((prev) => [...prev, bookId]);
        } else {
            setConfirmBook((prev) => prev.filter((id) => id !== bookId))
        }
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
        <div className='flex gap-2'>
            <div className="border-secondary rounded-[5px] border-2 p-2 w-[48%] min-w-[300px] mb-6">
                <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">Cart</h1>
                <div className="flex flex-col">
                    {(cart && cart.length > 0) ? (
                        <div>
                            {cart.map(item => (
                                <div className="flex flex-row justify-between items-start" key={item.bookInfo._id}>
                                    <div className="flex flex-row">
                                        <div className="mr-4 ml-4 mb-4 xl:w-[180px] xl:h-[220px] lg:w-[250px] lg:h-[350px] md:w-[260px] md:h-[350px] w-[200px] h-[300px]">
                                            <img src={item.bookInfo.imgUrl} alt={item.bookInfo.tite} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-primary text-[32px]">{item.bookInfo.title}</h2>
                                            <h3 className="text-white text-[22px]">{item.bookInfo.author}</h3>
                                            <h4 className="text-white text-[22px]">{item.bookInfo.genre[0]}</h4>
                                            <div className='flex justify-between'>
                                                <h4 className="text-white text-[22px]">{item.libraryInfo.name}</h4>
                                                {item.isMember ? (
                                                    <h4 className="text-white text-[22px]">green tick</h4>
                                                ) : (
                                                    <h4 className="text-white text-[22px]">red cross</h4>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="m-2 w-6 h-6 appearance-none border-2 border-primary checked:bg-primary checked:before:content-['✓'] checked:before:text-black checked:before:block checked:before:text-center"
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

                    }

                </div>
            </div>
            <div className="border-secondary rounded-[5px] border-2 p-2 h-[65%]">
                <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">Cart Summary</h1>
                <div>
                    <div className='border-secondary p-2 border-solid border-[1px]'>
                        number of books: {cart.length}
                    </div>
                    <div className='border-secondary p-2 border-solid border-[1px]'>
                        <button className='bg-primary text-background' onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart