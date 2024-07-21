"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ContactFormProps = {
  contactId?: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ contactId }) => {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = sessionStorage.getItem("hux_contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    if (contactId) {
      const contactToEdit = contacts.find(
        (contact) => contact.id === contactId
      );
      if (contactToEdit) {
        setFormState(contactToEdit);
      }
    }
  }, [contactId, contacts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactId) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === contactId ? { ...contact, ...formState } : contact
      );
      setContacts(updatedContacts);
    } else {
      const newContact = { ...formState, id: (contacts.length + 1).toString() };
      setContacts([...contacts, newContact]);
    }
    sessionStorage.setItem("hux_contacts", JSON.stringify(contacts));
    router.push("/");
  };

  return (
    <div className="container p-4" data-aos="fade-up">
      <h1 className="mb-4 text-2xl font-bold">
        {contactId ? "Edit Contact" : "Add Contact"}
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., John Doe"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., john.doe@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., (123) 456-7890"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={formState.company}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., ABC Corp"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          {contactId ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
