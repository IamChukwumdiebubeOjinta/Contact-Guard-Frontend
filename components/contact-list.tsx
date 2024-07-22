"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiService } from "@/context/HuxApiServiceContext";
import { useUserStore } from "@/stores/userStore";
import { useContactStore } from "@/stores/contactStore";
import Modal from "./ui/delete-modal";
import toast from "react-hot-toast";

interface Contact {
  id: string;
  fullname: string;
  phonenumber: string;
  companyName: string;
}

const ITEMS_PER_PAGE = 4;

const ContactList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const {  setContactToDelete } = useContactStore();
  const contacts = useContactStore((state) => state.contacts as Contact[]);
  const token = useUserStore((state) => state.token);
  const { apiService } = useApiService();
  const router = useRouter();

  useEffect(() => {
    displayTable();
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      Object.values(contact).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [contacts, searchTerm]);

  const handleEdit = (contact: Contact) => {
    handleEditContact(contact);
    router.push(`/contact/edit/${contact.id}`);
  };

  const handleEditContact = (contact: Contact) => {
    useContactStore.getState().setSelectedContact(contact);
  };

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const displayTable = async () => {
    setLoading(true);

    try {
      apiService.setToken(token);
      const res = await apiService.get("/contact");
      useContactStore.getState().setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };
  
  const confirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      apiService.setToken(token);
      await apiService.delete(`/contact/${contactToDelete.id}`);
      useContactStore.getState().deleteContact(contactToDelete.id);
      setIsModalOpen(false);
      setContactToDelete(null);

      toast.success("Successfully deleted contact!", {
        duration: 3000,
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("An error occurred while deleting contact.", {
        duration: 3000,
        position: "bottom-center",
      });
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container min-h-[17rem] p-4 mx-auto" data-aos="fade-up">
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th colSpan={2} className="p-2 border">
              Name
            </th>
            <th className="p-2 border">Phone Number</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.length > 0 ? (
            paginatedContacts.map((contact, index) => (
              <tr
                key={contact.id}
                className="hover:bg-gray-100"
                data-aos="fade-up"
                data-aos-delay={`${index * 50}`}
              >
                <td colSpan={2} className="p-2 border">
                  {contact.fullname}
                </td>
                <td className="p-2 border">{contact.phonenumber}</td>
                <td className="p-2 border">{contact.companyName}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="px-2 py-1 mr-2 hover:underline underline-offset-auto"
                  >
                    [ Edit ]
                  </button>
                  <button
                    onClick={() => handleDelete(contact)}
                    className="px-2 py-1 hover:underline underline-offset-auto"
                  >
                    [ Delete ]
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-end mt-4" data-aos="fade-up">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 py-1 mx-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-200" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default ContactList;
