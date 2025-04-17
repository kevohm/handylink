import { Poppins, Passion_One } from "next/font/google"

// Load Poppins font
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})


// Since Passion One might have issues with Google Fonts, we'll use Poppins as fallback
export const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-passion-one",
  display: "swap",
})
