"use client"

import { useRouter } from 'next/navigation'
import ToggleDarkMode from '@/components/base/ToggleDarkMode'
import { cn } from '@/lib/utils'

type HeaderProps = {
  isFixed?: boolean
  isBack?: boolean
  title: string
}

export default function Header({
  isFixed,
  isBack = false,
  title,
}: HeaderProps) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <header
      className={cn(
        `w-full flex bg-white dark:bg-[#333333] h-[52px] px-5 py-[14px] mb-[2px] z-10`,
        isFixed ? 'fixed shadow-md dark:drop-shadow-dark left-0' : 'relative'
      )}
    >
      {isBack && (
        <button className="relative cursor-pointer" onClick={handleClick}>
          <svg
            className="fill-[#0C1517] dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_915_104)">
              <path
                d="M11.67 3.86998L9.9 2.09998L0 12L9.9 21.9L11.67 20.13L3.54 12L11.67 3.86998Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_915_104">
                <rect width="24" height="24" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
        </button>
      )}
      <div className="mx-auto">
        <div className="absolute left-[50%] translate-x-[-50%] text-base font-bold text-black dark:text-white line-clamp-1 text-nowrap">
          {title}
        </div>
      </div>
      <ToggleDarkMode />
    </header>
  )
}
