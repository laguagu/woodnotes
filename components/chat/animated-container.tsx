import { mediaInputVariants } from "@/lib/animation-config";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  isVisible: boolean;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  isVisible,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={mediaInputVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedContainer;
