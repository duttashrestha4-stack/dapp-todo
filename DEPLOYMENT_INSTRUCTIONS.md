# Deployment Instructions

## ✅ Working Deployment Method

### Step 1: Start Hardhat Node
```bash
npm run node
```
**Keep this terminal running!**

### Step 2: Open Console (New Terminal)
```bash
npm run console
```

### Step 3: Deploy Contract
Copy and paste this into the console:

```javascript
const { network } = await import("hardhat");
const { ethers } = await network.connect();
const todoList = await ethers.deployContract("TodoList");
await todoList.waitForDeployment();
const address = await todoList.getAddress();
console.log("\n✅ Deployment successful!");
console.log("📍 Contract address:", address);
```

### Step 4: Copy the Address
Copy the contract address from the output.

### Step 5: Update Frontend
1. Open `index.html`
2. Find line 129: `const CONTRACT_ADDRESS = '...';`
3. Replace with your deployed address
4. Save the file

### Step 6: Use the DApp
1. Open `index.html` in your browser
2. Connect MetaMask to `http://127.0.0.1:8545` (Chain ID: 31337)
3. Import one of the Hardhat accounts into MetaMask
4. Start using your DApp!

---

## 📝 Quick Reference

**One-Liner Deployment (paste into console):**
```javascript
(async () => { const {network} = await import("hardhat"); const {ethers} = await network.connect(); const todoList = await ethers.deployContract("TodoList"); await todoList.waitForDeployment(); const address = await todoList.getAddress(); console.log("✅ Deployed:", address); })();
```

**MetaMask Setup:**
- Network Name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency: `ETH`

---

## 🐛 Troubleshooting

**Issue:** Console shows "Cannot connect"
- **Solution:** Make sure Hardhat node is running first

**Issue:** Deployment fails
- **Solution:** Ensure contracts are compiled: `npm run compile`

**Issue:** MetaMask can't connect
- **Solution:** Verify the node is running and URL is correct

