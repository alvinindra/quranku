"use client"

import { SurahInfo } from "@/types/SurahInfo"
import { useCallback, useEffect, useState } from "react"

export default function HomeScrollToTop() {
  const [surahInfo, setSurahInfo] = useState<SurahInfo[]>([])
  const [showButton, setShowButton] = useState(false)

  const smoothScroll = useCallback(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  useEffect(() => {
    smoothScroll()
  }, [smoothScroll])

  return <>
    {showButton && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed p-3 rounded-full bottom-5 right-5 text-lg bg-[#29A19C] drop-shadow-custom dark:drop-shadow-dark"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 11H11V21H13V11H16L12 7L8 11ZM4 3V5H20V3H4Z" fill="white" />
        </svg>
      </button>
    )}
  </>
}