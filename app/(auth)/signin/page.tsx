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
  usernameOrEmail: z.string().min(1, "Username/Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

// export const metadata = {
//   title: "Contact Guard | Sign In",
//   description: "Sign Up Page",
// };

export default function SignIn() {
  let router = useRouter();
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

    try {
      let res = await apiService.post("/auth/login", data);
      if (res.status === 200) {
        let {
          data: { access_token, username, email },
        } = res;
        setLoading(false);
        updateToken(access_token);
        setUser(username, email, access_token);
        // Set the token as a cookie
        document.cookie = `hux-auth-token=${access_token}; path=/; max-age=604800; SameSite=Strict; Secure`;
        toast.success("Successfully signed in!", {
          duration: 3000,
          position: "bottom-center",
        });
        router.push("/contact");
      }
    } catch (error) {
      toast.error("An error occurred during sign in.");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative py-12 md:py-20">
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          {/* Page header */}
          <div className="mb-12 text-center">
            <h1 className="h1">Welcome back.</h1>
          </div>

          {/* Sign In Form */}
          <div className="max-w-sm mx-auto">
            {/* Sign In with Google Button */}
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
              <span className="flex-auto">Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6 text-gray-400">
              <div
                className="flex-grow border-t border-gray-700 border-dotted"
                aria-hidden="true"
              ></div>
              <span className="mx-3">Or, sign in with your email</span>
              <div
                className="flex-grow border-t border-gray-700 border-dotted"
                aria-hidden="true"
              ></div>
            </div>

            {/* Email and Password Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="usernameOrEmail"
                  className="block mb-1 text-sm font-medium text-gray-300"
                >
                  Username/Email
                </label>
                <input
                  id="usernameOrEmail"
                  type="text"
                  {...register("usernameOrEmail")}
                  className="w-full form-input"
                  placeholder="Email or Username"
                />
                <p className="h-2 mt-2 text-sm text-red-500">
                  {errors.usernameOrEmail && errors.usernameOrEmail.message}
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full form-input"
                  placeholder="Password"
                />
                <p className="h-2 mt-2 text-sm text-red-500">
                  {errors.password && errors.password.message}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-gray-400">
                  <input
                    type="checkbox"
                    {...register("keepSignedIn")}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Keep me signed in</span>
                </label>
                <Link
                  href="/reset-password"
                  className="text-[#5DADE2] hover:text-[#4987b1] transition duration-150 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-[#5DADE2] hover:bg-[#4987b1] transition duration-150 ease-in-out"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-gray-400">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#5DADE2] hover:text-[#4987b1] transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
