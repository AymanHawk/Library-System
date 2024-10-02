"use client";

import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar.jsx"
import {ClerkProvider} from '@clerk/nextjs'




export default function RootLayout({ children }) {

  
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="bg-background p-5 text-white">
          <Navbar />
            {children}
      </body>
    </html>
    </ClerkProvider>
  );
}