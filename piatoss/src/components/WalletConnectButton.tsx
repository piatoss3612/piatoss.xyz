import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Stack } from "@chakra-ui/react";

export default function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    w="full"
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    color="white"
                    rounded="xl"
                    boxShadow="md"
                    _hover={{
                      bgGradient: "linear(to-r, blue.300, purple.400)",
                    }}
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    w="full"
                    bgGradient="linear(to-r, red.300, red.500)"
                    color="white"
                    rounded="xl"
                    boxShadow="md"
                    _hover={{ bgGradient: "linear(to-r, red.200, red.400)" }}
                    onClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Stack
                  direction="row"
                  spacing={2}
                  align="center"
                  justifyContent="center"
                  m={1}
                >
                  <Button onClick={openChainModal}>
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: "1rem",
                          height: "1rem",
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <Button onClick={openAccountModal}>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </Stack>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
