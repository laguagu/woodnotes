"use client";
import { useSearchParams } from "next/navigation";
import { careInstructions } from "@/lib/hoitoOhjeet";
import { RugTypes } from "@/lib/definitions";
import CareGuides from "@/components/chat/care/CareGuides";

function Page() {
  const searchParams = useSearchParams();
  const rugTypesParam = searchParams.get('rugTypes');
  const rugTypes = rugTypesParam ? rugTypesParam.split(',') as RugTypes[] : [];

  const careGuides = rugTypes.map((rugType) => {
    return {
      rugType: rugType,
      instructions: careInstructions[rugType],
    };
  });

  return (
    <div>
      <CareGuides careGuides={careGuides} />
    </div>
  );
}

export default Page;