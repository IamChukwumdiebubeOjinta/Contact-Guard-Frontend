"use client";

import ContactForm from "@/components/contact-form";
import { useParams } from "next/navigation";
import React from "react";

const EditContact = () => {
  const { id } = useParams();

  return (
    <div className="grow">
      <div className="relative w-full max-w-6xl px-4 mx-auto sm:px-6">
        <div className="relative pt-32 md:pt-24 ">
          <h1 className="mb-4 h3" data-aos="fade-up">
            Edit Contact Information
          </h1>
          <p className="" data-aos="fade-up" data-aos-delay="200">
            Update your contact details securely and effortlessly.
          </p>
          <h1 className="my-2 h4" data-aos="fade-up">
            Instructions
          </h1>
          <ol className="mb-2 list-decimal">
            <li data-aos="fade-up" data-aos-delay="200">
              Modify the contact's information in the form fields provided.
              Update any details that have changed or need correction.
            </li>
            <li data-aos="fade-up" data-aos-delay="300">
              After making the necessary updates, click the "Update Contact"
              button to securely save the changes.
            </li>
            <li data-aos="fade-up" data-aos-delay="400">
              Ensure all information is accurate and up-to-date. You can return
              to the dashboard to view the updated contact details.
            </li>
          </ol>
        </div>

        <ContactForm contactId={id as string} />
      </div>
    </div>
  );
};

export default EditContact;
