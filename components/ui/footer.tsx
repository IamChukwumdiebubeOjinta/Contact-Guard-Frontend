import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  let date = new Date().getFullYear();
  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          {/* Top area: Blocks */}
          <div className="grid gap-8 mb-8 md:grid-cols-12 lg:gap-20 md:mb-12">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link
                  href="/"
                  className="inline-block"
                  aria-label="Contact-Guard"
                >
                  <Image
                    src="/images/logo.svg"
                    width={250}
                    height={70}
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="text-gray-400">
                Contact Guard is dedicated to providing a secure and private
                solution for managing your contact information. Our mission is
                to give you peace of mind knowing your data is safe.
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="grid gap-8 md:col-span-8 lg:col-span-7 sm:grid-cols-3">
              {/* 2nd block */}
              <div className="text-sm">
                <h6 className="mb-1 font-medium text-gray-200">
                  Contact Imformation
                </h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="mailto:support@contactguard.com"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      support@contactguard.com
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="tel:+1-800-123-4567"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      +1-800-123-4567
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-sm">
                <h6 className="mb-1 font-medium text-gray-200">Social Media</h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 4th block */}
              <div className="text-sm">
                <h6 className="mb-1 font-medium text-gray-200">Links</h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Term of Service
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-center">
            {/* Copyrights note */}
            <div className="mr-4 text-sm text-gray-400">
              &copy; {date}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
