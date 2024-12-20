"use client";
import React, { useEffect, useState } from "react";
import LibNavbar from "../../../../../components/LibNavbar";
import { usePathname } from "next/navigation";
import { useRouterContext } from "../../../../../utils/RouterContext";
import Pagination from "../../../../browse/books/search/results/Pagination.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";

function Edit() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouterContext();
  const [members, setMembers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25;
  const [member, setMember] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const getMembers = async () => {
    try {
      const res = await fetch("/api/library/memberAcc", {
        method: "GET",
        headers: {
          libId: id,
          limit,
          page: currentPage,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get members");
      }

      const data = await res.json();
      setMembers(data.members);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const addMember = async (memberId, op) => {
    try {
      const res = await fetch("/api/library/memberAcc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libId: id,
          member: memberId,
          op: op,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update the member acc list", res.statusText);
        return;
      }
      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the list");
        if (op === "+") toast.error("Failed to add a Member");
        else if (op === "-") toast.error("Failed to delete a Member");
      } else {
        if (op === "+") toast.success("Member Added Successfully!!");
        else if (op === "-") toast.success("Member Deleted Successfully!!");
        getMembers();
        setMember("");
      }
    } catch (err) {
      console.log(err);
      if ((op = "+")) toast.error("Failed to add a Member");
      else if ((op = "-")) toast.error("Failed to delete a Member");
    }
  };

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div className="border-solid border-2 border-secondary rounded-md md:mx-[50px] lg:mx-[130px] xl:mx-[225px] mt-10 h-[500px] flex flex-col">
        <h1 className="text-primary text-[35px] mt-2 ml-6">
          Customer Profiles
        </h1>
        <div className="mt-4 flex items-center">
          <input
            className="w-[160px] sm:w-[300px] lg:w-[400px] xl:w-[625px] ml-6 bg-transparent placeholder:text-white border-[1px] border-solid border-primary text-[23px] pl-2 text-white h-[40px]"
            type="text"
            name=""
            id=""
            value={member}
            onChange={(e) => {
              setMember(e.target.value);
            }}
          />
          <button
            className="h-full bg-secondary p-1 ml-2 rounded-md text-[17px] transition-transform duration-300 hover:scale-[1.01]"
            onClick={() => {
              addMember(member, "+");
            }}
          >
            Add Member
          </button>
        </div>
        {members ? (
          members.length > 0 ? (
            <div className="grid grid-cols-1 overflow-y-auto  md:grid-cols-2">
              {members.map((member) => (
                <div
                  key={member.card}
                  className="mt-8 ml-6 w-[90%] flex flex-row items-center justify-start text-[18px] border-b-[1px] pb-3"
                >
                  {member.name} - #{member.card}
                  <div className="flex-grow"></div>
                  <button
                    className="bg-secondary p-2 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                    onClick={() => {
                      addMember(member.card, "-");
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>No Members have accounts with the Us</div>
          )
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
      <div className="mt-[20px]">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          limit={limit}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Edit;
