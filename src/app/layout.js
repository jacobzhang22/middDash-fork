import "./globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CustomHead from "@/components/CustomHead";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppProvider } from "../components/AppContext";
import Header from "../components/layout/Header";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const dynamic = "force-dynamic";

export const metadata = {
  title: "MIDD-DASH",
  description: "Have Middlebury food products delivered directly to your room!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <CustomHead metadata={metadata} />
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              Built by MiddDev
            </footer>
          </AppProvider>
        </main>
      </body>
      <GoogleAnalytics gaId="G-J75HZMB64E" />
    </html>
  );
}
