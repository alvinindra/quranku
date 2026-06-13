"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Coordinates,
  CalculationMethod,
  Madhab,
  PrayerTimes,
  Prayer,
} from "adhan";

type City = {
  name: string;
  lat: number;
  lng: number;
};

// Indonesian cities with coordinates; Jakarta is the default fallback.
const CITIES: City[] = [
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Bandung", lat: -6.9175, lng: 107.6191 },
  { name: "Surabaya", lat: -7.2575, lng: 112.7521 },
  { name: "Medan", lat: 3.5952, lng: 98.6722 },
  { name: "Makassar", lat: -5.1477, lng: 119.4327 },
  { name: "Yogyakarta", lat: -7.7956, lng: 110.3695 },
];

// Map adhan Prayer keys to the rows we display, in chronological order.
const PRAYER_ROWS = [
  { key: Prayer.Fajr, label: "Subuh" },
  { key: Prayer.Dhuhr, label: "Dzuhur" },
  { key: Prayer.Asr, label: "Ashar" },
  { key: Prayer.Maghrib, label: "Maghrib" },
  { key: Prayer.Isha, label: "Isya" },
] as const;

type Coords = { lat: number; lng: number };
type GeoStatus = "loading" | "granted" | "denied";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function PrayerTimesClient() {
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("loading");
  const [coords, setCoords] = useState<Coords>({
    lat: CITIES[0].lat,
    lng: CITIES[0].lng,
  });
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0].name);

  // Geolocation is browser-only: request it after mount, never during SSR.
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoStatus("granted");
      },
      () => {
        // Permission denied or unavailable: fall back to city selector.
        setGeoStatus("denied");
      },
    );
  }, []);

  const handleCityChange = (name: string) => {
    const city = CITIES.find((c) => c.name === name) ?? CITIES[0];
    setSelectedCity(city.name);
    setCoords({ lat: city.lat, lng: city.lng });
  };

  const { times, nextPrayer } = useMemo(() => {
    const now = new Date();
    const coordinates = new Coordinates(coords.lat, coords.lng);
    // Calculation method is configurable; Singapore is close to Indonesia
    // (Kemenag). Swap to CalculationMethod.MuslimWorldLeague() etc. if needed.
    const params = CalculationMethod.Singapore();
    params.madhab = Madhab.Shafi;
    const prayerTimes = new PrayerTimes(coordinates, now, params);
    return {
      times: prayerTimes,
      nextPrayer: prayerTimes.nextPrayer(),
    };
  }, [coords]);

  // Hijri (Umm al-Qura) and Gregorian dates, formatted for Indonesia.
  const hijriDate = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    [],
  );
  const gregorianDate = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    [],
  );

  return (
    <div className="flex flex-col items-center justify-center px-[20px]">
      <div className="relative mt-[76px] flex w-full flex-col">
        {/* Hijri + Gregorian date card */}
        <div className="drop-shadow-custom dark:drop-shadow-dark mb-5 rounded-lg bg-white px-3 py-4 text-center dark:bg-[#3D3D3D]">
          <div className="text-lg font-bold text-[#29A19C]">{hijriDate} H</div>
          <div className="mt-1 text-xs text-[#8A8A8E] dark:text-white">
            {gregorianDate}
          </div>
        </div>

        {/* Location: geolocation or city fallback */}
        <div className="drop-shadow-custom dark:drop-shadow-dark mb-5 rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]">
          {geoStatus === "loading" && (
            <div className="text-xs text-[#8A8A8E] dark:text-white">
              Mendeteksi lokasi Anda...
            </div>
          )}
          {geoStatus === "granted" && (
            <div className="text-xs text-[#8A8A8E] dark:text-white">
              Menggunakan lokasi Anda saat ini.
            </div>
          )}
          {geoStatus === "denied" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="city-select"
                className="text-xs text-[#8A8A8E] dark:text-white"
              >
                Lokasi tidak tersedia. Pilih kota:
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="rounded-lg border border-[#29A19C] bg-white px-3 py-2 text-sm text-black focus:outline-hidden dark:bg-[#3D3D3D] dark:text-white"
              >
                {CITIES.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Prayer times list */}
        <div className="drop-shadow-custom dark:drop-shadow-dark mb-5 flex flex-col rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]">
          {PRAYER_ROWS.map((row) => {
            const time = times.timeForPrayer(row.key);
            const isNext = nextPrayer === row.key;
            return (
              <div
                key={row.key}
                className={`flex items-center justify-between rounded-lg px-2 py-3 ${
                  isNext
                    ? "bg-[#29A19C]/10 ring-2 ring-[#29A19C]"
                    : ""
                }`}
              >
                <span
                  className={`text-sm font-bold ${
                    isNext ? "text-[#29A19C]" : "text-[#0C1517] dark:text-white"
                  }`}
                >
                  {row.label}
                  {isNext && (
                    <span className="ml-2 text-[11px] font-normal text-[#29A19C]">
                      (Selanjutnya)
                    </span>
                  )}
                </span>
                <span
                  className={`text-sm ${
                    isNext ? "text-[#29A19C]" : "text-[#8A8A8E] dark:text-white"
                  }`}
                >
                  {time ? formatTime(time) : "-"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
