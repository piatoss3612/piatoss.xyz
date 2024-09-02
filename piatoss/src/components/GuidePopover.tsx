import {
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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaQuestion, FaArrowRight } from "react-icons/fa6";

export default function GuidePopover() {
  const [page, setPage] = useState<number>(1);
  const initialFocusRef = useRef<{ focus(): void }>(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
              size="sm"
              borderRadius="full"
            />
          </PopoverTrigger>
          <PopoverContent bg={bgColor} borderColor={borderColor} boxShadow="xl">
            <PopoverArrow bg={bgColor} />
            <PopoverCloseButton />
            <PopoverHeader
              pt={4}
              fontWeight="bold"
              border="0"
              color={textColor}
            >
              {page === 1 ? "Support $4 USD" : "Level Up with NFT"}
            </PopoverHeader>
            <PopoverBody>
              <Stack spacing={4} align="center">
                {page === 1 ? (
                  <>
                    <Image
                      src="https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmPCo5NSM6f9aexc6FAzNLR1M41cJcdR8ZRm8H45jCavnr"
                      alt="NFT example"
                      width={120}
                      height={120}
                    />
                    <Text fontSize="sm" color={textColor} textAlign="center">
                      Support crypto equivalent to $4.00 USD for the first time
                      and get a NFT as a gift!
                    </Text>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={4} align="center">
                      <Image
                        src="https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmPCo5NSM6f9aexc6FAzNLR1M41cJcdR8ZRm8H45jCavnr"
                        alt="Basic NFT"
                        width={100}
                        height={100}
                      />
                      <FaArrowRight
                        color={useColorModeValue("gray.500", "gray.400")}
                      />
                      <Image
                        src="https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmbP1Dn6jk2WHxYRztuyeonZk4FG3BLM1hQqPUsnbtuyBf"
                        alt="Upgraded NFT"
                        width={100}
                        height={100}
                      />
                    </Stack>
                    <Text fontSize="sm" color={textColor} textAlign="center">
                      Support more and get a higher level NFT!
                    </Text>
                  </>
                )}
              </Stack>
            </PopoverBody>
            <PopoverFooter
              border="0"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <Text fontSize="xs" color={textColor}>
                Step {page} of 2
              </Text>
              <ButtonGroup size="sm">
                {page === 2 && (
                  <Button variant="ghost" onClick={() => handleMovePage(1)}>
                    Prev
                  </Button>
                )}
                {page === 1 ? (
                  <Button
                    colorScheme="blue"
                    ref={initialFocusRef as React.RefObject<HTMLButtonElement>}
                    onClick={() => handleMovePage(2)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button colorScheme="green" onClick={onClose}>
                    Close
                  </Button>
                )}
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
