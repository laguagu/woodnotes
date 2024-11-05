"use client";
import CareGuides from "@/components/chat/care/CareGuides";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { RugTypes } from "@/lib/definitions";
import { careInstructions } from "@/lib/hoitoOhjeet";
import { careInstructionsFi } from "@/lib/hoitoOhjeetFi";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const rugTypesParam = searchParams.get("rugTypes");
  const rugTypes = rugTypesParam
    ? (rugTypesParam.split(",") as RugTypes[])
    : [];

  const locale = useLocale();
  console.log("locale", locale);

  // Valitse oikeat ohjeet kielen perusteella
  const instructions = locale === "fi" ? careInstructionsFi : careInstructions;

  const careGuides = rugTypes.map((rugType) => {
    return {
      rugType: rugType,
      instructions: instructions[rugType],
    };
  });

  return (
    <div className="relative">
      <div className="flex justify-center sm:justify-end p-4 sm:p-0">
        <LanguageSwitch />
      </div>
      <CareGuides careGuides={careGuides} />
    </div>
  );
}

export default Page;
