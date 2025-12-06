import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-main-1 hoverEffect font-poppins">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}