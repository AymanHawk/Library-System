"use client";

import React from "react";
import { useState } from "react";
import "./globals.css";
import Navbar from "../components/Navbar.jsx"

import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";


export default function RootLayout({ children }) {

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Reccomendations",
      href: "/pages/my-recs",
      icon: (
        <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-background p-5 text-white">
          <Navbar />
            {children}
      </body>
    </html>
  );
}