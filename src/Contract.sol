// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract ContractBook {

    // Variable to store the contract owner's address
    address private owner;

    // Struct to represent a contact in the address book
    struct Contact {
        string name;
        address wallet;
        string comment;
    }

    // Array to store all the contacts
    Contact[] private contacts;

    // Constructor to set the contract owner to the address deploying the contract
    constructor() {
        owner = msg.sender;
    }

    // Modifier to ensure that only the contract owner can call certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Function to add a new contact to the address book, can only be called by the owner
    function addContact(string memory _name, address _address, string memory _comment) public onlyOwner {
        contacts.push(Contact(_name, _address, _comment));
    }

    // Function to remove a contact from the address book by its index, can only be called by the owner
    function removeContact(uint _index) public onlyOwner {
        require(_index < contacts.length, "Index out of bounds");

        // Shift all contacts after the removed index one position to the left
        for (uint i = _index; i < contacts.length - 1; i++) {
            contacts[i] = contacts[i + 1];
        }

        // Remove the last element from the array
        contacts.pop();
    }

    // Function to get all the contacts in the address book
    function getContacts() public view returns (Contact[] memory) {
        return contacts;
    }

}
