"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { useApiService } from "@/context/HuxApiServiceContext";
import { useContactStore } from "@/stores/contactStore";
import toast from "react-hot-toast";

type ContactFormProps = {
  contactId?: string;
};

type Contact = {
  id?: string;
  fullname: string;
  phonenumber: string;
  companyName: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ contactId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const token = useUserStore((state) => state.token);
  const selectedContact = useContactStore((state) => state.selectedContact);
  const { apiService } = useApiService();

  // console.log(contactId);

  const [formState, setFormState] = useState<Contact>({
    fullname: "",
    phonenumber: "",
    companyName: "",
  });

  useEffect(() => {
    if (contactId && selectedContact) {
      setFormState({
        fullname: selectedContact.fullname,
        phonenumber: selectedContact.phonenumber,
        companyName: selectedContact.companyName,
      });
    }
  }, [contactId, selectedContact]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      apiService.setToken(token);
      if (contactId) {
        // Update existing contact
        const res = await apiService.patch(`/contact/${contactId}`, formState);
        useContactStore.getState().updateContact(res.data);
      } else {
        // Create new contact
        const res = await apiService.post("/contact", formState);
        useContactStore.getState().addContact(res.data);
      }
      setTimeout(() => {
        toast.success("Contact saved successfully!", {
          duration: 3000,
          position: "bottom-center",
        });
        router.push("/contact");
      }, 4000);
    } catch (error) {
      console.error("Error submitting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
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
            name="fullname"
            value={formState.fullname}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., John Doe"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phonenumber"
            value={formState.phonenumber}
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
            name="companyName"
            value={formState.companyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., ABC Corp"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full text-white bg-[#2C3E50] btn hover:bg-gray-800 sm:w-auto"
          >
            Go Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#5DADE2] btn-sm hover:bg-[#4987b1]"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>{contactId ? "Update Contact" : "Add Contact"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
