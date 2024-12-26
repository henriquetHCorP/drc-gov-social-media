import localFont from "next/font/local";
import "./globals.css";
import Header from "./Components/Header";
import { ThemeProvider } from "next-themes";
import ThemeCom from "./Components/ThemeCom";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./Components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider>
          <ThemeCom>
        <Header /> 
        {children}
        <Footer /> 
          </ThemeCom>
        </ThemeProvider>
      </body>
    </html>
        </ClerkProvider>
  );
}
