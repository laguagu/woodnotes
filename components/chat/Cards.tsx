"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const stepData = [
  { step: "Step 1", description: "Take a picture" },
  { step: "Step 2", description: "Review and adjust" },
  { step: "Step 3", description: "Explore care instructions" },
];

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-8 md:py-12 bg-zinc-50">
      <div className="max-w-md w-full mx-auto space-y-4">
        {stepData.map((item, index) => (
          <MotionCard
            key={index}
            className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CardContent className="flex flex-col items-center text-center p-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-800 font-semibold text-lg mb-4">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.step}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </CardContent>
          </MotionCard>
        ))}
        <Link href="/care" className="block">
          <MotionCard
            className="overflow-hidden border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CardContent className="flex flex-col items-center text-center p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Get started
              </h3>
              <Button
                size="lg"
                className="bg-gray-800 text-white hover:bg-gray-700 w-full"
              >
                Click here
              </Button>
            </CardContent>
          </MotionCard>
        </Link>
      </div>
    </div>
  );
}
