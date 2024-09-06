import { HomeButton } from "@/components/ui/HomeButton";
import Link from "next/link";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white bg-dot-black/[0.2] w-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden rounded-md pb-10 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center relative z-20 mb-3 text-gray-800 mt-4 tracking-wide">
        <Link
          href={"/"}
          className="hover:text-gray-600 transition-colors duration-300"
        >
          Care Instructions
        </Link>
      </h1>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl grid grid-cols-1 gap-4 p-4 rounded-lg border shadow-md border-gray-200 dark:border-gray-800 mx-auto bg-zinc-50">
        <div className="space-y-2">
          <div className="flex justify-center items-end mb-4">
            <HomeButton />
          </div>
          <div className="border-b-2 border-gray-200"></div>
        </div>
        {children}
        <Toaster richColors position="bottom-center" />
      </div>
    </div>
  );
}
