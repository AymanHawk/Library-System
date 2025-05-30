import React, { useState } from "react";
import { useRouterContext } from "../utils/RouterContext";
import logo from "../images/logo.png";
import Image from "next/image";
import signOutIcon from '../images/signOut.png'
import dashboard from '../images/dashboard.png'
import preferences from '../images/preferences.png'
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  signOut,
  UserButton,
  useUser,
  useOrganizationList,
  useOrganization,
} from "@clerk/nextjs";

function LibNavbar({ libId, libPath }) {

  const [ham, setHam] = useState(true);
  const { organization } = useOrganization();
  const router = useRouterContext();
  const routes = [
    { path: `/library/orders/${libId}`, label: 'Orders' },
    { path: `/library/inventory/${libId}`, label: 'Inventory' },
    { path: `/library/profile/customer/${libId}`, label: 'Customer Account' },
  ]

  const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const handleRoutes = (path) => {
    router.push(path);
  };

  const toggleSwitch = () => {
    setHam(!ham);
  };

  return (
    <nav className="flex sm:items-center items-start">
      <div className="nav-logo">
        <div onClick={() => handleRoutes("/")}>
          <Image src={logo} alt="logo" />
        </div>
      </div>
      <div className="text-primary mx-auto text-center justify-evenly text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl sm:flex hidden">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => handleRoutes(route.path)}
            className={`p-2 hover:bg-primary w-full hover:text-black text-nowrap ${libPath === route.path ? "bg-primary text-black" : ""
              }`}
          >
            {route.label}
          </button>
        ))}
      </div>
      <div className="border-primary border-[1px] bg-background rounded-md w-[50%] mx-auto flex flex-col p-1 sm:hidden">
        <div className="flex justify-end m-1 mb-2">
          <button className="relative h-6 w-8" onClick={toggleSwitch}>
            {/* <div className="border-primary border-b-[2px] w-8 mb-2"></div> */}
            <div
              className={` ${ham
                ? " mb-2 "
                : ` absolute top-1/2 left-0 w-full transform -translate-y-1/2 rotate-45`
                } transition-all duration-500 border-primary border-b-[2px] `}
            ></div>
            <div
              className={`${ham ? " " : "opacity-0"
                } transition-opacity duration-300 border-primary border-b-[2px] w-full`}
            ></div>
            <div
              className={`${ham
                ? " mt-2 "
                : ` absolute top-1/2 left-0 w-full transform -translate-y-1/2 -rotate-45`
                } transition-all duration-500 border-primary border-b-[2px] `}
            ></div>
            {/* <div className="border-primary border-b-[2px] w-8 mt-2"></div> */}
          </button>
        </div>
        <div
          className={` ${ham ? "hidden" : ""} border-t-2 border-primary pt-2 `}
        >
          <div className="text-primary text-center text-lg flex flex-col items-center justify-center">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => handleRoutes(route.path)}
                className={`p-2 hover:bg-primary w-full hover:text-black  ${libPath === route.path
                  ? "bg-primary text-black rounded-md"
                  : ""
                  }`}
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="norm:w-[13%] bg-primary flex h-12 w-[32%] sm:w-[18%] items-center justify-center gap-1 text-nowrap rounded-md text-black"
      >
        {orgsLoaded &&
          userMemberships.data &&
          userMemberships.data.length > 0 ? (
          <div className="bg-background rounded-md ">
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
          </div>
        ) : (
          <div></div>
        )}
        <SignedOut>
          <SignInButton>
            <button className="text-lg">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default LibNavbar;
