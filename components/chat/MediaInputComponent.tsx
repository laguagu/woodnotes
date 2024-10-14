"use client";
import { CameraSkeleton, SmoothLoader } from "@/components/chat/skeletons";
import { Button } from "@/components/ui/button";
import { mediaInputVariants } from "@/lib/animation-config";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Check, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useTransition } from "react";
import Webcam from "react-webcam";
import { ExampleImages } from "./photos/example-images";

interface WoodnotesMediaInputComponentProps {
  handleDetectRug: (value: string) => void;
  imageURL: string | null;
  setImageURL: (value: string | null) => void;
}

export default function WoodnotesMediaInputComponent({
  handleDetectRug,
  setImageURL,
  imageURL,
}: WoodnotesMediaInputComponentProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPending, startTransition] = useTransition();

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageURL(screenshot);
    } else {
      console.error("Failed to capture image");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      startTransition(async () => {
        try {
          const response = await fetch("/api/visio/resizeImage/", {
            method: "POST",
            body: file,
          });

          if (!response.ok) {
            throw new Error("Failed to resize image");
          }

          const resizedImage = await response.text();
          setImageURL(resizedImage);
        } catch (error) {
          console.error("Error processing image:", error);
          // Tässä voit lisätä virheilmoituksen käyttäjälle
        }
      });
    }
  };

  const handleExampleClick = async (src: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImageURL(base64data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading example image:", error);
    }
  };

  const sendImageToAI = async (imageURL: string) => {
    if (imageURL) {
      handleDetectRug(imageURL);
      setImageURL(null);
    }
  };

  const resetStates = () => {
    setImageURL(null);
  };

  const videoConstraints = {
    width: { ideal: 620 },
    height: { ideal: 520 },
    facingMode: { ideal: "environment" },
  };

  const handleCameraStart = () => {
    setLoadingCamera(false);
    setIsWebcamReady(true);
    setIsCameraActive(true);
  };

  const handleCameraError = (error: any) => {
    console.error("Camera error:", error);
    setCameraError(error.message);
    setLoadingCamera(false);
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    setLoadingCamera(!isCameraActive);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 my-8 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isCameraActive && !imageURL && (
          <motion.div
            key="instructions"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center p-6 bg-gray-50 rounded-lg shadow-sm border"
          >
            <Image
              priority
              alt="Capture your Woodnotes rug"
              src="/steps/instructions.png"
              height={250}
              width={250}
              style={{ width: "auto", height: "auto" }}
              className="mx-auto mb-4 rounded-lg object-cover"
            />
            <p className="text-gray-700">
              Take a clear, well-lit photo of your rug, ensuring all key details
              are visible.
            </p>
          </motion.div>
        )}

        {loadingCamera && !imageURL && (
          <motion.div
            key="camera-skeleton"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CameraSkeleton />
          </motion.div>
        )}

        {!imageURL && (
          <motion.div
            key="camera-buttons"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <Button
              disabled={isPending}
              onClick={toggleCamera}
              variant="outline"
              className="w-full sm:w-1/2 h-auto py-3 px-4 flex items-center justify-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              <span>{isCameraActive ? "Deactivate" : "Activate"} Camera</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-1/2 h-auto py-3 px-4 flex items-center justify-center"
              disabled={isPending}
            >
              {isPending ? (
                <SmoothLoader />
              ) : (
                <Upload className="w-5 h-5 mr-2" />
              )}
              <span>{isPending ? "Processing..." : "Upload Image"}</span>
            </Button>
          </motion.div>
        )}

        {isCameraActive && !imageURL && (
          <motion.div
            key="webcam"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className={`rounded-lg ${isWebcamReady ? "" : "hidden"}`}
              onUserMedia={handleCameraStart}
              onUserMediaError={handleCameraError}
            />
            {isWebcamReady && (
              <Button
                onClick={captureImage}
                variant="outline"
                className="w-40 mt-4"
              >
                Take Photo
                <Camera className="w-4 h-4 ml-2" />
              </Button>
            )}
          </motion.div>
        )}

        {imageURL && (
          <motion.div
            key="image-preview"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-50 p-6 rounded-lg shadow-sm"
          >
            <Image
              src={imageURL}
              alt="Preview"
              className="rounded-lg object-contain max-h-96 w-full"
              width={640}
              height={360}
            />
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => sendImageToAI(imageURL)}
                className="w-40"
              >
                Detect Rug Type
                <Check className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={resetStates} className="w-40">
                New Picture
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {cameraError && !imageURL && (
          <motion.div
            key="camera-error"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center text-red-600"
          >
            <p>
              Error: {cameraError}
              <br />
              Please use a device with a camera or upload an image.
            </p>
          </motion.div>
        )}
        {!isCameraActive && !imageURL && (
          <motion.div
            key="example-images"
            variants={mediaInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ExampleImages onExampleClick={handleExampleClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
