import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: 'A1 Disease Progression Predictor',
  description: 'Hospital management powered by AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${poppins.className} antialiased bg-main-1 hoverEffect`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
