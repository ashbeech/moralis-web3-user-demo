import React from "react";
// moralis dependancies
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import Address from "./Address/Address";
import { getExplorer } from "../helpers/networks";
// ui dependancies
import { SelectOutlined } from "@ant-design/icons";
import { Box, Button, VStack } from "@chakra-ui/react";

const Account = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();

  if (!isAuthenticated) {
    return (
      <Box>
        <Button
          mt={4}
          colorScheme="white"
          isFullWidth={true}
          variant="link"
          isDisabled={false}
          onClick={() =>
            authenticate({
              signingMessage: "Connect to our site via your wallet.",
            })
          }
        >
          ϟ Connect Wallet
        </Button>
      </Box>
    );
  }

  return (
    <>
      <VStack>
        <Box>
          <Box
            className="flex-child"
            style={{ marginTop: "10px", padding: "0 10px" }}
          >
            <Address
              avatar="left"
              size={12}
              copyable
              style={{ fontSize: "20px" }}
            />
            <a
              href={`${getExplorer(chainId)}address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined
                style={{
                  marginRight: "5px",
                  top: "-3px",
                  position: "relative",
                }}
              />
              View on Explorer
            </a>
          </Box>
          <Box
            className="flex-child"
            style={{ marginTop: "10px", padding: "0 10px" }}
          >
            <Button
              mt={4}
              colorScheme="white"
              isFullWidth={true}
              variant="link"
              isDisabled={false}
              onClick={() => {
                logout();
              }}
            >
              ϟ Disconnect Wallet
            </Button>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default Account;
