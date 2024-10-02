import { expect } from "chai";
import { ethers } from "hardhat";
import { Notes } from "../typechain-types";


describe("Notes contract", function () {
  let notes: Notes;
  beforeEach(async function () {
    const Notes = await ethers.getContractFactory("Notes");
    notes = await Notes.deploy();
  });

  it("should add a new note", async function () {
    await notes.addNote("Test Title", "Test Content");
    const note = await notes.getNote(1);
    expect(note.id).to.equal(1);
    expect(note.title).to.equal("Test Title");
    expect(note.content).to.equal("Test Content");
  });

  it("should get a note by id", async function () {
    await notes.addNote("Test Title", "Test Content");
    const note = await notes.getNote(1);
    expect(note.id).to.equal(1);
    expect(note.title).to.equal("Test Title");
    expect(note.content).to.equal("Test Content");
  });

  it("should get all notes", async function () {
    await notes.addNote("Test Title 1", "Test Content 1");
    await notes.addNote("Test Title 2", "Test Content 2");
    const allNotes = await notes.getNotes();
    expect(allNotes.length).to.equal(2);
    expect(allNotes[0].title).to.equal("Test Title 1");
    expect(allNotes[1].title).to.equal("Test Title 2");
  });

  it("should delete a note", async function () {
    await notes.addNote("Test Title", "Test Content");
    await notes.deleteNote(1);
    const note = await notes.getNote(1);
    expect(note.id).to.equal(0);
    expect(note.title).to.equal("");
    expect(note.content).to.equal("");
  });
});
