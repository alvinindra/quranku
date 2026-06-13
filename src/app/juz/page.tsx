import Link from "next/link";
import Header from "@/components/layout/Header";
import juzData from "@/data/juz.json";

export const metadata = {
  title: "Juz - Quranku",
};

type JuzItem = {
  juz: number;
  surah: number;
  ayah: number;
  name: string;
};

export default function JuzPage() {
  const juzList = juzData as JuzItem[];

  return (
    <>
      <Header isFixed={true} isBack={true} title="Juz" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="relative mt-[76px] flex w-full flex-col">
          {juzList.map((item) => (
            <Link
              key={item.juz}
              href={`/surah/${item.surah}#${item.ayah}`}
              className="drop-shadow-custom dark:drop-shadow-dark relative mb-5 flex flex-col rounded-lg bg-white px-3 py-4 dark:bg-[#3D3D3D]"
            >
              <div className="flex items-center">
                <div className="mr-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#29A19C] text-sm font-bold text-[#29A19C]">
                  {item.juz}
                </div>
                <div className="my-auto">
                  <div className="text-sm font-bold text-[#0C1517] dark:text-white">
                    Juz {item.juz}
                  </div>
                  <div className="text-xs text-[#8A8A8E] dark:text-white">
                    Dimulai dari {item.name} : {item.ayah}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
