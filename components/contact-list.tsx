"use client";
import React, { useState } from "react";

const contacts = [
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(987) 654-3210",
    company: "XYZ Inc.",
  },
  {
    name: "Mark Johnson",
    email: "mark.johnson@example.com",
    phone: "(555) 123-4567",
    company: "ABC Corp",
  },
  // Add more contacts as needed
];

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div className="container min-h-[17rem] p-4 mx-auto" data-aos="fade-up">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search contacts by name, email, or phone number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone Number</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100"
                data-aos="fade-up"
                data-aos-delay={`${index * 50}`}
              >
                <td className="p-2 border">{contact.name}</td>
                <td className="p-2 border">{contact.email}</td>
                <td className="p-2 border">{contact.phone}</td>
                <td className="p-2 border">{contact.company}</td>
                <td className="p-2 border">
                  <button className="px-2 py-1 mr-2 underline underline-offset-auto">
                    [ Edit ]
                  </button>
                  <button className="px-2 py-1 underline underline-offset-auto">
                    [ Delete ]
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {contacts.length > 4 && (
        <div className="flex items-center justify-end mt-4">
          <div data-aos="fade-up">
            <button className="px-2 py-1 mx-1 border rounded">Previous</button>
            <button className="px-2 py-1 mx-1 border rounded">1</button>
            <button className="px-2 py-1 mx-1 border rounded">2</button>
            <button className="px-2 py-1 mx-1 border rounded">3</button>
            <button className="px-2 py-1 mx-1 border rounded">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
