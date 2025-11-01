# DApp Todo - Decentralized To-Do List Application

A fully functional decentralized to-do list application built with Hardhat 3, Solidity, and vanilla JavaScript. Tasks are stored on the blockchain, ensuring persistence and user ownership.

## 🚀 Project Status

✅ **Fully Built and Ready to Deploy!**

- ✅ Smart contracts compiled
- ✅ Test suite created
- ✅ Deployment scripts ready
- ✅ Frontend configured with full ABI
- ✅ Complete documentation

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Testing](#testing)

## ✨ Features

- **Add Tasks**: Create new to-do items on the blockchain
- **Toggle Completion**: Mark tasks as complete/incomplete
- **User-Specific**: Each wallet address has their own private task list
- **Persistent Storage**: Tasks are stored on-chain, so they persist forever
- **Event Logging**: Contract emits events for task creation and completion

## 🛠 Tech Stack

- **Smart Contract**: Solidity 0.8.28
- **Development Framework**: Hardhat 3.0
- **Testing**: Mocha, Chai, Ethers.js v6
- **Frontend**: Vanilla JavaScript with Ethers.js v5
- **Blockchain**: Ethereum (Local Hardhat Network / Testnets)

## 📁 Project Structure

```
dapp-todo/
├── contracts/
│   └── todolist.sol          # Main TodoList smart contract
├── test/
│   └── TodoList.ts           # Comprehensive test suite
├── scripts/
│   └── deploy-todolist.ts    # Deployment script
├── ignition/
│   └── modules/
│       └── TodoList.ts       # Ignition deployment module
├── artifacts/                # Compiled contracts
├── index.html                # Frontend DApp interface
├── hardhat.config.ts         # Hardhat configuration
└── package.json              # Dependencies
```

## 🏁 Getting Started

### Prerequisites

- Node.js v18+ installed
- npm or yarn package manager
- MetaMask browser extension (for frontend)

### Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

## 🚢 Deployment

### Option 1: Deploy to Local Hardhat Network (Recommended for Testing)

1. **Start Hardhat node in one terminal:**
   ```bash
   npx hardhat node
   ```
   This starts a local blockchain on `http://127.0.0.1:8545`

2. **Deploy contract in another terminal:**
   ```bash
   npx hardhat run scripts/deploy-todolist.ts --network localhost
   ```
   
3. **Copy the deployed contract address** from the output

4. **Update `index.html`:**
   - Open `index.html`
   - Find `CONTRACT_ADDRESS` (around line 129)
   - Replace `'0xYourDeployedContractAddressHere'` with your deployed address

### Option 2: Deploy to Testnet (Sepolia)

1. **Configure network in `hardhat.config.ts`:**
   ```typescript
   networks: {
     sepolia: {
       url: process.env.SEPOLIA_RPC_URL || "",
       accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
     },
   }
   ```

2. **Set environment variables:**
   ```bash
   export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_INFURA_KEY"
   export PRIVATE_KEY="your_private_key_here"
   ```

3. **Deploy:**
   ```bash
   npx hardhat run scripts/deploy-todolist.ts --network sepolia
   ```

## 💻 Usage

### Frontend Setup

1. **Open `index.html` in your browser**

2. **Connect MetaMask:**
   - Click "Connect Wallet"
   - Approve the connection request
   - Ensure MetaMask is connected to the correct network:
     - **Local**: `http://127.0.0.1:8545` (Chain ID: 31337)
     - **Sepolia**: Sepolia Test Network (Chain ID: 11155111)

3. **Import Hardhat Account (for local testing):**
   - When running `npx hardhat node`, you'll see account private keys
   - Import one into MetaMask for testing

### Using the DApp

1. **Add a Task:**
   - Type your task in the input field
   - Click "Add Task"
   - Confirm the transaction in MetaMask

2. **Toggle Completion:**
   - Click the "Complete" button next to any task
   - Confirm the transaction
   - The task will be marked as complete (strikethrough)

3. **View Tasks:**
   - Your tasks load automatically after connecting
   - Tasks are user-specific - each wallet sees only their own tasks

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

Or run specific test files:

```bash
npx hardhat test test/TodoList.ts
```

**Test Coverage:**
- ✅ Contract deployment
- ✅ Adding tasks
- ✅ Toggling task completion
- ✅ Task retrieval
- ✅ User isolation (tasks are private per address)
- ✅ Invalid input handling

## 📝 Smart Contract Functions

### `addTask(string memory _text)`
Adds a new task for the caller.

### `toggleComplete(uint _id)`
Toggles the completion status of a task by ID.

### `getMyTasks()`
Returns all tasks for the caller as an array.

### Events
- `TaskCreated(uint id, string text, address indexed user)`
- `TaskCompleted(uint id, bool complete, address indexed user)`

## 🔧 Configuration

### Network Configuration

The project is pre-configured for:
- **Hardhat local network** (default)
- **Sepolia testnet** (commented out, ready to enable)

### Frontend Configuration

The frontend uses Ethers.js v5 for compatibility with MetaMask. The ABI is already included in `index.html` - you only need to update the contract address after deployment.

## 🐛 Troubleshooting

### Deployment Issues

- **"Cannot find module"**: Run `npm install --legacy-peer-deps`
- **"Network not found"**: Ensure Hardhat node is running for localhost deployments
- **Transaction failures**: Check you have enough ETH/gas on the network

### Frontend Issues

- **"Contract not found"**: Verify contract address is correct in `index.html`
- **MetaMask connection fails**: Ensure MetaMask is installed and unlocked
- **Wrong network**: Check MetaMask is connected to the correct network (localhost or Sepolia)

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask Documentation](https://docs.metamask.io/)

## 📄 License

ISC

---

**Built with ❤️ using Hardhat 3**
