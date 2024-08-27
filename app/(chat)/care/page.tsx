"use client";
import React, { useState } from "react";
import { detectRugType } from "@/lib/actions";
import WoodnotesCareInstructionsForm from "@/components/chat/care/CareInstructionsForm";
import { FormSkeleton } from "@/components/chat/skeletons";
import WoodnotesMediaInputComponent from "@/components/chat/MediaInputComponent";
import Error from "@/components/chat/error";
import { DetectedRugTypes } from "@/lib/definitions";

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
      setDetectedRugTypes(rugTypes);
      console.log("Detected rug types:", rugTypes);
      setIsDetectingRug(false);
    } catch (error) {
      setError((error as Error).message);
      setIsDetectingRug(false);
    }
  };

  return (
    <div>
      {error && !imageURL && <Error cameraError={error} />}
      {!detectedRugTypes && !isDetectingRug && (
        <WoodnotesMediaInputComponent
          handleDetectRug={handleDetectRug}
          setImageURL={setImageURL}
          imageURL={imageURL}
        />
      )}
      {isDetectingRug && (
        <div className="flex justify-center">
          <FormSkeleton />
        </div>
      )}
      {detectedRugTypes && (
        <WoodnotesCareInstructionsForm detectedRugTypes={detectedRugTypes} />
      )}
    </div>
  );
}
