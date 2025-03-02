import Header from "@/components/layout/Header";
import { DzikirItem } from "@/types/DoaInfo";
import React from "react";

export const metadata = {
  title: 'Dzikir Pagi - Quranku',
}

export default async function DoaHarianPage() {
  const res = await import(`@/data/dzikir-pagi.json`);
  const dzikir_pagi: DzikirItem[] = res.dzikir_pagi;

  return (
    <>
      <Header isFixed={true} isBack={true} title="Dzikir Pagi" />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="flex flex-col relative w-full mt-[76px]">
          {dzikir_pagi.map((item: DzikirItem, indexDoa: number) => (
            <div
              key={indexDoa}
              className="relative flex flex-col mb-5 px-3 py-4 bg-white dark:bg-[#3D3D3D] rounded-lg drop-shadow-custom dark:drop-shadow-dark"
            >
              {item.title && (
                <div className="flex mb-2">
                  <div className="flex-shrink-0 mr-5 my-auto text-center text-xs text-[#29A19C] flex justify-center truncate">
                    {item.title}
                  </div>
                </div>
              )}
              <div className="my-auto">
                <div className="text-[#0C1517] dark:text-white text-2xl font-bold font-display arab mb-3 leading-[52px]">
                  {item.arabic}
                </div>
                <div className="text-[#8A8A8E] dark:text-white text-xs leading-[18px]">
                  {item.translation}
                </div>
                <div className="text-[#81818B] mt-2 font-medium dark:text-white text-[11px] leading-[14px]">
                  {item.source.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < item.source.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}