'use client'
import React, { useEffect, useState } from 'react'
import LibNavbar from '../../../../../components/LibNavbar'
import { usePathname } from 'next/navigation'
import { useRouterContext } from '../../../../../utils/RouterContext';
import Pagination from '../../../../browse/books/search/results/Pagination.jsx';

function Edit() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const [members, setMembers] = useState([]);
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

  useEffect(()=> {
    getMembers()
  }, [])

  const addMember = async (memberId, op) => {
    console.log(memberId)
    try{
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
      }

    }catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      customer Profile
      <div>
        <button className='bg-secondary' onClick={()=>{addMember(member, "+")}}>
          Add Member
        </button>
        <input className='text-black' type="text" name="" id="" value={member} onChange={(e)=> {setMember(e.target.value)}}/>
      </div>
      {
        (members && members.length > 0) ? (
          <div>
            {members.map(member => (
              <div key={member.card}>
                {member.name}
                <button className='bg-secondary' onClick={()=>{addMember(member.card, '-')}}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            No Members have accounts with the Site
          </div>
        )
      }
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        limit={limit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Edit