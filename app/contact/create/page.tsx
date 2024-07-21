import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact Guard | Create Contact",
  description: "Create Contact",
};

const CreateContact = () => {
  return (
    <div className="grow">
      <div className="relative w-full max-w-6xl px-4 mx-auto sm:px-6">
        <div className="relative pt-32 md:pt-24 ">
          <h1 className="mb-4 h3" data-aos="fade-up">
            Create a New Contact
          </h1>
          <p className="" data-aos="fade-up" data-aos-delay="200">
            Easily add and manage your contact information securely.
          </p>
          <h1 className="my-2 h4" data-aos="fade-up">
            Instructions
          </h1>
          <ol className="mb-2 list-decimal">
            <li data-aos="fade-up" data-aos-delay="200">
              Fill in the contact's information in the form fields provided.
              Fields marked as optional can be left blank if not applicable.
            </li>
            <li data-aos="fade-up" data-aos-delay="300">
              Once all relevant information is entered, click the "Add Contact"
              button to securely store the contact details.
            </li>
            <li data-aos="fade-up" data-aos-delay="400">
              After saving, you can view and manage your contacts from your
              dashboard. Edit or delete contacts as needed.
            </li>
          </ol>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default CreateContact;
