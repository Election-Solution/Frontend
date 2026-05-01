import "./globals.css";

import type { Metadata } from "next";
import AppLayout from "@/components/AppLayout";

export const metadata: Metadata = {
  title: "WatchDog Alert — Real-Time Election Monitoring",
  description:
    "Empowering citizens. Ensuring transparency. Report polling unit incidents instantly for rapid intervention.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <TooltipProvider> */}
        {/* <Toaster /> */}
        {/* <Sonner /> */}
        <AppLayout>{children}</AppLayout>
        {/* </TooltipProvider> */}
      </body>
    </html>
  );
}
