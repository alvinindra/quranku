"use client"

import { TeksArabItem } from "@/types/DoaInfo";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function TeksArabList({ teks_arab }: {
  teks_arab: TeksArabItem[];
}) {
  const { theme } = useTheme();
  const [query, setQuery] = useState("")

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Berhasil disalin!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
        transition: Bounce,
      });
    }).catch(err => {
      console.error("Gagal menyalin teks: ", err);
    });
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, text: string) => {
    handleCopy(text);
  };

  return (
    <div className="flex flex-col items-center justify-center px-[20px]">
      <div className="flex flex-col relative w-full mt-[76px]">
        <div className="relative flex mb-6 drop-shadow-custom dark:drop-shadow-dark">
          <svg className="flex absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
            </path>
          </svg>
          <input type="text" onChange={event => setQuery(event.target.value)} className="text-sm text-black dark:text-white rounded-lg appearance-none focus:outline-hidden focus:shadow-outline pl-8 px-4 py-2 w-full bg-white dark:bg-[#3D3D3D]" placeholder="Cari teks" />
        </div>

        {teks_arab.filter((item: TeksArabItem) => {
          if (query === '') {
            return item
          } else if (item.latin.toLowerCase().includes(query.toLowerCase()) || item.translation.toLowerCase().includes(query.toLowerCase())) {
            return item
          }
        }).map((item: TeksArabItem, index: number) => (
          <div
            key={index}
            onClick={(e) => handleCardClick(e, `${item.arabic}\n${item.latin}\n${item.translation}`)}
            className="relative flex flex-col mb-5 px-3 py-4 bg-white dark:bg-[#3D3D3D] rounded-lg drop-shadow-custom dark:drop-shadow-dark cursor-pointer overflow-hidden"
          >
            <div className="my-auto">
              <div className="text-[#0C1517] dark:text-white text-2xl font-bold font-display arab mb-3 leading-[52px]">
                {item.arabic}
              </div>
              <div className="font-normal text-xs mb-[3px] dark:text-white">
                {item.latin}
              </div>
              <div className="text-[#333333] text-balance font-bold dark:text-white text-xs leading-[18px]">
                {item.translation}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}