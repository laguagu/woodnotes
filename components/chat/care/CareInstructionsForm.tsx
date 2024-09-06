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
    message: "Please select at least one rug type.",
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
      toast.info("Confirm Rug Types", {
        description:
          "Please verify the rug types suggested by AI. If unsure, contact support@woodnotes.fi",
        duration: 10000,
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
          className="space-y-6 p-6 rounded-lg shadow-sm bg-gray-50 w-full max-w-md"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">Detected Rug Types</h2>
            <FormDescription className="text-sm text-gray-600">
              Please confirm or adjust the detected rug types.
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="rugTypes"
            render={() => (
              <FormItem>
                <div className="space-y-2">
                  {(Object.keys(detectedRugTypes) as RugTypes[]).map((key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name="rugTypes"
                      render={({ field }) => (
                        <FormItem
                          key={key}
                          className="flex items-center space-x-3"
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
                          <FormLabel className="text-sm font-normal">
                            {rugTypeLabels[key]}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage className="text-sm text-red-500 mt-2" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!clickedOk}
            className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Get Care Instructions
          </Button>
        </form>
      </Form>
    </div>
  );
}
