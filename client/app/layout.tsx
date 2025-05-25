import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastContainer from "@/components/toast/ToastContainer";
import ReactReduxProvider from "@/redux/ReactReduxProvider";
import UserStatus from "@/components/auth/user_status/UserStatus";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Passport Authentication ",
  description:
    "Lightweight passportjs JWT based authentication system with otp verification, password reset and user updation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactReduxProvider>
          <UserStatus>
            <ToastContainer />
            <div>
              <Navbar />
              {children}
              <Footer />
            </div>
          </UserStatus>
        </ReactReduxProvider>
      </body>
    </html>
  );
}
