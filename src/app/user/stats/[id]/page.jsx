'use client'
import React, { use, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";
import { useUser } from '@clerk/nextjs';
import drop from "../../../../images/dropdown.png"
import Image from 'next/image';
import BubbleChart from '../statsComponents/BubbleCharts';


function Stats() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const { isLoaded, user } = useUser();
  const [list, setList] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState('2024');
  const [listDrop, setListDrop] = useState(false);
  const [monthDrop, setMonthDrop] = useState(false);
  const [yearDrop, setYearDrop] = useState(false);
  const listRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [stats, setStats] = useState([]);
  const [monthNum, setMonthNum] = useState(null);
  const [bookList, setBookList] = useState(null);
  const [themeData, setThemeData] = useState([]);

  const toggleListDrop = () => {
    setListDrop(!listDrop);
  }

  const handleListSelect = (list) => {
    setList(list);
    setListDrop(false);
    setBookList(listToBooks(list));
  }

  const hangleYearSelect = (year) => {
    setYear(year);
    setYearDrop(false);
  }



  const handleMonthSelect = (month) => {
    setMonth(month);
    setMonthDrop(false);
    setMonthNum(month === 'Whole Year' ? null : monthToNum(month));
  }
  const monthToNum = (month) => {
    const months = {
      'January': '1', 'February': '2', 'March': '3',
      'April': '4', 'May': '5', 'June': '6',
      'July': '7', 'August': '8', 'September': '9',
      'October': '10', 'November': '11', 'December': '12'
    };
    return months[month] || null;
  }

  const listToBooks = (list) => {
    const lists = {
      'Read Books': 'readBooks', 'To-Read Books': 'toReadBooks', 'Liked Books': 'likedBooks', 'Rented Books': 'rentedBooks'
    };
    return lists[list] || null;
  }

  const toggleYearDrop = () => {
    setYearDrop(!yearDrop)
  }

  const toggleMonthDrop = () => {
    setMonthDrop(!monthDrop)
  }

  const getMonthStat = async () => {
    if (!monthNum || !list) return;
    try {

      console.log(user.id, monthNum, year, list);
      const response = await fetch('/api/stat/user/singleListMonth', {
        method: 'GET',
        headers: {
          'userId': user.id,
          'month': monthNum,
          'year': year,
          'statList': bookList,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get the montly stat');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  }

  const getYearStat = async () => {
    try {
      console.log(user.id, year, list);
      const response = await fetch('/api/stat/user/singleListYear', {
        method: 'GET',
        headers: {
          'userId': user.id,
          'year': year,
          'statList': bookList,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get the yearly stat');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  }

  const getStats = () => {
    if (year === 'All Time') {
      setMonth(null)
      console.log('Have to make a route');
    } else if (month === 'Whole Year') {
      getYearStat();
    } else {
      getMonthStat();
    }
  }

  useEffect(() => {
    if (list && year && month && isLoaded && user) {
      getStats();

    }
  }, [list, year, month, isLoaded, user])
  useEffect(() => {
    console.log(stats);
    if (month === 'Whole Year') {
      setThemeData(stats.length > 0 ? stats[0].totalTheme: []);
    } else {
      setThemeData(stats.themeRead);
    }
  }, [stats])



  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className='flex flex-col'>
        <div className='mx-auto flex flex-row gap-4'>
          <div className='flex items-center gap-3'>
            <span>View Stats: </span>
            <span onClick={toggleListDrop} ref={listRef} className='flex text-nowrap relative bg-secondary text-white w-[100px] p-2 h-[50px] justify-between items-center'>{list || 'List'} <Image src={drop} alt='dropdown' height={15} width={10} />
              <ul className={(listDrop ? `` : `hidden`) + ` text-nowrap absolute bg-secondary mt-[160px] h-[135px] overflow-y-auto no-scrollbar`}>
                <li onClick={() => handleListSelect('Read Books')}>Read Books</li>
                <li onClick={() => handleListSelect('To-Read Books')}>To-Read Books</li>
                <li onClick={() => handleListSelect('Liked Books')}>Liked Books</li>
                <li onClick={() => handleListSelect('Rented Books')}>Rented Books</li>
              </ul>
            </span>
          </div>
          <div className='flex items-center gap-4'>
            <span onClick={toggleYearDrop} ref={yearRef} className='flex relative bg-secondary text-white w-[100px] p-2 h-[50px] justify-between items-center'>{year || 'Year'} <Image src={drop} alt='dropdown' height={15} width={10} />
              <ul className={(yearDrop ? `` : `hidden`) + ` absolute bg-secondary mt-[160px] h-[135px] overflow-y-auto no-scrollbar`}>
                <li onClick={() => hangleYearSelect('All Time')}>All Time</li>
                <li onClick={() => hangleYearSelect('2024')}>2024</li>
                <li onClick={() => hangleYearSelect('2023')}>2023</li>
                <li onClick={() => hangleYearSelect('2022')}>2022</li>
                <li onClick={() => hangleYearSelect('2021')}>2021</li>
                <li onClick={() => hangleYearSelect('2020')}>2020</li>
                <li onClick={() => hangleYearSelect('2019')}>2019</li>
                <li onClick={() => hangleYearSelect('2018')}>2018</li>
                <li onClick={() => hangleYearSelect('2017')}>2017</li>
              </ul>
            </span>
            <span onClick={toggleMonthDrop} ref={monthRef} className='flex bg-secondary text-white w-[100px] p-2 h-[50px] justify-between items-center'>{month || 'Month'} <Image src={drop} alt='dropdown' height={15} width={10} />
              <ul className={(monthDrop ? `` : `hidden`) + ` absolute bg-secondary mt-[160px] h-[135px] overflow-y-auto no-scrollbar`}>
                <li onClick={() => handleMonthSelect('Whole Year')}>Whole Year</li>
                <li onClick={() => handleMonthSelect('January')}>January</li>
                <li onClick={() => handleMonthSelect('Feburary')}>Feburary</li>
                <li onClick={() => handleMonthSelect('March')}>March</li>
                <li onClick={() => handleMonthSelect('April')}>April</li>
                <li onClick={() => handleMonthSelect('May')}>May</li>
                <li onClick={() => handleMonthSelect('June')}>June</li>
                <li onClick={() => handleMonthSelect('July')}>July</li>
                <li onClick={() => handleMonthSelect('August')}>August</li>
                <li onClick={() => handleMonthSelect('September')}>September</li>
                <li onClick={() => handleMonthSelect('October')}>October</li>
                <li onClick={() => handleMonthSelect('November')}>November</li>
                <li onClick={() => handleMonthSelect('December')}>December</li>
              </ul>
            </span>
          </div>
        </div>
        <hr className='my-5 w-[80%] mx-auto' />
        <div>{
          stats.length === 0 ? <div>no data</div> :
            <div>
              {themeData && themeData.length > 0 ? (
                <BubbleChart themeData={themeData} />
              ) : (
                <div>No data available</div>
              )}
            </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Stats