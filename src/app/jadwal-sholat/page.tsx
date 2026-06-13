import Header from "@/components/layout/Header";
import PrayerTimesClient from "./_components/PrayerTimesClient";

export const metadata = {
  title: "Jadwal Sholat - Quranku",
};

export default function JadwalSholatPage() {
  return (
    <>
      <Header isFixed={true} isBack={true} title="Jadwal Sholat" />
      <PrayerTimesClient />
    </>
  );
}
