"use client";
import WoodnotesMediaInputComponent from "@/components/chat/MediaInputComponent";
import WoodnotesCareInstructionsForm from "@/components/chat/care/CareInstructionsForm";
import Error from "@/components/chat/error";
import { FormSkeleton } from "@/components/chat/skeletons";
import { detectRugType } from "@/lib/actions";
import { fadeVariants } from "@/lib/animation-config";
import { DetectedRugTypes } from "@/lib/definitions";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [detectedRugTypes, setDetectedRugTypes] =
    useState<DetectedRugTypes | null>(null);
  const [isDetectingRug, setIsDetectingRug] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDetectRug = async (image_url: string) => {
    setIsDetectingRug(true);
    setError(null);
    try {
      console.log("Detecting rug types");
      const rugTypes = await detectRugType(image_url);
      console.log("Detected rug types:", rugTypes);
      setDetectedRugTypes(rugTypes);
      console.log("Detected rug types:", rugTypes);
      setIsDetectingRug(false);
    } catch (error) {
      setError((error as Error).message);
      setIsDetectingRug(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
    >
      <AnimatePresence mode="wait">
        {error && !imageURL && (
          <motion.div
            key="error"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Error cameraError={error} />
          </motion.div>
        )}
        {!detectedRugTypes && !isDetectingRug && (
          <motion.div
            key="mediaInput"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <WoodnotesMediaInputComponent
              handleDetectRug={handleDetectRug}
              setImageURL={setImageURL}
              imageURL={imageURL}
            />
          </motion.div>
        )}
        {isDetectingRug && (
          <motion.div
            key="formSkeleton"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex justify-center"
          >
            <FormSkeleton />
          </motion.div>
        )}
        {detectedRugTypes && (
          <motion.div
            key="careInstructions"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <WoodnotesCareInstructionsForm
              detectedRugTypes={detectedRugTypes}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
