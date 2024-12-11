'use client'
import React, { useEffect, useState } from 'react'
import LibNavbar from '../../../../../components/LibNavbar'
import { usePathname } from 'next/navigation'
import { useRouterContext } from '../../../../../utils/RouterContext';
import Pagination from '../../../../browse/books/search/results/Pagination.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';

function Edit() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const [members, setMembers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25;
  const [member, setMember] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const getMembers = async () => {
    try {
      const res = await fetch("/api/library/memberAcc", {
        method: "GET",
        headers: {
          libId: id,
          limit,
          page: currentPage
        },
      })

      if (!res.ok) {
        throw new Error("Failed to get members");
      }

      const data = await res.json();
      setMembers(data.members);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMembers()
  }, [])

  const addMember = async (memberId, op) => {
    try {
      const res = await fetch('/api/library/memberAcc', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libId: id,
          member: memberId,
          op: op,
        }),
      })

      if (!res.ok) {
        console.error("Failed to update the member acc list", res.statusText);
        return;
      }
      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the list");
        if (op === '+') toast.error('Failed to add a Member');
        else if (op === '-') toast.error('Failed to delete a Member');
      } else {
        if (op === '+') toast.success('Member Added Successfully!!');
        else if (op === '-') toast.success('Member Deleted Successfully!!');
        getMembers();
        setMember('');
      }

    } catch (err) {
      console.log(err);
      if (op = '+') toast.error('Failed to add a Member');
      else if (op = '-') toast.error('Failed to delete a Member');
    }
  }

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div className="border-solid border-2 border-secondary rounded-md mx-[350px] mt-10 h-[500px] flex flex-col">
        <h1 className="text-primary text-[35px] mt-2 ml-6">Customer Profiles</h1>
        <div className="mt-4 flex items-center">
          <input className="w-[200px] ml-6 bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]" type="text" name="" id="" value={member} onChange={(e) => { setMember(e.target.value) }} />
          <button className='bg-secondary p-1 ml-2 rounded-md text-[17px] transition-transform duration-300 hover:scale-[1.01]' onClick={() => { addMember(member, "+") }}>
            Add Member
          </button>
        </div>
        {members ? (
          members.length > 0 ? (
            <div className='flex flex-col'>
              {members.map(member => (
                <div key={member.card} className="mt-8 ml-6 w-fit justify-start text-[18px] border-b-[1px] pb-3">
                  {member.name} - #{member.card}
                  <button className='bg-secondary ml-2 p-1 rounded-md transition-transform duration-300 hover:scale-[1.01]' onClick={() => { addMember(member.card, '-') }}>
                    Delete
                  </button>
                </div>
              ))}
              <div className='mt-[175px]'>
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  limit={limit}
                  setCurrentPage={setCurrentPage}
                />
              </div>

            </div>
          ) : (
            <div>
              No Members have accounts with the Us
            </div>
          )) : (
          <div>
            <Loading />
          </div>
        )
        }

      </div>
    </div>
  )
}

export default Edit