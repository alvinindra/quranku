"use client"

import { useTheme } from 'next-themes'
import { MouseEvent, useEffect, useState } from 'react'
import Image from 'next/image'

export default function ToggleDarkMode() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = (event: MouseEvent) => {
    event.preventDefault()
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button onClick={handleToggleTheme}>
      <Image
        src={
          theme === 'dark'
            ? '/images/icon/dark-theme.svg'
            : '/images/icon/light-theme.svg'
        }
        width={24}
        height={24}
        alt="Dark Theme"
      />
    </button>
  )
}
