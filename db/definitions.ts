export interface WoodnotesFeedback {
  id: string; // UUID auto-generated
  carpet_type: string;
  ai_recognition_successful: boolean;
  care_instruction_rating: number;
  overall_rating: number;
  comment?: string;
  created_at: Date; // TIMESTAMP WITH TIME ZONE auto-generated
}
