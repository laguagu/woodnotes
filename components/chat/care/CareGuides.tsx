import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CareGuidesProps, RugTypes } from "@/lib/definitions";
import { rugPhotos } from "@/lib/photos";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";

function formatRugTypeName(name: RugTypes): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    </div>
  );
};

export default function CareGuides({ careGuides }: CareGuidesProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoId = "HP9bhCjC4Kw"; // Replace with your actual YouTube video ID

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-light text-gray-800 mb-6 text-center">
        Care Instructions
      </h1>

      {/* Enhanced Video Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-light text-gray-700 mb-4 text-center">
          Watch Our Care Guide Video
        </h2>
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogTrigger asChild>
            <div className="relative aspect-video cursor-pointer group">
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <VideoPlayer videoId={videoId} />
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-gray-600 mb-8 text-center">
        Select a rug type below to view its specific care instructions.
      </p>

      {careGuides.map((careGuide, index) => {
        const rugType = careGuide.rugType;
        const multiPhotosRug = rugPhotos.find(
          (photo) => photo.name === rugType,
        );

        return (
          <Accordion key={index} type="single" collapsible className="mb-6">
            <AccordionItem value={rugType} className="border-none">
              <AccordionTrigger className="bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-lg text-lg font-medium text-gray-800 transition-all">
                {formatRugTypeName(rugType)}
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-0">
                    <Carousel className="w-full max-w-xl mx-auto">
                      <CarouselContent>
                        {careGuide.instructions &&
                          Object.entries(careGuide.instructions).map(
                            ([key, instruction], idx) => {
                              const photo = multiPhotosRug?.photos[idx];
                              return (
                                <CarouselItem key={idx}>
                                  <div className="p-4">
                                    {photo && (
                                      <div className="mb-4">
                                        <Image
                                          alt="Rug care instruction"
                                          src={photo.imageSrc}
                                          height={400}
                                          width={400}
                                          className="rounded-lg shadow-sm object-cover w-full h-64"
                                        />
                                      </div>
                                    )}
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                      {instruction}
                                    </p>
                                  </div>
                                </CarouselItem>
                              );
                            },
                          )}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}
