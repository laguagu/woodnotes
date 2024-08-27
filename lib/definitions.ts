export type RugTypes = 
  "paperYarnRugs" |
  "handKnottedRugs" |
  "tuftedRugs" |
  "outdoorRugs" |
  "duetto" |
  "piccolo" |
  "minore";

export type DetectedRugTypes = {
  [K in RugTypes]: boolean;
};

export type RugCareInstructions = {
  [K in RugTypes]?: {
    "1": string;
    "2": string;
    "3"?: string;
    "4"?: string;
  };
};

export type RugInstructions = {
  rugType: RugTypes;
  instructions:
    | { "1": string; "2": string; "3"?: string; "4"?: string }
    | undefined;
};

export type CareInstructionsFormProps = {
  detectedRugTypes: DetectedRugTypes;
};

export interface CareGuidesProps {
  careGuides: RugInstructions[];
}