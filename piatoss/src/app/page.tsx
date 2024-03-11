import React from "react";
import { Flex } from "@chakra-ui/react";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <ProfileCard />
    </Flex>
  );
}
