// Hardhat 3 Deployment Script
// Uses the same pattern as test files

import { network } from "hardhat";
import { writeFileSync } from "fs";

// Use top-level await like in test files - this is the working pattern
const { ethers } = await network.connect();

console.log("🚀 Deploying TodoList contract...");

// Get the signer
const [deployer] = await ethers.getSigners();
console.log("📝 Deploying with account:", deployer.address);

const balance = await ethers.provider.getBalance(deployer.address);
console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

// Deploy the contract
console.log("⏳ Deploying contract...");
const todoList = await ethers.deployContract("TodoList");

await todoList.waitForDeployment();

const address = await todoList.getAddress();
console.log("\n✅ Deployment successful!");
console.log("📍 Contract address:", address);

// Write address to file for frontend
const deploymentInfo = {
  address: address,
  network: "hardhat",
  deployedAt: new Date().toISOString(),
  deployer: deployer.address
};

writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));
console.log("💾 Deployment info saved to deployment.json");

// Display instructions
console.log("\n" + "=".repeat(60));
console.log("🎉 Contract deployed successfully!");
console.log("=".repeat(60));
console.log("\n📋 Next steps:");
console.log("1. Copy this address:", address);
console.log("2. Open index.html");
console.log("3. Replace CONTRACT_ADDRESS on line 129 with:", address);
console.log("4. Open index.html in your browser!");
console.log("\n" + "=".repeat(60) + "\n");

