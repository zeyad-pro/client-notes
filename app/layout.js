"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/AuthContext";
import { usePathname } from "next/navigation";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Notes full stack app",
//   description: "maked my Zeyad maher",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
        cz-shortcut-listen="true"
      >
        <AuthProvider>
        {!hideNavbar && <Navbar />}
          <Toaster position="top-center" reverseOrder={false} />
          {children}

        </AuthProvider>
        {!hideNavbar && <Footer />}
      </body>
    </html>
  );
}
