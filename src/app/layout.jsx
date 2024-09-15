"use client";

import React from "react";
import { useState } from "react";
import "./globals.css";

import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Image from "next/image";

import { cn } from "./utils/cn";

import {
  Sidebar, SidebarBody, SidebarLink,
  Logo, LogoIcon, Dashboard,
} from "../components/aceturnity-ui/Sidebar";

import { ThemeProvider } from "../components/shadcn/theme-provider";
import { ModeToggle } from "../components/shadcn/ToggleModel";
// const inter = Inter({ subsets: ["latin"] });

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
      <body className="bg-gray-100 dark:bg-neutral-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={["light", "dark"]}
        >
          <div
            className={cn(
              "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
              // for your use case, use `h-screen` instead of `h-[60vh]`
              "h-screen"
            )}>
            <Sidebar open={open} setOpen={setOpen}>
              <SidebarBody className="justify-between gap-10  ">
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                  {open ? <Logo /> : <LogoIcon />}
                  <div className="mt-8 flex flex-col gap-2">
                    {links.map((link, idx) => (
                      <SidebarLink key={idx} link={link} />
                    ))}
                  </div>
                </div>
                <div>
                  <SidebarLink
                    link={{
                      label: "Go Bears!",
                      href: "#",
                      icon: (
                        <Image
                          src="https://raw.githubusercontent.com/aymanhawk/images/main/nyit-bear.png"
                          className="h-7 w-7 flex-shrink-0 rounded-full"
                          width={50}
                          height={50}
                          alt="Avatar" />
                      ),
                    }} />
                </div>
              </SidebarBody>
            </Sidebar>
            {children}
            {/* <Dashboard /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}