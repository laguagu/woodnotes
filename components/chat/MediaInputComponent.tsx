"use client";
import { CameraSkeleton } from "@/components/chat/skeletons";
import { Button } from "@/components/ui/button";
import { Camera, Check, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      {!isCameraActive && !imageURL && (
        <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
          <Image
            priority
            alt="Capture your Woodnotes rug"
            src="/steps/step-1.webp"
            height={200}
            width={200}
            className="mx-auto mb-4 rounded-lg object-cover"
          />
          <p className="text-gray-700">
            Capture a clear photo of your Woodnotes rug. Ensure good lighting
            and that the entire rug is visible.
          </p>
        </div>
      )}

      {loadingCamera && !imageURL && <CameraSkeleton />}

      {!imageURL && (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
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
          >
            <Upload className="w-5 h-5 mr-2" />
            <span>Upload Image</span>
          </Button>
        </div>
      )}
      {isCameraActive && !imageURL && (
        <>
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
            <Button onClick={captureImage} variant="outline" className="w-40">
              Take Photo
              <Camera className="w-4 h-4 ml-2" />
            </Button>
          )}
        </>
      )}

      {imageURL && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
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
        </div>
      )}

      {cameraError && !imageURL && (
        <div className="text-center text-red-600">
          <p>
            Error: {cameraError}
            <br />
            Please use a device with a camera or upload an image.
          </p>
        </div>
      )}
    </div>
  );
}
