import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { RugTypes, CareInstructionsFormProps } from "@/lib/definitions";

const FormSchema = z.object({
  rugTypes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one rug type.",
  }),
});

export default function WoodnotesCareInstructionsForm({
  detectedRugTypes,
}: CareInstructionsFormProps) {
  const router = useRouter();
  const [clickedOk, setClickedOk] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rugTypes: Object.entries(detectedRugTypes)
        .filter(([_, value]) => value === true)
        .map(([key]) => key),
    },
  });

  const toastDisplayed = useRef(false);
  useEffect(() => {
    if (!toastDisplayed.current) {
      toast.info("Notification", {
        description:
          "Please confirm the rug types suggested by the AI. If you are unsure, please contact support@woodnotes.fi",
        duration: Infinity,
        action: {
          label: "OK",
          onClick: () => setClickedOk(true),
        },
      });
      toastDisplayed.current = true;
    }
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/care/search?rugTypes=${data.rugTypes.join(",")}`);
  }

  const rugTypeLabels: Record<RugTypes, string> = {
    paperYarnRugs: "Paper Yarn Rugs",
    handKnottedRugs: "Hand Knotted Rugs",
    tuftedRugs: "Tufted Rugs",
    outdoorRugs: "Outdoor Rugs",
    duetto: "Duetto",
    piccolo: "Piccolo",
    minore: "Minore",
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 align-middle p-4 mb-2 mt-1 rounded-lg border-2 shadow-xl bg-zinc-50 min-w-[339px] sm:min-w-[375px]"
        >
          <FormField
            control={form.control}
            name="rugTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Detected Rug Types
                  </FormLabel>
                  <FormDescription className="flex align-middle text-left text-black">
                    Confirm or adjust the detected rug types.
                  </FormDescription>
                </div>
                {(Object.keys(detectedRugTypes) as RugTypes[]).map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name="rugTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={key}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(key)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...field.value, key]
                                  : field.value?.filter(
                                      (value) => value !== key,
                                    );
                                form.setValue("rugTypes", updatedValue, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {rugTypeLabels[key]}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!clickedOk}>
            Get Care Instructions
          </Button>
        </form>
      </Form>
    </div>
  );
}
