import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/db/supabase/client";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Feedback"}
    </Button>
  );
}

async function submitFeedback(_prevState: any, formData: FormData) {
  try {
    const { error } = await supabase.from("woodnotes_feedback").insert({
      carpet_type: formData.get("rugType"),
      ai_recognition_successful: formData.get("aiRecognition") === "on",
      care_instruction_clarity: Number(formData.get("careInstructionClarity")),
      app_usability: Number(formData.get("appUsability")),
      overall_rating: Number(formData.get("overallRating")),
      comment: formData.get("comment"),
    });

    if (error) throw error;
    return { success: true, message: "Feedback submitted successfully!" };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return {
      success: false,
      message: "An error occurred while submitting feedback.",
    };
  }
}

export default function FeedbackForm({ rugType }: { rugType: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, formAction] = useFormState(submitFeedback, null);
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      if (formRef.current) {
        formRef.current.reset();
      }

      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 4100);

      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Provide Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="flex justify-between items-center">
          Feedback
        </DialogTitle>
        <DialogDescription>
          Please rate the following aspects to help us improve.
        </DialogDescription>
        <form action={formAction} ref={formRef} className="space-y-4">
          <input type="hidden" name="rugType" value={rugType} />

          <div className="space-y-2">
            <Label
              htmlFor="aiRecognition"
              className="flex items-center space-x-2"
            >
              <span>AI correctly recognized the rug type</span>
              <Input type="checkbox" id="aiRecognition" name="aiRecognition" />
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="careInstructionClarity">
              Clarity of care instructions (1-10)
            </Label>
            <Input
              id="careInstructionClarity"
              name="careInstructionClarity"
              type="number"
              min="1"
              max="10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appUsability">
              Ease of using the application (1-10)
            </Label>
            <Input
              id="appUsability"
              name="appUsability"
              type="number"
              min="1"
              max="10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overallRating">Overall satisfaction (1-10)</Label>
            <Input
              id="overallRating"
              name="overallRating"
              type="number"
              min="1"
              max="10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Additional comments or suggestions</Label>
            <Textarea id="comment" name="comment" />
          </div>

          <SubmitButton />
        </form>
        {state && (
          <p
            className={`mt-4 text-center ${
              state.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
