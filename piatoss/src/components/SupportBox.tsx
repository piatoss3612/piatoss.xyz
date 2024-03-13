import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  useChainId,
  useWriteContract,
  useReadContract,
  useAccount,
  useBalance,
} from "wagmi";
import { parseEther } from "viem";
import { FourDollarV1Abi } from "@/abi/FourDollarV1";
import { FaHeart } from "react-icons/fa6";

export default function SupportBox() {
  const account = useAccount();
  const { data: balanceData } = useBalance({
    address: account.address,
  });
  const chainId = useChainId();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [amountIsInvalid, setAmountIsInvalid] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { writeContract } = useWriteContract();

  const { data: amountInUSD } = useReadContract({
    abi: FourDollarV1Abi,
    address: contractAddress as `0x${string}`,
    functionName: "calculateBaseAssetAmountInUSD",
    args: [parseEther(amount)],
  });

  useEffect(() => {
    if (!chainId) return;

    if (chainId === 80001) {
      // mumbai testnet
      setContractAddress("0x7Bb88774d8F2c15779C8f8278C4ed8E5729d1678");
    } else {
      setContractAddress("");
    }
  }, [chainId]);

  useEffect(() => {
    if (amountInUSD && !amountIsInvalid) {
      setDonationAmount(
        parseFloat((Number(amountInUSD) / 10 ** 8).toString()).toFixed(4)
      );
    } else {
      setDonationAmount("");
    }
  }, [amountInUSD]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseEther(e.target.value);
    const balance = balanceData ? balanceData.value : 0;

    if (value > balance) {
      setAmountIsInvalid(true);
      setAmount(e.target.value);
      setDonationAmount("");

      if (inputRef.current) {
        inputRef.current.blur();
      }
      return;
    } else {
      setAmountIsInvalid(false);
    }

    setAmount(e.target.value);
  };

  return (
    <Stack>
      <FormControl>
        <FormLabel>Amount to support</FormLabel>
        <Stack direction="row" alignItems="center">
          <Input
            type="number"
            ref={inputRef}
            value={amount}
            onChange={handleAmountChange}
            isInvalid={amountIsInvalid}
          />
          <Text fontSize="lg">
            {balanceData?.symbol ? balanceData.symbol : "ETHER"}
          </Text>
        </Stack>
        {amountIsInvalid && (
          <FormHelperText color={"red"}>
            Insufficient balance! 😱
          </FormHelperText>
        )}
      </FormControl>
      <Stack mt={2} mb={2}>
        <Heading lineHeight="tall">
          $ {donationAmount ? donationAmount : "0"}
        </Heading>
      </Stack>
      <Button
        isDisabled={!contractAddress || amountIsInvalid}
        w="full"
        bgGradient="linear(to-r, pink.400, red.400)"
        color="white"
        rounded="xl"
        boxShadow="md"
        _hover={{ bgGradient: "linear(to-r, pink.300, red.300)" }}
        leftIcon={<FaHeart />}
        onClick={() => {
          console.log("donate");
        }}
      >
        Support
      </Button>
    </Stack>
  );
}
