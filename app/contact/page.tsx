import ContactList from "@/components/contact-list";

export const metadata = {
  title: "Contact Guard | User Dashboard",
  description: "Contact Dashboard Displaying the List",
};

const Page = () => {
  return (
    <div className="relative w-full max-w-6xl px-4 mx-auto sm:px-6">
      <div className="relative pt-32 pb-10 md:pt-24 md:pb-16">
        <h1 className="mb-4 h1" data-aos="fade-up">
          Welcome John Doe
        </h1>
        <p className="italic" data-aos="fade-up" data-aos-delay="200">
          Email Address:{" "}
          <a
            href="mailto:VJjL3@example.com"
            className="underline underline-offset-4"
          >
            john.doe@me.com
          </a>
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="my-8 text-lg" data-aos="fade-up" data-aos-delay="200">
            Here is your contact information overview
          </p>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            data-aos="fade-up"
          >
            Add New Contact
          </button>
        </div>
        <hr />
        <ContactList />
      </div>
    </div>
  );
};

export default Page;
