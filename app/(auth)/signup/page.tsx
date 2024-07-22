"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiService } from "@/context/HuxApiServiceContext";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import toast from "react-hot-toast";

const schema = z.object({
  firstName: z.string().min(1, "First Name or Company Name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(10, "Password must be at least 10 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { apiService, updateToken } = useApiService();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    let payload = {
      username: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password
    }

    try {
      let res = await apiService.post("/auth/register", payload);
      if (res.status === 200) {
        let {
          data: { access_token, username, email },
        } = res;
        setLoading(false);
        updateToken(access_token);
        setUser(username, email, access_token);
        document.cookie = `hux-auth-token=${access_token}; path=/; max-age=604800; SameSite=Strict; Secure`;
        toast.success("Successfully signed up!", {
          duration: 3000,
          position: "bottom-center",
        });
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      }
    } catch (error) {
      toast.error("An error occurred during sign up.");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative">
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl pb-12 mx-auto text-center ">
              <h1 className="h1">
                {" "}
                Start Saving a ton of <br /> Contacts with us!
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <button
                onClick={openModal}
                className="relative flex items-center w-full px-4 py-2 border border-gray-500 bg-white text-gray-800 hover:text-white hover:bg-[#5DADE2] transition duration-150 ease-in-out"
              >
                <svg
                  className="w-4 h-4 mr-4 opacity-75 fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                </svg>
                <span className="flex-auto">Sign up with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center my-6 text-gray-400">
                <div
                  className="flex-grow border-t border-gray-700 border-dotted"
                  aria-hidden="true"
                ></div>
                <span className="mx-3">Or, register with your email</span>
                <div
                  className="flex-grow border-t border-gray-700 border-dotted"
                  aria-hidden="true"
                ></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mb-4 -mx-3">
                  <div className="w-full px-3">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-300"
                      htmlFor="firstName"
                    >
                      First Name or Company Name{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                      className="w-full form-input"
                      placeholder="First Name/Company Name"
                      required
                    />
                    <p className="h-2 mt-2 text-sm text-red-500">
                      {errors.firstName && errors.firstName.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap mb-4 -mx-3">
                  <div className="w-full px-3">
                    <label
                      className="block mb-1 text-sm font-medium "
                      htmlFor="lastName"
                    >
                      Last Name (Optional)
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                      className="w-full form-input"
                      placeholder="Last Name"
                    />
                    <p className="h-2 mt-2 text-sm text-red-500">
                      {errors.lastName && errors.lastName.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap mb-4 -mx-3">
                  <div className="w-full px-3">
                    <label
                      className="block mb-1 text-sm font-medium "
                      htmlFor="email"
                    >
                      Work Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full form-input"
                      placeholder="johndoe@contact-guard.com"
                      required
                    />
                    <p className="h-2 mt-2 text-sm text-red-500">
                      {errors.email && errors.email.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap mb-4 -mx-3">
                  <div className="w-full px-3">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-300"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="w-full form-input"
                      placeholder="Password (at least 10 characters)"
                      required
                    />
                    <p className="h-2 mt-2 text-sm text-red-500">
                      {errors.password && errors.password.message}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-center text-gray-500">
                  I agree to be contacted by Contact Guard about this offer as
                  per the Contact Guard{" "}
                  <Link
                    href="#"
                    className="text-gray-400 underline transition duration-150 ease-in-out hover:text-gray-200 hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
                <div className="flex flex-wrap mt-6 -mx-3">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="w-full text-white bg-[#5DADE2] btn hover:bg-[#4987b1]"
                    >
                      {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-6 text-center text-gray-400">
                Already using Contact Guard?{" "}
                <Link
                  href="/signin"
                  className="text-[#5DADE2] transition duration-150 ease-in-out hover:text-[#4987b1]"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
