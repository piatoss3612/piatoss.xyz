import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { FaQuestion, FaArrowRight } from "react-icons/fa6";

export default function GuidePopover() {
  const [page, setPage] = useState<number>(1);

  const initialFocusRef = useRef<{
    focus(): void;
  }>(null);

  const handleMovePage = (page: number) => {
    setPage(page);
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              aria-label="guide"
              icon={<FaQuestion />}
              variant="outline"
            />
          </PopoverTrigger>
          {page === 1 && (
            <PopoverContent>
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Support $4 USD
              </PopoverHeader>
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverBody m={2}>
                <Box
                  maxW="lg"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Image
                    src="https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmPCo5NSM6f9aexc6FAzNLR1M41cJcdR8ZRm8H45jCavnr"
                    alt="example"
                    width={100}
                    height={100}
                  />
                </Box>
                Support crypto equivalent to $4.00 USD for the first time and
                get a NFT as a gift!
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <Box fontSize="sm">Step 1 of 2</Box>
                <ButtonGroup size="sm">
                  <Button
                    colorScheme="blue"
                    ref={initialFocusRef as React.RefObject<HTMLButtonElement>}
                    onClick={() => handleMovePage(2)}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          )}
          {page === 2 && (
            <PopoverContent>
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Level Up with NFT
              </PopoverHeader>
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverBody m={2}>
                <Stack
                  direction="row"
                  spacing={4}
                  maxW="lg"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Image
                    src="https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmPCo5NSM6f9aexc6FAzNLR1M41cJcdR8ZRm8H45jCavnr"
                    alt="example"
                    width={100}
                    height={100}
                  />
                  <FaArrowRight />
                  <Image
                    src="https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmbP1Dn6jk2WHxYRztuyeonZk4FG3BLM1hQqPUsnbtuyBf"
                    alt="example"
                    width={100}
                    height={100}
                  />
                </Stack>
                Support more and get a higher level NFT!
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <Box fontSize="sm">Step 2 of 2</Box>
                <ButtonGroup size="sm">
                  <Button colorScheme="blue" onClick={() => handleMovePage(1)}>
                    Prev
                  </Button>
                  <Button colorScheme="green" onClick={onClose}>
                    Close
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          )}
        </>
      )}
    </Popover>
  );
}
