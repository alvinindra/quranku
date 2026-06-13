"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Kaaba coordinates (Mecca).
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

type GeoStatus = "loading" | "granted" | "denied";

// iOS 13+ exposes DeviceOrientationEvent.requestPermission(); type it without
// using `any` so lint stays clean.
type DeviceOrientationEventiOS = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

// Some browsers expose webkitCompassHeading on the orientation event (iOS).
type OrientationEventWithCompass = DeviceOrientationEvent & {
  webkitCompassHeading?: number;
};

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

// Initial great-circle bearing from (lat1,lng1) to the Kaaba, normalized 0-360.
function computeQiblaBearing(lat1: number, lng1: number): number {
  const phi1 = toRad(lat1);
  const phi2 = toRad(KAABA_LAT);
  const deltaLambda = toRad(KAABA_LNG - lng1);

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const theta = Math.atan2(y, x);
  return (toDeg(theta) + 360) % 360;
}

export default function QiblaCompass() {
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("loading");
  const [bearing, setBearing] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [compassActive, setCompassActive] = useState(false);
  const [compassError, setCompassError] = useState<string | null>(null);
  // Track whether a listener is attached so we can clean it up on unmount.
  const listenerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(
    null,
  );
  // Whether at least one usable heading has arrived, and the support timeout.
  const gotReadingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const detachListener = useCallback(() => {
    if (listenerRef.current) {
      window.removeEventListener(
        "deviceorientationabsolute",
        listenerRef.current,
      );
      window.removeEventListener("deviceorientation", listenerRef.current);
      listenerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Geolocation is browser-only: request it after mount, never during SSR.
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setBearing(
          computeQiblaBearing(
            position.coords.latitude,
            position.coords.longitude,
          ),
        );
        setGeoStatus("granted");
      },
      () => {
        setGeoStatus("denied");
      },
    );
  }, []);

  // Remove any device-orientation listener on unmount.
  useEffect(() => {
    return () => detachListener();
  }, [detachListener]);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const evt = event as OrientationEventWithCompass;
    let nextHeading: number | null = null;
    if (typeof evt.webkitCompassHeading === "number") {
      // iOS: webkitCompassHeading is already relative to north.
      nextHeading = evt.webkitCompassHeading;
    } else if (typeof evt.alpha === "number" && event.absolute) {
      // Only trust alpha when it is absolute (relative alpha points the wrong
      // way because it is measured from the device's start orientation).
      nextHeading = (360 - evt.alpha) % 360;
    }
    if (nextHeading === null) return;
    gotReadingRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCompassError(null);
    setHeading(nextHeading);
  }, []);

  const enableCompass = useCallback(async () => {
    setCompassError(null);
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setCompassError("Perangkat tidak mendukung kompas.");
      return;
    }

    const doe = DeviceOrientationEvent as DeviceOrientationEventiOS;
    try {
      if (typeof doe.requestPermission === "function") {
        // iOS 13+ requires an explicit user-gesture permission request.
        const permission = await doe.requestPermission();
        if (permission !== "granted") {
          setCompassError("Izin kompas ditolak.");
          return;
        }
      }
    } catch {
      setCompassError("Gagal mengaktifkan kompas.");
      return;
    }

    listenerRef.current = handleOrientation;
    gotReadingRef.current = false;
    // Prefer the absolute orientation event when available.
    window.addEventListener("deviceorientationabsolute", handleOrientation);
    window.addEventListener("deviceorientation", handleOrientation);
    setCompassActive(true);

    // If no usable reading arrives, the device has no (absolute) compass —
    // tell the user instead of leaving a silent, dead static arrow.
    timeoutRef.current = setTimeout(() => {
      if (!gotReadingRef.current) {
        setCompassError(
          "Perangkat ini tidak mengirim arah kompas. Pakai tampilan statis: arahkan bagian atas perangkat ke Utara, lalu ikuti derajat di bawah.",
        );
        setCompassActive(false);
        detachListener();
      }
    }, 3000);
  }, [handleOrientation, detachListener]);

  // Arrow rotation: when the live compass heading is known, point the arrow at
  // (qiblaBearing - heading). Otherwise fall back to a north-up static arrow.
  const rotation =
    bearing === null
      ? 0
      : heading !== null
        ? bearing - heading
        : bearing;

  return (
    <div className="flex flex-col items-center justify-center px-[20px]">
      <div className="relative mt-[76px] flex w-full flex-col items-center">
        {geoStatus === "loading" && (
          <div className="drop-shadow-custom dark:drop-shadow-dark w-full rounded-lg bg-white px-3 py-4 text-center text-sm text-[#8A8A8E] dark:bg-[#3D3D3D] dark:text-white">
            Mendeteksi lokasi Anda...
          </div>
        )}

        {geoStatus === "denied" && (
          <div className="drop-shadow-custom dark:drop-shadow-dark w-full rounded-lg bg-white px-3 py-4 text-center text-sm text-[#8A8A8E] dark:bg-[#3D3D3D] dark:text-white">
            Lokasi tidak tersedia. Izinkan akses lokasi untuk menentukan arah
            kiblat.
          </div>
        )}

        {geoStatus === "granted" && bearing !== null && (
          <>
            <div className="drop-shadow-custom dark:drop-shadow-dark mb-6 flex aspect-square w-full max-w-[280px] items-center justify-center rounded-full bg-white p-6 dark:bg-[#3D3D3D]">
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-[#29A19C]/30">
                {/* North marker */}
                <span className="absolute top-1 text-xs font-bold text-[#8A8A8E] dark:text-white">
                  U
                </span>
                {/* Qibla arrow */}
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  aria-hidden="true"
                >
                  <polygon points="60,12 74,72 60,60 46,72" fill="#29A19C" />
                  <circle cx="60" cy="60" r="6" fill="#29A19C" />
                </svg>
              </div>
            </div>

            <div className="drop-shadow-custom dark:drop-shadow-dark mb-5 w-full rounded-lg bg-white px-3 py-4 text-center dark:bg-[#3D3D3D]">
              <div className="text-sm font-bold text-[#29A19C]">
                Arah kiblat: {Math.round(bearing)}° dari Utara
              </div>
              {compassActive && heading !== null ? (
                <div className="mt-1 text-xs text-[#8A8A8E] dark:text-white">
                  Kompas aktif. Putar perangkat hingga panah mengarah ke atas.
                </div>
              ) : (
                <div className="mt-1 text-xs text-[#8A8A8E] dark:text-white">
                  Tampilan statis (asumsi atas = Utara).
                </div>
              )}
            </div>

            {!compassActive && (
              <button
                type="button"
                onClick={() => void enableCompass()}
                className="mb-3 cursor-pointer rounded-lg bg-[#29A19C] px-4 py-2 text-sm font-bold text-white"
              >
                Aktifkan kompas
              </button>
            )}

            {compassError && (
              <div className="text-xs text-red-500">{compassError}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
