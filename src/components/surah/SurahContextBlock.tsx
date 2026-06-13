"use client";

import { useState } from "react";

type SurahContextBlockProps = {
  title: string;
  html: string;
  defaultOpen?: boolean;
};

export default function SurahContextBlock({
  title,
  html,
  defaultOpen = false,
}: SurahContextBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="drop-shadow-custom dark:drop-shadow-dark mb-6 rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-semibold text-[#29A19C]"
      >
        <span>{title}</span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className="prose prose-sm dark:prose-invert mt-3 max-w-none text-[#8A8A8E] dark:text-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
