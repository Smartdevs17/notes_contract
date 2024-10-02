// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const NotesContractModule = buildModule("NotesContractModule", (m) => {

  const notesContract = m.contract("NotesContract");
  return { notesContract };
});

export default NotesContractModule;
