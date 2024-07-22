"use client";
import ContactList from "@/components/contact-list";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Contact Guard | User Dashboard",
//   description: "Contact Dashboard Displaying the List",
// };

const Page = () => {
  const username = useUserStore((state) => state.username);
  const email = useUserStore((state) => state.email);
  const router = useRouter();
  return (
    <div className="relative w-full max-w-6xl px-4 mx-auto sm:px-6">
      <div className="relative pt-32 pb-10 md:pt-24 md:pb-16">
        <h1 className="mb-4 h1" data-aos="fade-up">
          Welcome {username}
        </h1>
        <p className="italic" data-aos="fade-up" data-aos-delay="200">
          Email Address:{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="my-8 text-lg" data-aos="fade-up" data-aos-delay="200">
            Here is your contact information overview
          </p>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={() => router.push("/contact/create")}
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
