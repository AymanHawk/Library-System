"use client";

import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar.jsx"
import{ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton}
  from '@clerk/nextjs'



export default function RootLayout({ children }) {

  
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="bg-background p-5 text-white">
      <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Navbar />
            {children}
      </body>
    </html>
    </ClerkProvider>
  );
}