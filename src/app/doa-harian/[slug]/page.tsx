import Header from "@/components/layout/Header";
import { DoaInfoItem } from "@/types/DoaInfo";
import doaInfo from "@/data/doa-info.json";
import { makeTitle } from "@/lib/utils";
import React from "react";

export async function generateStaticParams() {
  return doaInfo.doa_info.map((item: any) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return {
    title: `${makeTitle(slug)} - Quranku`,
  };
}

export default async function DoaHarianPage({ params }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const res = await import(`@/data/doa-harian/${slug}.json`);
  const doa: DoaInfoItem[] = res.data;

  return (
    <>
      <Header isFixed={true} isBack={true} title={makeTitle(slug)} />
      <div className="flex flex-col items-center justify-center px-[20px]">
        <div className="flex flex-col relative w-full mt-[76px]">
          {doa.map((item: DoaInfoItem, indexDoa: number) => (
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