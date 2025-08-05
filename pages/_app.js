import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/src/components/footer";
import MobileMenu from "@/src/components/mobileMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`page ${geistSans.variable} ${geistMono.variable}`}
    >
      <MobileMenu></MobileMenu>
      <Component {...pageProps} />
      <Footer></Footer>
    </div>
  );
}
