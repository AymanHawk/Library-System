"use client";

import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar.jsx"




export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body className="bg-background p-5 text-white">
          <Navbar />
            {children}
      </body>
    </html>
  );
}