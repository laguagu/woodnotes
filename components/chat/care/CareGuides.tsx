import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CareGuidesProps, RugTypes } from "@/lib/definitions";
import { rugPhotos } from "@/lib/photos";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

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
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-light text-gray-800 mb-6 text-center"
        variants={itemVariants}
      >
        Care Instructions
      </motion.h1>

      {/* Enhanced Video Section */}
      <motion.div className="mb-12" variants={itemVariants}>
        <h2 className="text-2xl font-light text-gray-700 mb-4 text-center">
          Watch Our Care Guide Video
        </h2>
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogTrigger asChild>
            <motion.div
              className="relative aspect-video cursor-pointer group"
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                priority
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogTitle className="sr-only">Care Guide Video</DialogTitle>
            <DialogDescription className="sr-only">
              This video provides detailed instructions on how to care for your
              Woodnotes rugs.
            </DialogDescription>
            <VideoPlayer videoId={videoId} />
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.p
        className="text-gray-600 mb-8 text-center"
        variants={itemVariants}
      >
        Select a rug type below to view its specific care instructions.
      </motion.p>

      <AnimatePresence>
        {careGuides.map((careGuide, index) => {
          const rugType = careGuide.rugType;
          const multiPhotosRug = rugPhotos.find(
            (photo) => photo.name === rugType,
          );

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Accordion type="single" collapsible className="mb-6">
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
                                      <motion.div
                                        className="p-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
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
                                      </motion.div>
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
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
