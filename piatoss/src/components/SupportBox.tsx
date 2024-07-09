import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  BaseError,
  useChainId,
  useWriteContract,
  useReadContract,
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { FourDollarAddressPolygon, FourDollarV1Abi } from "@/abi/FourDollarV1";
import { FaHeart } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function SupportBox() {
  const account = useAccount();
  const { data: balanceData } = useBalance({
    address: account.address,
  });
  const chainId = useChainId();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [amountIsInvalid, setAmountIsInvalid] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    writeContract,
    data: hash,
    isSuccess,
    isPending,
    isError,
    error,
  } = useWriteContract();

  const {
    data: receipt,
    isSuccess: isConfirmed,
    isError: receiptIsError,
    error: receiptError,
    isLoading: isReceiptLoading,
  } = useWaitForTransactionReceipt({ hash });

  const { data: donationAmountInUSD } = useReadContract({
    abi: FourDollarV1Abi,
    address: contractAddress as `0x${string}`,
    functionName: "donationAmountInUSD",
    args: [account.address || "0x0"],
    query: {
      enabled: !!account.address && !!contractAddress,
    },
  });

  const accumulatedDonationAmount = parseFloat(
    (Number(donationAmountInUSD || 0) / 10 ** 8).toString()
  ).toFixed(4);

  const { data: amountInUSD } = useReadContract({
    abi: FourDollarV1Abi,
    address: contractAddress as `0x${string}`,
    functionName: "calculateBaseAssetAmountInUSD",
    args: [parseEther(amount)],
    query: {
      enabled: !!contractAddress && !!amount,
    },
  });

  const donationAmount = parseFloat(
    (Number(amountInUSD || 0) / 10 ** 8).toString()
  ).toFixed(4);

  useEffect(() => {
    if (!chainId) return;

    if (chainId === 137) {
      // polygon mainnet
      setContractAddress(FourDollarAddressPolygon);
    } else {
      setContractAddress("");
    }
  }, [chainId]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseEther(e.target.value);
    const balance = balanceData ? balanceData.value : 0;

    if (value > balance) {
      setAmountIsInvalid(true);
      setAmount(e.target.value);

      if (inputRef.current) {
        inputRef.current.blur();
      }
      return;
    } else {
      setAmountIsInvalid(false);
    }

    setAmount(e.target.value);
  };

  const handleSupport = async () => {
    if (!contractAddress) return;
    if (!amount) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter the amount you want to support.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to support $${donationAmount}!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        writeContract({
          abi: FourDollarV1Abi,
          address: contractAddress as `0x${string}`,
          functionName: "donate",
          args: [],
          value: parseEther(amount),
        });
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Thank you!",
        text: "Your support has been received.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setAmount("");
    } else if (isError) {
      Swal.fire({
        title: "Oops!",
        text: (error as BaseError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isConfirmed) {
      if (!receipt) {
        Swal.fire({
          title: "Thank you!",
          text: "Your support has been confirmed.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      let transfer = false;
      let levelUp = false;

      for (let i = 0; i < receipt.logs.length; i++) {
        const log = receipt.logs[i];

        if (
          log.topics[0] ===
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        ) {
          transfer = true;
        } else if (
          log.topics[0] ===
          "0xa49b8576e012f713baa7dceadb7d709aaec8773b498ecfe582d8b9c0c8fd074f"
        ) {
          levelUp = true;
        }
      }

      if (transfer && levelUp) {
        Swal.fire({
          title: "Congratulations!",
          text: "You've received a new NFT and leveled up!",
          imageUrl:
            "https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmPCo5NSM6f9aexc6FAzNLR1M41cJcdR8ZRm8H45jCavnr",
          imageWidth: 200,
          confirmButtonText: "OK",
        });
      } else if (transfer) {
        Swal.fire({
          title: "Thank you!",
          text: "You've received a new NFT!",
          imageUrl:
            "https://green-main-hoverfly-930.mypinata.cloud/ipfs/QmPCo5NSM6f9aexc6FAzNLR1M41cJcdR8ZRm8H45jCavnr",
          imageWidth: 200,
          confirmButtonText: "OK",
        });
      } else if (levelUp) {
        Swal.fire({
          title: "Congratulations!",
          text: "You have leveled up!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Thank you!",
          text: "Your support has been confirmed.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } else if (receiptIsError) {
      Swal.fire({
        title: "Oops!",
        text: (receiptError as BaseError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [receipt, isConfirmed, receiptIsError]);

  return (
    <Stack spacing={4}>
      <Text fontSize="sm" color="gray.500">
        {contractAddress
          ? `You have supported $${accumulatedDonationAmount} so far.`
          : "Please connect your wallet to support the project."}
      </Text>
      <FormControl>
        <FormLabel>Amount to support</FormLabel>
        <Stack direction="row" alignItems="center">
          <Input
            type="number"
            ref={inputRef}
            value={amount}
            onChange={handleAmountChange}
            isInvalid={amountIsInvalid}
            isDisabled={isPending || isReceiptLoading}
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
        <Text fontSize="sm" color="gray.500">
          You will support
        </Text>
        <Heading lineHeight="tall">
          $ {donationAmount ? donationAmount : "0"}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Verified contract can be found{" "}
          <a
            href={`https://polygonscan.com/address/${contractAddress}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            here
          </a>
        </Text>
      </Stack>
      <Button
        isDisabled={!contractAddress || amountIsInvalid}
        isLoading={isPending || isReceiptLoading}
        w="full"
        bgGradient="linear(to-r, pink.400, red.400)"
        color="white"
        rounded="xl"
        boxShadow="md"
        _hover={{ bgGradient: "linear(to-r, pink.300, red.300)" }}
        leftIcon={<FaHeart />}
        onClick={handleSupport}
      >
        Support
      </Button>
    </Stack>
  );
}
