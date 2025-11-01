// Simple deployment script that works with Hardhat node
const hre = require("hardhat");

async function main() {
  console.log("Deploying TodoList contract...");
  
  const TodoList = await hre.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();
  
  await todoList.waitForDeployment();
  
  const address = await todoList.getAddress();
  console.log("\n✅ Deployment successful!");
  console.log("TodoList deployed to:", address);
  
  // Write deployment info
  const fs = require("fs");
  const deploymentInfo = {
    address: address,
    network: "localhost",
    deployedAt: new Date().toISOString()
  };
  fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to deployment.json");
  
  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

