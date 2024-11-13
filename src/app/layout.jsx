'use client'
import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar.jsx"
import { ClerkProvider } from '@clerk/nextjs'
import { RouterProvider } from "../utils/RouterContext.jsx";
import { usePathname } from "next/navigation";




export default function RootLayout({ children }) {

  const pathname = usePathname();

  const hideUserNav = pathname.startsWith('/library');

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#DCE75C',
          colorBackground: '#1E1C1C',
          colorText: '#DCE75C',
          colorNeutral: '#DCE75C',
          colorInputText: '#DCE75C',
          colorInputBackground: '#1E1C1C',
          colorTextOnPrimaryBackground: '#1E1C1C',
          fontSize: '0.9em'
        },
      }}
    >
      <RouterProvider>
       <html lang="en">
          <body className="bg-background p-5 text-white">
            {!hideUserNav && <Navbar />}
            {children}
          </body>
        </html>
      </RouterProvider>
    </ClerkProvider>
  );
}