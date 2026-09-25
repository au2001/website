import React from "react";
import { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";

import "./globals.scss";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Aurélien Garnier",
    template: "%s · Aurélien Garnier",
  },
  description:
    "Backend engineer with 10+ years of TypeScript experience building frontend-facing APIs and data pipelines.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${firaSans.variable} ${firaCode.variable}`}>
      <body>{children}</body>
    </html>
  );
}
