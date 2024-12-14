'use client'
import React, { use, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";
import { useUser } from '@clerk/nextjs';
import drop from "../../../../images/drop-white.png"
import Image from 'next/image';
import BubbleChart from '../statsComponents/BubbleCharts';
import PieChart from '../statsComponents/PieChart';
import DonutChart from '../statsComponents/DonutChart';
import RadialBarChart from '../statsComponents/RadialBarChart';
import LineChart from '../statsComponents/LineChart'
import LineChartYear from '../statsComponents/LineChartYear'
import Loading from './loading.jsx'


function Stats() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const { isLoaded, user } = useUser();
  const [list, setList] = useState(null);
  const [month, setMonth] = useState('Month');
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
  const [genreData, setGenreData] = useState([]);
  const [paceData, setPaceData] = useState([]);
  const [monthPageData, setMonthPageData] = useState(null);
  const [yearPageData, setYearPageData] = useState([]);
  const [allPageData, setAllPageData] = useState([]);
  const [monthBookData, setMonthBookData] = useState(null);
  const [yearBookData, setYearBookData] = useState([]);
  const [allBookData, setAllBookData] = useState([]);
  const [loading, setLoading] = useState(false);


  const toggleListDrop = () => {
    setListDrop(!listDrop);
  }
  const handleClickOutside = (event) => {
    if (
      (listRef.current && !listRef.current.contains(event.target))
    ) {
      setListDrop(false);
    }
    if (monthRef.current && !monthRef.current.contains(event.target)) {
      setMonthDrop(false);
    }
    if (yearRef.current && !yearRef.current.contains(event.target)) {
      setYearDrop(false);
    }

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
  const months = {
    'January': '1', 'February': '2', 'March': '3',
    'April': '4', 'May': '5', 'June': '6',
    'July': '7', 'August': '8', 'September': '9',
    'October': '10', 'November': '11', 'December': '12'
  };


  const handleMonthSelect = (month) => {
    setMonth(month);
    setMonthDrop(false);
    setMonthNum(month === 'Whole Year' ? null : monthToNum(month));
  }

  const monthsName = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
      setLoading(true);
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
    } finally {
      setLoading(false)
    }
  }

  const getYearStat = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false)
    }
  }

  const getAllTimeStat = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stat/user/singleListAllTime', {
        method: 'GET',
        headers: {
          'userId': user.id,
          'statList': bookList,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get the All Time stat');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  const getStats = () => {
    if (year === 'All Time') {
      setMonth('Month')
      getAllTimeStat();
    } else if (month === 'Whole Year') {
      getYearStat();
    } else {
      getMonthStat();
    }
  }
  const emptyPieData = [{ genre: 'No Data', count: 1 }]
  const emptyBubbleData = [{ theme: 'No data', count: 1 }]
  const emptyDonutData = [{ pace: 'No data', count: 1 }]
  const emptyRadialBarData = 0;
  const emptyLineData = [{ data: 'No data', count: 1 }];


  useEffect(() => {
    if (list && year && month && isLoaded && user) {
      getStats();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [list, year, month, isLoaded, user])
  useEffect(() => {
    if (month === 'Whole Year' || year === 'All Time') {
      setThemeData(stats.length > 0 ? stats[0].totalTheme : []);
      console.log(stats);
      setGenreData(stats.length > 0 ? stats[0].totalGenre : []);
      setPaceData(stats.length > 0 ? stats[0].totalPace : []);
      if (month === 'Whole Year') {
        setYearBookData(stats.length > 0 ? stats[0].totalBooks : []);
        setYearPageData(stats.length > 0 ? stats[0].totalPages : []);
      } else if (year === 'All Time') {
        setAllBookData(stats.length > 0 ? stats[0].totalBooks : []);
        setAllPageData(stats.length > 0 ? stats[0].totalPages : []);
      }

    } else {
      setThemeData(stats.themeRead);
      setGenreData(stats.genreRead);
      setPaceData(stats.paceRead);
      setMonthBookData(stats.booksRead);
      setMonthPageData(stats.pagesRead);
      console.log(stats);

    }
  }, [stats]);

  if (loading) {
    return <Loading />
  }



  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className='flex flex-col'>
        <div className='mx-auto flex flex-row gap-4 flex-wrap justify-center items-center 2xl:text-4xl xl:text-3xl lg:text-2xl norm:text-xl sm:text-[20px]'>
          <span className='text-primary'>View Stats for: </span>
          <span onClick={toggleListDrop} ref={listRef} className='flex text-nowrap relative bg-secondary text-white 2xl:w-[250px] xl:w-[225px] lg:w-[200px] norm:w-[175px] sm:w-[175px] w-[140px] p-2 md:h-[50px] h-[40px] rounded-md justify-center gap-4 items-center'>
            {list || 'List'}
            <Image src={drop} alt='dropdown' height={15} width={15} className='md:block hidden' />
            <Image src={drop} alt='dropdown' height={10} width={10} className='md:hidden block' />
            <ul className={(listDrop ? `` : `hidden`) + ` text-nowrap absolute bg-slate-100 2xl:w-[250px] xl:w-[225px] lg:w-[200px] norm:w-[175px] sm:w-[175px] w-[140px] rounded-md md:mt-[205px] mt-[198px] text-center z-30 h-[150px] overflow-y-auto no-scrollbar`}>
              <li onClick={() => handleListSelect('Read Books')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>Read Books</li>
              <li onClick={() => handleListSelect('To-Read Books')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>To-Read Books</li>
              <li onClick={() => handleListSelect('Liked Books')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>Liked Books</li>
              <li onClick={() => handleListSelect('Rented Books')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>Rented Books</li>
            </ul>
          </span>

          <div className='flex sm:flex-row flex-col items-center gap-4'>
            <span onClick={toggleYearDrop} ref={yearRef} className='flex text-nowrap relative bg-secondary text-white 2xl:w-[250px] xl:w-[225px] lg:w-[200px] norm:w-[175px] sm:w-[175px] w-[100px] p-2 md:h-[50px] h-[40px] rounded-md justify-center gap-4 items-center'>
              {year || 'Year'}
              <Image src={drop} alt='dropdown' height={15} width={15} className='md:block hidden' />
              <Image src={drop} alt='dropdown' height={10} width={10} className='md:hidden block' />
              <ul className={(yearDrop ? `` : `hidden`) + ` absolute bg-slate-100 2xl:w-[250px] xl:w-[225px] lg:w-[200px] norm:w-[175px] sm:w-[175px] w-[100px] rounded-md md:mt-[205px] mt-[198px] text-center z-30 h-[150px] overflow-y-auto no-scrollbar`}>
                <li onClick={() => hangleYearSelect('All Time')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>All Time</li>
                <li onClick={() => hangleYearSelect('2024')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2024</li>
                <li onClick={() => hangleYearSelect('2023')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2023</li>
                <li onClick={() => hangleYearSelect('2022')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2022</li>
                <li onClick={() => hangleYearSelect('2021')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2021</li>
                <li onClick={() => hangleYearSelect('2020')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2020</li>
                <li onClick={() => hangleYearSelect('2019')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2019</li>
                <li onClick={() => hangleYearSelect('2018')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2018</li>
                <li onClick={() => hangleYearSelect('2017')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>2017</li>
              </ul>
            </span>
            <span onClick={toggleMonthDrop} ref={monthRef} className='flex text-nowrap relative bg-secondary text-white 2xl:w-[250px] xl:w-[225px] lg:w-[200px] norm:w-[175px] sm:w-[175px] w-[120px] p-2 md:h-[50px] h-[40px] rounded-md justify-center gap-4 items-center'>
              {month || 'Month'}
              <Image src={drop} alt='dropdown' height={15} width={15} className='md:block hidden' />
              <Image src={drop} alt='dropdown' height={10} width={10} className='md:hidden block' />
              <ul className={(monthDrop ? `` : `hidden`) + ` absolute bg-slate-100 2xl:w-[250px] xl:w-[225px] lg:w-[200px] norm:w-[175px] sm:w-[175px] w-[120px] rounded-md md:mt-[205px] mt-[198px] text-center z-30 h-[150px] overflow-y-auto no-scrollbar`}>
                <li onClick={() => handleMonthSelect('Whole Year')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>Whole Year</li>
                <li onClick={() => handleMonthSelect('January')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>January</li>
                <li onClick={() => handleMonthSelect('Feburary')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>Feburary</li>
                <li onClick={() => handleMonthSelect('March')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>March</li>
                <li onClick={() => handleMonthSelect('April')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>April</li>
                <li onClick={() => handleMonthSelect('May')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>May</li>
                <li onClick={() => handleMonthSelect('June')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>June</li>
                <li onClick={() => handleMonthSelect('July')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>July</li>
                <li onClick={() => handleMonthSelect('August')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>August</li>
                <li onClick={() => handleMonthSelect('September')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>September</li>
                <li onClick={() => handleMonthSelect('October')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>October</li>
                <li onClick={() => handleMonthSelect('November')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>November</li>
                <li onClick={() => handleMonthSelect('December')} className='text-secondary md:h-[50px] h-[40px] border-b-[1px] border-secondary content-center'>December</li>
              </ul>
            </span>
          </div>
        </div>
        <hr className='my-5 w-[80%] mx-auto border-primary' />
        <div >{
          stats.length === 0 ? (
            <div className='flex flex-wrap justify-center items-center text-center'>
              <div>
                <PieChart genreData={emptyPieData} />
                Genres Distribution
              </div>
              <div>
                <BubbleChart themeData={emptyBubbleData} />
                Themes Distibution
              </div>
              <div>
                <DonutChart paceData={emptyDonutData} />
                Pace Distribution
              </div>
              <div>
                <RadialBarChart avg={500} dataCall={emptyRadialBarData} call={'Pages'} />
                {list} Page vs Average
              </div>
              <div>
                <RadialBarChart avg={12} dataCall={monthBookData} call={'Books'} />
                {list} Book vs Average
              </div>
            </div>
          ) : (
            <div className='flex flex-wrap justify-center items-center text-center'>
              <div>
                {genreData && genreData.length > 0 ? (
                  <div className="">
                    <PieChart genreData={genreData} />
                    Genres Distribution
                  </div>
                ) : (
                  <div>
                    <PieChart genreData={emptyPieData} />
                    Genres Distribution
                  </div>
                )}
              </div>
              <div>
                {themeData && themeData.length > 0 ? (
                  <div className=''>
                    <BubbleChart themeData={themeData} />
                    Themes Distibution
                  </div>
                ) : (
                  <div>
                    <BubbleChart themeData={emptyBubbleData} />
                    Themes Distibution
                  </div>
                )}
              </div>
              <div>
                {paceData && paceData.length > 0 ? (
                  <div>
                    <DonutChart paceData={paceData} />
                    Pace Distribution
                  </div>
                ) : (
                  <div>
                    <DonutChart paceData={emptyDonutData} />
                    Pace Distribution
                  </div>
                )}
              </div>
              <div>
                {(month !== 'Whole Year' && year !== 'All Time') ? (
                  <div className='flex flex-row justify-center flex-wrap w-full'>
                    <div>
                      {monthPageData ? (
                        <div>
                          <RadialBarChart avg={2000} dataCall={monthPageData} call={'Pages'} />
                          {list} Page vs Average
                        </div>
                      ) : (
                        <div>
                          <RadialBarChart avg={500} dataCall={emptyRadialBarData} call={'Pages'} />
                          {list} Page vs Average
                        </div>
                      )}
                    </div>
                    <div>
                      {monthBookData ? (
                        <div>
                          <RadialBarChart avg={12} dataCall={monthBookData} call={'Books'} />
                          {list}Books vs Average
                        </div>
                      ) : (
                        <div>
                          <RadialBarChart avg={12} dataCall={monthBookData} call={'Books'} />
                          {list} Book vs Average
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {year !== 'All Time' ? (
                      <div className='flex flex-row justify-center flex-wrap w-full'>
                        <div>
                          {yearPageData ? (
                            <div>
                              <LineChart monthData={yearPageData} />
                              <div>
                                <span className='text-primary text-xl'>Top Reading Months - Pages</span>
                                <ul className='flex justify-start flex-col'>
                                  {yearPageData.sort((a, b) => b.count - a.count).slice(0, 3).map((entry, index) => (
                                    <li className='text-left text-xl' key={index}>
                                      {index + 1}) {monthsName[entry.month - 1]}
                                    </li>
                                  ))
                                  }
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <LineChart monthData={emptyLineData} />
                            </div>
                          )}
                        </div>
                        <div>
                          {yearBookData ? (
                            <div>
                              <LineChart monthData={yearBookData} />
                              <div>
                                <span className='text-primary text-xl'>Top Reading Months - Books</span>
                                <ul className='flex justify-start flex-col'>
                                  {yearBookData.sort((a, b) => b.count - a.count).slice(0, 3).map((entry, index) => (
                                    <li className='text-left text-xl' key={index}>
                                      {index + 1}) {monthsName[entry.month - 1]}
                                    </li>
                                  ))
                                  }
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <LineChart monthData={emptyLineData} />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-row justify-center flex-wrap w-full'>
                        <div>
                          {yearPageData ? (
                            <div>
                              <LineChartYear yearData={allPageData} />
                              <div>
                                <span className='text-primary text-xl'>Top Reading Years - Pages</span>
                                <ul className='flex justify-start flex-col'>
                                  {allPageData.sort((a, b) => b.count - a.count).slice(0, 3).map((entry, index) => (
                                    <li className='text-left text-xl' key={index}>
                                      {index + 1}) {entry.year}
                                    </li>
                                  ))
                                  }
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <LineChart monthData={emptyLineData} />
                            </div>
                          )}
                        </div>
                        <div>
                          {yearBookData ? (
                            <div>
                              <LineChartYear yearData={allBookData} />
                              <div>
                                <span className='text-primary text-xl'>Top Reading Years - Books</span>
                                <ul className='flex justify-start flex-col'>
                                  {allBookData.sort((a, b) => b.count - a.count).slice(0, 3).map((entry, index) => (
                                    <li className='text-left text-xl' key={index}>
                                      {index + 1}) {entry.year}
                                    </li>
                                  ))
                                  }
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <LineChart monthData={emptyLineData} />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                    }
                  </div>
                )
                }
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div >
  )
}

export default Stats