# Quick Deployment Guide

## Quick Start (Local Development)

### Method 1: Using Hardhat Console (Recommended & Works!)

#### 1. Start Hardhat Node
```bash
npm run node
```
Keep this terminal running - it provides your local blockchain.

#### 2. Open Hardhat Console (New Terminal)
```bash
npm run console
```

#### 3. Deploy in Console
Copy and paste these commands one by one:
```javascript
const { network } = await import("hardhat");
const { ethers } = await network.connect();
const todoList = await ethers.deployContract("TodoList");
await todoList.waitForDeployment();
const address = await todoList.getAddress();
console.log("\n✅ Deployed to:", address);
```

### Method 2: Quick Deploy Script (Copy-Paste Method)

1. Start Hardhat node: `npm run node`
2. Open a new terminal
3. Run: `npm run console`
4. Paste this one-liner:
```javascript
(async () => { const {network} = await import("hardhat"); const {ethers} = await network.connect(); const todoList = await ethers.deployContract("TodoList"); await todoList.waitForDeployment(); const address = await todoList.getAddress(); console.log("✅ Deployed:", address); })();
```

### 3. Update Frontend
Open `index.html` and replace line 129:
```javascript
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Your address here
```

### 4. Configure MetaMask
1. Open MetaMask
2. Add Network:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
3. Import Account from Hardhat node output (use private key)

### 5. Open Frontend
Open `index.html` in browser and connect MetaMask!

---

## Notes

- The ABI is already configured in `index.html` - no changes needed there
- Contract address is the only value you need to update
- Keep Hardhat node running while using the frontend
- Each deployment gets a new address - update `index.html` each time

