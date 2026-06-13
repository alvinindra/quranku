import Header from "@/components/layout/Header";
import SearchClient from "@/components/search/SearchClient";

export const metadata = {
  title: "Cari Ayat - Quranku",
};

export default function SearchPage() {
  return (
    <>
      <Header isFixed={true} isBack={true} title="Cari Ayat" />
      <SearchClient />
    </>
  );
}
