"use client";

import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ProfileCard from "@/components/ProfileCard";
import SupportCard from "@/components/SupportCard";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <Flex alignItems="center" justify="center" height="100vh" overflow="hidden">
      {!isFlipped && <ProfileCard flipCard={flipCard} />}
      {isFlipped && <SupportCard flipCard={flipCard} />}
    </Flex>
  );
};

export default CardFlip;
