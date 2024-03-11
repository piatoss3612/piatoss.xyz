"use client";

import React, { useState } from "react";

import { Flex, SlideFade } from "@chakra-ui/react";
import ProfileCard from "@/components/ProfileCard";
import SupportCard from "@/components/SupportCard";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <Flex alignItems="center" justify="center" height="100vh">
      {!isFlipped && (
        <SlideFade in={!isFlipped} offsetY="20px">
          <ProfileCard flipCard={flipCard} />
        </SlideFade>
      )}
      {isFlipped && (
        <SlideFade in={isFlipped} offsetY="20px">
          <SupportCard flipCard={flipCard} />
        </SlideFade>
      )}
    </Flex>
  );
};

export default CardFlip;
