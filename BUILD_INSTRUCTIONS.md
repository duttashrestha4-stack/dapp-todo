# Build Instructions for DApp Todo

## Current Status
✅ Contracts compiled
✅ Test suite created
⚠️ Deployment script needs Hardhat node running

## Quick Build Steps

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Compile Contracts
```bash
npx hardhat compile
```

### 3. Run Tests
```bash
npm test
```

### 4. Deploy Contract

**Option A: Using Hardhat Node (Recommended)**
```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Deploy to local node
npx hardhat run scripts/deploy-todolist.ts --network localhost
```

**Option B: Using In-Memory Network**
```bash
# Deploy to in-memory network (for quick testing)
npx hardhat run scripts/deploy-todolist.ts
```

After deployment, copy the contract address and update `index.html`.

### 5. Update Frontend

1. Get contract address from deployment output
2. Get ABI from `artifacts/contracts/todolist.sol/TodoList.json`
3. Update `index.html`:
   - Replace `CONTRACT_ADDRESS` with deployed address
   - Replace `CONTRACT_ABI` with full ABI from artifacts

### 6. Run Frontend

Open `index.html` in a browser with MetaMask installed and connected to:
- Local network: `http://127.0.0.1:8545`
- Chain ID: 31337 (Hardhat default)

## Project Structure

```
dapp-todo/
├── contracts/
│   └── todolist.sol          # Main TodoList contract
├── test/
│   └── TodoList.ts           # Test suite
├── scripts/
│   └── deploy-todolist.ts    # Deployment script
├── ignition/
│   └── modules/
│       └── TodoList.ts       # Ignition deployment module
├── artifacts/                # Compiled contracts
├── index.html                # Frontend DApp
└── hardhat.config.ts         # Hardhat configuration
```

## Troubleshooting

### Deployment Script Issues
If deployment script fails, ensure Hardhat node is running:
```bash
npx hardhat node
```

### Frontend Connection Issues
- Ensure MetaMask is connected to local Hardhat network
- Network URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Import Hardhat accounts into MetaMask for testing

### Contract Not Found
- Ensure contracts are compiled: `npx hardhat compile`
- Check artifact exists: `artifacts/contracts/todolist.sol/TodoList.json`

