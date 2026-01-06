import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Career Compass Hub",
  description: "Find your next career move with curated jobs and companies.",
};


const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;

