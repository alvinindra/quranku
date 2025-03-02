import localFont from "next/font/local"
import { Poppins } from 'next/font/google'

export const isepMisbah = localFont({
  src: [
    {
      path: "./isep-misbah/IsepMisbah.ttf",
      style: "normal",
    }
  ],
  variable: "--font-isep-misbah",
});

export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})