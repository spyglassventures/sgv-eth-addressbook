import React, { useState } from "react";
import ContactCard from "./contact-card";
import styles from "../styles/Home.module.css";

type Contact = {
  name: string;
  wallet: string;
  comment: string;
};

type Props = {
  contacts: Contact[];
};

const SearchContact: React.FC<Props> = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div >
    
      <input className={styles.searchInput}

        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={handleSearch}
      />
      
      <div>
        {filteredContacts.slice(0, 3).map((contact, index) => (
          <ContactCard
            key={index}
            index={index}
            name={contact.name}
            wallet={contact.wallet}
            comment={contact.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchContact;
