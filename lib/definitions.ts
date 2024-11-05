export type RugTypes =
  | "paperYarnRugs"
  | "handKnottedRugs"
  | "tuftedRugs"
  | "outdoorRugs"
  | "cottonPaperYarnRugs"
  | "woolPaperYarnRugs";

export type DetectedRugTypes = {
  [K in RugTypes]: boolean;
};

export type RugCareInstructions = {
  [K in RugTypes]?: {
    "1": string;
    "2": string;
    "3"?: string;
    "4"?: string;
    "5"?: string;
  };
};

export type RugInstructions = {
  rugType: RugTypes;
  instructions: RugCareInstructions[RugTypes];
};

export type CareInstructionsFormProps = {
  detectedRugTypes: DetectedRugTypes;
};

export interface CareGuidesProps {
  careGuides: RugInstructions[];
}
