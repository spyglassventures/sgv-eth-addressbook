import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import the SweetAlert CSS file

export default function AddContact() {

    const [addContact, setAddContact] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");

    function resetForm() {
        setName("");
        setAddress("");
        setComment("");
    }

    function isAddressValid() {
        return address.length === 42 && address.startsWith("0x");
    }

    function isNameValid() {
        const trimmedName = name.trim();
        return trimmedName !== "" && trimmedName.length <= 50 && !/\d/.test(trimmedName);
    }

    function isCommentValid() {
        return comment.trim() !== "" && comment.length <= 200;
    }

    return (
        <div>
            {!addContact ? (
                <button
                    className={styles.addContactTriggerButton}
                    onClick={() => setAddContact(true)}
                >Add Contact</button>
            ) : (
                <div className={styles.addContactContainer}>
                    <div className={styles.addContactCard}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setAddContact(false)}
                        >Close</button>
                        <div className={styles.addContactForm}>
                            <h3>Add Contact:</h3>
                            <input 
                                type="text" 
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="0x0000"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Cool dude"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <Web3Button
                            contractAddress={CONTRACT_ADDRESS}
                            action={(contract) => {
                                if (isNameValid() && isAddressValid() && isCommentValid()) {
                                    contract.call(
                                        "addContact",
                                        [
                                            name,
                                            address,
                                            comment
                                        ]
                                    );
                                    resetForm();
                                    setAddContact(false);
                                } else {
                                    if (!isNameValid()) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'Name cannot be empty and cannot include numbers.',
                                            confirmButtonText: 'OK',
                                            customClass: {
                                              container: 'web3-styled-alert', // Add your custom CSS class for styling
                                            },
                                          });
                                    } else if (!isAddressValid()) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'Address must be 42 characters long and pass the validation.',
                                            confirmButtonText: 'OK',
                                            customClass: {
                                              container: 'web3-styled-alert', // Add your custom CSS class for styling
                                            },
                                          });
                                    } else if (!isCommentValid()) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'Comment must be between 1 and 200 characters.',
                                            confirmButtonText: 'OK',
                                            customClass: {
                                              container: 'web3-styled-alert', // Add your custom CSS class for styling
                                            },
                                          });
                                    }
                                }
                            }}
                        >Add Contact</Web3Button>
                    </div>
                </div>
            )}
        </div>
    )
}