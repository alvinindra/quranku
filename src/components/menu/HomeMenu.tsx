import Link from 'next/link'
import IconDoaHarian from '@/components/icons/icon-doa-harian.svg'
import IconDzikirPagi from '@/components/icons/icon-dzikir-pagi.svg'
import IconDzikirPetang from '@/components/icons/icon-dzikir-petang.svg'
import IconTeksArab from '@/components/icons/icon-teks-arab.svg'
import Image from 'next/image'

const listMenu = [
  {
    name: 'Doa Harian',
    icon: IconDoaHarian,
    url: '/doa-harian',
  },
  {
    name: 'Dzikir Pagi',
    icon: IconDzikirPagi,
    url: '/dzikir-pagi',
    // url: '/comingsoon',
  },
  {
    name: 'Dzikir Petang',
    icon: IconDzikirPetang,
    url: '/dzikir-petang',
    // url: '/comingsoon',
  },
  {
    name: 'Teks Arab',
    icon: IconTeksArab,
    url: '/teks-arab',
    // url: '/comingsoon',
  },
]

export default function HomeMenu() {
  return (
    <>
      <div className="relative flex justify-around my-5 px-3 py-4 bg-white dark:bg-[#3D3D3D] rounded-lg drop-shadow-custom dark:drop-shadow-dark cursor-pointer">
        {listMenu.map((item) => (
          <MenuItem item={item} key={item.name} />
        ))}
      </div>
    </>
  )
}

function MenuItem({ item }: any) {
  return (
    <Link href={item?.url} className="flex text-center flex-col">
      <div className="mx-auto"><Image src={item?.icon} alt="" /> </div>
      <div className="text-[11px] whitespace-normal max-w-[51px] leading-3 mt-1 text-[#29A19C]">
        {item?.name}
      </div>
    </Link>
  )
}
