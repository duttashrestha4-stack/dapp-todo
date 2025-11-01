import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-ignition";


const config: HardhatUserConfig = {
  // Use the Solidity compiler version you successfully downloaded
  solidity: "0.8.28",
  
  // Minimal network setup for local testing
  networks: {
    hardhat: {
      type: "edr-simulated",
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      type: "http",
    },
    // Optional: Example for deploying to a testnet later (e.g., Sepolia)
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL || "", // Reads RPC URL from environment variables
    //   accounts: 
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [], // Reads private key
    // },
  },
  // Optional: To enable Etherscan verification, install @nomicfoundation/hardhat-verify
  // and uncomment the following:
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // }
};

export default config;