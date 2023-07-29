import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import ContactCard from "./contact-card";
import SearchContact from "./search-contacts"; // Import the SearchContact component


export default function ContactList() {
    const { contract } = useContract(CONTRACT_ADDRESS);

    const { data: contacts, isLoading: isLoadingContacts } = useContractRead(
        contract,
        "getContacts"
    );

    // Conditional rendering to check if contacts are available
    if (isLoadingContacts) {
        return <p>Loading...</p>;
    }

    if (!contacts || contacts.length === 0) {
        return <p>No contacts found.</p>;
    }

    // Assuming you have a contacts array, you can slice it to get the first three contacts
    // const firstThreeContacts = contacts.slice(0, 3);
    const lastSixontacts = contacts.slice().reverse();

    return (
      <div>
        <SearchContact contacts={lastSixontacts} />
        
      </div>
    );
}
