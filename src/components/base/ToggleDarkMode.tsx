"use client"

import { useTheme } from "next-themes"
import { MouseEvent, useEffect, useState } from "react"
import Image from "next/image"

export default function ToggleDarkMode() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleToggleTheme = (event: MouseEvent) => {
    event.preventDefault()
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <button onClick={handleToggleTheme}>
      <Image
        src={
          resolvedTheme === "dark"
            ? "/images/icon/dark-theme.svg"
            : "/images/icon/light-theme.svg"
        }
        width={24}
        height={24}
        alt="Toggle Theme"
      />
    </button>
  )
}
