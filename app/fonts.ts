import {
  Inter,
  Montserrat,
  Open_Sans,
  Poppins,
  Roboto_Mono,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
