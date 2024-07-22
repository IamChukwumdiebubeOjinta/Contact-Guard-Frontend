import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Contact {
  id: string;
  fullname: string;
  companyName?: string;
  phonenumber: string;
}

interface ContactState {
  contacts: Contact[];
  selectedContact: Contact | null;
  contactToDelete: Contact | null;  // Changed from null to Contact | null
  addContact: (contact: Contact) => void;
  updateContact: (updatedContact: Contact) => void;
  setSelectedContact: (contact: Contact | null) => void;
  deleteContact: (id: string) => void;
  setContactToDelete: (contact: Contact | null) => void;
  setContacts: (contacts: Contact[]) => void;
}

export const useContactStore = create<ContactState>(
  persist(
    (set) => ({
    contacts: [],
    selectedContact: null,
    contactToDelete: null,
    addContact: (contact) =>
      set((state) => ({
        contacts: [...state.contacts, contact],
      })),
    updateContact: (updatedContact) =>
      set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        ),
      })),
    deleteContact: (id) =>
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact.id !== id),
        contactToDelete: null,  // Reset contactToDelete after deletion
      })),
    setContacts: (contacts) => set({ contacts }),
    setSelectedContact: (contact) => set({ selectedContact: contact }),
    setContactToDelete: (contact) => set({ contactToDelete: contact }),
    clearContacts: () => set({ contacts: [], contactToDelete: null }),
  }),
  {
    name: "contact-storage",
    storage: createJSONStorage(() => localStorage),
  })
);