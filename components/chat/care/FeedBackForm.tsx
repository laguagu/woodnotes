"use client";

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
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("feedback");

  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("submitting") : t("submit")}
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
    return { success: true, message: "successMessage" };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return { success: false, message: "errorMessage" };
  }
}

export default function FeedbackForm({ rugType }: { rugType: string }) {
  const t = useTranslations("feedback");
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
        <Button variant="outline">{t("button")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="flex justify-between items-center">
          {t("title")}
        </DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
        <form action={formAction} ref={formRef} className="space-y-4">
          <input type="hidden" name="rugType" value={rugType} />

          <div className="space-y-2">
            <Label
              htmlFor="aiRecognition"
              className="flex items-center space-x-2"
            >
              <span>{t("fields.aiRecognition.label")}</span>
              <Input type="checkbox" id="aiRecognition" name="aiRecognition" />
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="careInstructionClarity">
              {t("fields.careInstructionClarity.label")}
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
              {t("fields.appUsability.label")}
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
            <Label htmlFor="overallRating">
              {t("fields.overallRating.label")}
            </Label>
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
            <Label htmlFor="comment">{t("fields.comment.label")}</Label>
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
            {t(state.message)}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
