import Header from "@/components/layout/Header";
import { TeksArabItem } from "@/types/DoaInfo";
import React from "react";
import TeksArabList from "./_components/TeksArabList";

export const metadata = {
  title: 'Teks Arab - Quranku',
}

export default async function DoaHarianPage() {
  const res = await import(`@/data/teks-arab.json`);
  const teks_arab: TeksArabItem[] = res.teks_arab;

  return (
    <>
      <Header isFixed={true} isBack={true} title="Teks Arab" />
      <TeksArabList teks_arab={teks_arab} />
    </>
  );
}