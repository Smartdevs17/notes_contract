// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NotesContract {
    uint256 public noteCount = 0;

    struct Note {
        uint256 id;
        string title;
        string description;
    }

    mapping(uint256 => Note) public notes;

    event NoteCreated(uint256 id, string title, string description);
    event NoteDeleted(uint256 id);

    function createNote(string memory _title, string memory _description) public {
        notes[noteCount] = Note(noteCount, _title, _description);
        emit NoteCreated(noteCount, _title, _description);
        noteCount++;
    }

    function deleteNote(uint256 _id) public {
        delete notes[_id];
        emit NoteDeleted(_id);
        noteCount--;
    }

    // New function to get all notes
    function getAllNotes() public view returns (Note[] memory) {
        Note[] memory allNotes = new Note[](noteCount);
        uint256 counter = 0;

        for (uint256 i = 0; i < noteCount; i++) {
            if (bytes(notes[i].title).length > 0) { // Check if the note exists
                allNotes[counter] = notes[i];
                counter++;
            }
        }

        return allNotes;
    }
}
