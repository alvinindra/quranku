import Header from "@/components/layout/Header";
import QiblaCompass from "./_components/QiblaCompass";

export const metadata = {
  title: "Arah Kiblat - Quranku",
};

export default function QiblaPage() {
  return (
    <>
      <Header isFixed={true} isBack={true} title="Arah Kiblat" />
      <QiblaCompass />
    </>
  );
}
