// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const NotesModule = buildModule("NotesModule", (m) => {

  const notes = m.contract("Notes");
  return { notes };
});

export default NotesModule;
