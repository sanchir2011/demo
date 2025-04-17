import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

export const metadata = {
  title: "Demo Project",
  description: "Demo Project created by Sanchir Enkhbold",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`} >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
