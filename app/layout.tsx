import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { poppins } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Care Instructor",
  description:
    "Care Instructor application. We help you find the right care guide for your furniture.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
