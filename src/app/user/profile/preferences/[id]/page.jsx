'use client'
import React, { useEffect, useState } from 'react'
import edit from '../../../../../images/edit-pen.png'
import drop from '../../../../../images/drop-white.png'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Error from 'next/error'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading.jsx'


function Preferences() {

  const [stAdd, setStAdd] = useState('');
  const [cityAdd, setCityAdd] = useState('');
  const [stateAdd, setStateAdd] = useState('');
  const [zipAdd, setZipAdd] = useState('');
  const { user } = useUser();
  const [cardNumber, setCardNumber] = useState('');
  const [cardN, SetCardN] = useState(null);
  const [editAdd, setEditAdd] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [cards, setCards] = useState();
  const [library, setLibrary] = useState('Libraries');
  const [libId, setLibId] = useState(null);

  const [libraries, setLibraries] = useState([]);

  const getLibrary = async () => {
    try {
      const res = await fetch('/api/libraries', {
        method: 'GET',
      })

      if (!res.ok) {
        throw new Error("Failed to get review")
      }

      const data = await res.json();
      console.log(data.libs);
      setLibraries(data.libs)

    } catch (err) {
      console.log("Error getting Cards", err);
    }
  }

  const getLibCards = async () => {
    try {
      const res = await fetch('/api/libCards', {
        method: 'GET',
        headers: {
          'userId': user.id,
        }
      })

      if (!res.ok) {
        throw new Error("Failed to get review")
      }

      const data = await res.json();
      console.log(data.userCards);
      setCards(data.userCards);

    } catch (err) {
      console.log("Error getting Cards", err);
    }
  }

  const handleEdit = () => {
    setEditAdd(!editAdd);
  }

  const handleCancel = () => {
    setEditAdd(false);
    getAddress();
    toast.info('Cancel Address Changes');
  }

  const changeAddress = async () => {
    try {
      const res = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          street: stAdd,
          state: stateAdd,
          city: cityAdd,
          zip: zipAdd
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Failed to update the Address');
        toast.error('Failed Address Changes');
      } else {
        toast.success('Address Changes successfully');
        setEditAdd(false);

      }
    } catch (err) {
      console.error('Error changing address:', err);
      toast.error('Failed Address Changes');

    }
  }

  const handleAddCard = async () => {
    try {
      const userId = user.id;
      const res = await fetch('/api/libCards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, libId, cardNumber}),
      })

      const data = await res.json();
      setAddCard(false);
      getLibCards();
      if (!data.success) {
        console.error('Failed to Add Card');
        toast.error('Failed to Add Library Card');
      } else {
        toast.success('Library Card Successfully Added');
        setEditAdd(false);
      }
    } catch (err) {
      console.log("Error getting address", err);
      toast.error('Failed to Add Library Card');
    }

  }
  const getAddress = async () => {
    try {
      const res = await fetch('/api/address', {
        method: 'GET',
        headers: {
          'userId': user.id
        }
      })

      if (!res.ok) {
        throw new Error('Error getting the user Address')
      }

      const data = await res.json();
      setCityAdd(data.address.city);
      setStAdd(data.address.street);
      setZipAdd(data.address.zip);
      setStateAdd(data.address.state);

    } catch (err) {
      console.log("Error getting address", err);
    }
  }

  useEffect(() => {
    if (user && user.id) {
      getAddress();
      getLibCards();
      getLibrary();
    }
  }, []);


  return (
    <div className='2xl:w-[1400px] xl:w-[1200px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] mx-auto'>
      <h1 className='text-2xl ml-5 text-White'>
        My Preferences
      </h1 >
      <div className='border-secondary rounded-md border-[1px] my-5 p-4 flex justify-between'>
        <div className='mt-4 2xl:w-[850px] xl:w-[750px] lg:w-[600px] norm:w-[425px] md:w-[325px] sm:w-[250px] w-[175px] xs:w-[160px]'>
          <div className='mb-10'>
            <h2 className='text-primary text-4xl'>Address</h2>
            <div>
              <div className='flex items-end mb-5'>
                <div className='flex flex-col'>
                  Street Address
                  <input type="text" className='outline-none bg-secondary p-1 w-[427px]' value={stAdd} onChange={(e) => { setStAdd(e.target.value) }} />
                </div>
                <Image src={edit} alt='edit' width={32} height={32} onClick={handleEdit} className='cursor-pointer transition-transform duration-300 hover:scale-[1.1]' />
              </div>
              <div className='flex justify-start gap-3'>
                <div className='flex flex-col'>
                  City
                  <input type="text" className='outline-none bg-secondary p-1 w-[200px]' value={cityAdd} onChange={(e) => { setCityAdd(e.target.value) }} />
                </div>
                <div className='flex flex-col'>
                  State
                  <div className='w-[120px] flex items-center bg-secondary'>
                    <input type="text" className='outline-none bg-secondary p-1 w-[99%]' value={stateAdd} onChange={(e) => { setStateAdd(e.target.value) }} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  Zip
                  <input type="text" className='outline-none bg-secondary p-1 w-[115px]' value={zipAdd} onChange={(e) => { setZipAdd(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className={(editAdd ? ' ' : 'hidden') + ` mt-3 gap-4 flex`}>
              <button onClick={changeAddress} className='bg-primary w-[100px] px-3 rounded-md py-2 text-background transition-transform duration-300 hover:scale-[1.01]'>Save</button>
              <button className='bg-red-600 px-3 w-[100px] rounded-md py-2 text-background transition-transform duration-300 hover:scale-[1.01]' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
          <div>
            <h2 className='text-primary text-4xl'>Library Card</h2>
            <div className='  w-[1000px] overflow-x-auto no-scrollbar'>
              {cards ? (
                cards.length > 0 ? (
                  <div className='flex gap-3'>
                    {cards.map((card, index) => (
                      <div key={index}>
                        {card.library && (
                          <div className='border-secondary w-[250px] border-[1px] p-2 rounded-md'>
                            <div>
                              <div>
                                <div>
                                  <span className='text-primary'>Location:</span> {card.library.address.street}, {card.library.address.city}, {card.library.address.state}, {card.library.address.zip}
                                </div>
                                <div>
                                  <span className='text-primary'>Name:</span> {card.library.name}
                                </div>
                              </div>
                            </div>
                            <h2><span className='text-primary'>ID:</span> #{card.cardId}</h2>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    No Library Cards
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
          <div className='my-2 rounded-md text-background cursor-pointer'>
            <button onClick={() => { setAddCard(true) }} className='bg-primary rounded-md p-2 mb-4 transition-transform duration-300 hover:scale-[1.01]'>
              Add Library Card
            </button>
            <div className={(addCard ? '' : 'hidden') + ` flex justify-center items-center gap-2`}>
              <input
                type="text"
                className="border-solid border-[1px] border-primary bg-transparent text-white text-[18px] p-1 w-[200px]"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value);
                }}
              />
              <div>
                <select
                  className="border-solid border-[1px] border-primary bg-transparent text-white text-[18px] p-1 w-[200px]"
                  placeholder="Library"
                  value={library}
                  onChange={(e) => {
                    const selectedLibrary = libraries.find(lib => lib.name === e.target.value);
                    setLibrary(e.target.value);
                    setLibId(selectedLibrary?._id); // Set the libId based on the selected library
                  }}
                >
                  {libraries.map(lib => (
                    <option className="bg-background" value={lib.name} key={lib._id}>
                      {lib.name}
                    </option>
                  ))
                  }
                </select>
              </div>
              <div>
                <button onClick={handleAddCard} className='bg-primary rounded-md mt-2 p-2 mb-4 transition-transform duration-300 hover:scale-[1.01]'>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preferences