"use client";

import React, { useState } from "react";

import { Flex } from "@chakra-ui/react";
import ProfileCard from "@/components/ProfileCard";
import SupportCard from "@/components/SupportCard";
import { motion } from "framer-motion";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 360 : 0 }}
        transition={{
          flip: { duration: 2, ease: "easeInOut" },
          transformOrigin: "left center",
        }}
      >
        {!isFlipped && <ProfileCard flipCard={flipCard} />}
        {isFlipped && <SupportCard flipCard={flipCard} />}
      </motion.div>
    </Flex>
  );
};

export default CardFlip;
