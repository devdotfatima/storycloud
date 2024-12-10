import type { Metadata } from "next";
import { Mukta, Crimson_Pro } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { Toaster } from "@/shared/components/ui/toaster";
import SessionProvider from "./providers/SessionProvider";
import { validateUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-crimson-pro",
});

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
});
export const metadata: Metadata = {
  title: "Story Cloud",
  description:
    "An app to voice record memories, and share them with family and friends.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateUser();
  if (!user) redirect("/login");
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${mukta.variable} bg-purple-100 font-mukta font-normal text-base sm:text-xl antialiased`}
      >
        <SessionProvider value={user}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
