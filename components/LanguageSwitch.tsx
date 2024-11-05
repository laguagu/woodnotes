"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LanguageSwitch() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string | null>(null);

  useEffect(() => {
    // Tarkista kieli cookiesta vain client-puolella
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="));

    setCurrentLang(cookieValue ? cookieValue.split("=")[1] : "en");
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === "fi" ? "en" : "fi";
    document.cookie = `NEXT_LOCALE=${newLang}; path=/`;
    setCurrentLang(newLang);
    router.refresh();
  };

  // Älä renderöi mitään ennen kuin currentLang on asetettu
  if (currentLang === null) {
    return null;
  }

  return (
    <Button
      onClick={toggleLanguage}
      className="relative sm:fixed sm:top-4 sm:right-4 z-50 bg-white text-black border border-gray-200 hover:bg-gray-100 text-sm sm:text-base"
    >
      {currentLang === "fi" ? "In English" : "Suomeksi"}
    </Button>
  );
}
