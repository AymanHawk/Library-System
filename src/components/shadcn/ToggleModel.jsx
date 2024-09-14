"use client"

import React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./Buttons"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className=""
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-gray-900" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-gray-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
