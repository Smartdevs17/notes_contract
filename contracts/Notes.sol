// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Notes {
    uint256 public noteCount = 0;
    mapping(uint256 => Note) public notes;
    struct Note {
        uint256 id;
        string title;
        string content;
        uint256 timestamp;
    }

    event NoteAdded(uint256 id, string title, string content, uint256 timestamp);
    event NoteDeleted(uint256 id);
    function addNote(string memory _title, string memory _content) public {
        noteCount++;
        notes[noteCount] = Note(noteCount, _title, _content, block.timestamp);
        emit NoteAdded(noteCount, _title, _content, block.timestamp);
    }

    function getNote(uint256 _id) public view returns (Note memory) {
        return notes[_id];
    }

    function getNotes() public view returns (Note[] memory) {
        Note[] memory _notes = new Note[](noteCount);
        for (uint256 i = 1; i <= noteCount; i++) {
            _notes[i - 1] = notes[i];
        }
        return _notes;
    }

    function deleteNote(uint256 _id) public {
        delete notes[_id];
        emit NoteDeleted(_id);
    }

}