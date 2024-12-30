import { ethers } from "hardhat";
import { JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Load environment variables
  const privateKey = process.env.PRIVATE_KEY!;
  const contractAddress = "0x3aE0b908614c8A14C66d2790D08807da833A1809";
  const rpcUrl = "https://rpc.sepolia-api.lisk.com/";

  if (!privateKey || !contractAddress || !rpcUrl) {
    throw new Error("Please set PRIVATE_KEY, CONTRACT_ADDRESS, and NETWORK_URL in your .env file");
  }

  // Connect to the network
  const provider = new JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  console.log(`Using account: ${signer.address}`);

  // Load the contract ABI
  const contractABI = [
    "function createNote(string title, string description) public",
    "function getAllNotes() public view returns (tuple(uint256 id, string title, string description)[])",
    "function deleteNote(uint256 id) public"
  ];

  // Connect to the deployed contract
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Test creating a note
  // console.log("Adding a new note...");
  // const tx = await contract.createNote("Test Note3", "This is a test note3.");
  // console.log(`Transaction hash: ${tx.hash}`);
  // await tx.wait();
  // console.log("Note added successfully!");

  // Fetch and log all notes
  console.log("Fetching all notes...");
  const notes: any[] = await contract.getAllNotes();
  console.log("Notes:", notes.map(note => ({
    id: note.id.toString(),
    title: note.title,
    description: note.description
  })));

  console.log("Deleting a note...");
  const deletedTx = await contract.deleteNote(1);
  console.log(`Transaction hash: ${deletedTx.hash}`);
  await deletedTx.wait();
  console.log("Note deleted successfully!");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
