"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SearchEntry = {
  s: number;
  a: number;
  n: string;
  t: string;
};

const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 50;

export default function SearchClient() {
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Fetch the static index once on mount (never imported into the bundle).
  useEffect(() => {
    let active = true;
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("failed to load search index");
        return res.json();
      })
      .then((data: SearchEntry[]) => {
        if (active) setEntries(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  // Debounce the query (~250ms).
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (q.length < MIN_QUERY_LENGTH || !entries) return [];
    const matched: SearchEntry[] = [];
    for (const entry of entries) {
      if (
        entry.t.toLowerCase().includes(q) ||
        entry.n.toLowerCase().includes(q)
      ) {
        matched.push(entry);
        if (matched.length >= MAX_RESULTS) break;
      }
    }
    return matched;
  }, [debouncedQuery, entries]);

  const trimmedQuery = debouncedQuery.trim();
  const showHint = trimmedQuery.length < MIN_QUERY_LENGTH;

  return (
    <div className="flex flex-col items-center justify-center px-[20px]">
      <div className="relative mt-[76px] flex w-full flex-col">
        <div className="drop-shadow-custom dark:drop-shadow-dark relative mb-4 flex">
          <svg
            className="absolute top-1/2 left-2 flex h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded-lg bg-white px-4 py-2 pl-8 text-sm text-black focus:outline-hidden dark:bg-[#3D3D3D] dark:text-white"
            placeholder="Cari terjemahan ayat"
          />
        </div>

        {error ? (
          <div className="text-center text-sm text-[#8A8A8E] dark:text-white">
            Gagal memuat indeks pencarian.
          </div>
        ) : entries === null ? (
          <div className="text-center text-sm text-[#8A8A8E] dark:text-white">
            Memuat data...
          </div>
        ) : showHint ? (
          <div className="text-center text-sm text-[#8A8A8E] dark:text-white">
            Ketik minimal 2 huruf untuk mencari.
          </div>
        ) : (
          <>
            <div className="mb-3 text-xs text-[#8A8A8E] dark:text-white">
              {results.length === 0
                ? "Tidak ada hasil ditemukan."
                : `${results.length} hasil${
                    results.length >= MAX_RESULTS ? "+" : ""
                  } ditemukan`}
            </div>
            {results.map((entry) => (
              <Link
                key={`${entry.s}:${entry.a}`}
                href={`/surah/${entry.s}#${entry.a}`}
                className="drop-shadow-custom dark:drop-shadow-dark relative mb-3 flex flex-col rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]"
              >
                <div className="mb-1 text-sm font-semibold text-[#29A19C]">
                  {entry.n} : {entry.a}
                </div>
                <div className="line-clamp-3 text-xs leading-[18px] text-[#8A8A8E] dark:text-white">
                  {entry.t}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
