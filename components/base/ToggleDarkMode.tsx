import { useTheme } from 'next-themes'
import { MouseEvent } from 'react'

export default function ToggleDarkMode() {
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = (event: MouseEvent) => {
    event.preventDefault()
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <button onClick={handleToggleTheme}>
      {theme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6A9.996 9.996 0 0 1 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.66 9.38-9.98Z"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.28364 4.70137L4.32 2.73973L2.78182 4.28493L4.73455 6.24657L6.28364 4.70137ZM3.27273 10.9041H0V13.0959H3.27273V10.9041ZM13.0909 0H10.9091V3.23288H13.0909V0ZM21.2182 4.28493L19.68 2.73973L17.7273 4.70137L19.2655 6.24657L21.2182 4.28493ZM17.7164 19.2986L19.6691 21.2712L21.2073 19.726L19.2436 17.7644L17.7164 19.2986ZM20.7273 10.9041V13.0959H24V10.9041H20.7273ZM12 5.42466C8.38909 5.42466 5.45455 8.3726 5.45455 12C5.45455 15.6274 8.38909 18.5753 12 18.5753C15.6109 18.5753 18.5455 15.6274 18.5455 12C18.5455 8.3726 15.6109 5.42466 12 5.42466ZM10.9091 24H13.0909V20.7671H10.9091V24ZM2.78182 19.7151L4.32 21.2603L6.27273 19.2877L4.73455 17.7425L2.78182 19.7151Z"
            fill="white"
          />
        </svg>
      )}
    </button>
  )
}
