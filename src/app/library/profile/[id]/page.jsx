"use client";
import { useOrganization, UserButton, useUser } from "@clerk/nextjs";
import dashboard from "../../../../images/dashboard.png";
import preferences from "../../../../images/preferences.png";
import React, { useEffect, useState } from "react";
import { useRouterContext } from "../../../../utils/RouterContext";
import Image from "next/image";
import edit from "../../../../images/edit-pen.png";
import drop from "../../../../images/drop-white.png";
import LibNavbar from "../../../../components/LibNavbar";
import { usePathname } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouterContext();
  const { user } = useUser();
  const [stAdd, setStAdd] = useState();
  const [cityAdd, setCityAdd] = useState();
  const [stateAdd, setStateAdd] = useState();
  const [zipAdd, setZipAdd] = useState();
  const [email, setEmail] = useState();

  const handleDashboardRedirect = () => {
    if (user) {
      router.push(`/user/dashboard/${user.id}`);
    }
  };

  const getLibDetail = async () => {
    try {
      const res = await fetch("/api/library/details", {
        method: "GET",
        headers: {
          libId: id,
        },
      });

      if (!res.ok) {
        throw new Error("Error getting the user Address");
      }

      const data = await res.json();
      setCityAdd(data.address.city);
      setStAdd(data.address.street);
      setZipAdd(data.address.zip);
      setStateAdd(data.address.state);
      setEmail(data.email);
    } catch (err) {
      console.log("Error getting address", err);
    }
  };

  const changeDetails = async () => {
    try {
      const res = await fetch("/api/library/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libId: id,
          street: stAdd,
          state: stateAdd,
          city: cityAdd,
          zip: zipAdd,
          email: email,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("Failed to update the Address");
        toast.error('Falied to Update Library Information');
      } else {
        toast.success('Library Details Updated!!');

      }
    } catch (err) {
      toast.error('Falied to Update Library Information');
      console.error("Error changing address:", err);
    }
  };

  useEffect(() => {
    if (id) {
      getLibDetail();
    }
  }, []);

  const handlePreferencesRedirect = () => {
    if (user) {
      router.push(`/user/profile/preferences/${user.id}`);
    }
  };
  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div className="border-solid border-2 border-secondary rounded-md md:mx-[75px] lg:mx-[175px] xl:mx-[250px] mt-10  flex flex-col">
        <h1 className="text-primary text-[35px] mt-2 ml-6">Library Profile</h1>
        <div className="text-white text-[22px] ml-6 mt-2 flex flex-row items-center">
          <div className="content-center">
            Current Profile:
          </div>
          <div className="ml-4 flex">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Dashboard"
                  labelIcon={
                    <Image
                      src={dashboard}
                      alt="Dashboard Icon"
                      width={20}
                      height={20}
                    />
                  }
                  onClick={handleDashboardRedirect}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Preferences"
                  labelIcon={
                    <Image
                      src={preferences}
                      alt="Preferences Icon"
                      width={20}
                      height={20}
                    />
                  }
                  onClick={handlePreferencesRedirect}
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </div>
        <div className="text-white text-[22px] ml-6 mt-2 flex flex-col justify-start flex-wrap">
          Email:
          <input
            type="text"
            className="placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-white text-[18px] p-1 w-[250px] sm:w-[410px] md:w-[427px]"
            placeholder="Change Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="text-white text-[22px] ml-6 mt-4 flex flex-col">
          Address:
          <div>
            <div className="flex items-end mb-5">
              <div className="flex flex-col">
                Street Address
                <input
                  type="text"
                  className="placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-white text-[18px] p-1 w-[250px] sm:w-[410px] md:w-[427px]"
                  placeholder="Change Street Address"
                  value={stAdd}
                  onChange={(e) => {
                    setStAdd(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-start flex-wrap gap-3">
              <div className="flex flex-col">
                City
                <input
                  type="text"
                  className="placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-white text-[18px] p-1 w-[100px] sm:w-[200px]"
                  placeholder="Change City"
                  value={cityAdd}
                  onChange={(e) => {
                    setCityAdd(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                State
                <input
                  type="text"
                  className="placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-white text-[18px] p-1 w-[100px] sm:w-[200px]"
                  placeholder="Change State"
                  value={stateAdd}
                  onChange={(e) => {
                    setStateAdd(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                Zip
                <input
                  type="text"
                  className="placeholder:text-white bg-transparent border-[1px] border-solid border-primary text-white text-[18px] p-1 w-[115px]"
                  placeholder="Change Zip"
                  value={zipAdd}
                  onChange={(e) => {
                    setZipAdd(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={changeDetails}
            className="ml-6 mt-6 mb-4 bg-secondary py-2 px-4 rounded-md text-[20px] transition-transform duration-300 hover:scale-[1.01]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
