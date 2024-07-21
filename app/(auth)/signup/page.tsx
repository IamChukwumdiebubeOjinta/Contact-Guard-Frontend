export const metadata = {
  title: 'Contact Guard | Sign Up',
  description: 'Page description',
}

import Link from 'next/link'

export default function SignUp() {
  return (
    <section className="relative">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl pb-12 mx-auto text-center ">
            <h1 className="h1"> Start Saving a ton of <br /> Contacts with us!</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <button className="relative flex items-center w-full px-0 border border-gray-500 btn hover:text-white hover:bg-[#5DADE2]">
                    <svg className="w-4 h-4 mx-4 opacity-75 fill-current shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                    </svg>
                    <span className="flex items-center h-6 mr-4 border-r border-white border-opacity-25" aria-hidden="true"></span>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="mr-3 border-t border-gray-700 border-dotted grow" aria-hidden="true"></div>
              <div className="text-gray-400">Or, register with your email</div>
              <div className="ml-3 border-t border-gray-700 border-dotted grow" aria-hidden="true"></div>
            </div>
            <form>
              <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                  <label className="block mb-1 text-sm font-medium text-gray-300" htmlFor="full-name">First Name or Company Name <span className="text-red-600">*</span></label>
                  <input id="full-name" type="text" className="w-full text-gray-300 form-input" placeholder="First and last name" required />
                </div>
              </div>
              <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                  <label className="block mb-1 text-sm font-medium text-gray-300" htmlFor="company-name">Last Name (Optional)</label>
                  <input id="company-name" type="text" className="w-full text-gray-300 form-input" placeholder="Your company or app name" required />
                </div>
              </div>
              <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                  <label className="block mb-1 text-sm font-medium text-gray-300" htmlFor="email">Work Email <span className="text-red-600">*</span></label>
                  <input id="email" type="email" className="w-full text-gray-300 form-input" placeholder="johndoe@contact-guard.com" required />
                </div>
              </div>
              <div className="flex flex-wrap mb-4 -mx-3">
                <div className="w-full px-3">
                  <label className="block mb-1 text-sm font-medium text-gray-300" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input id="password" type="password" className="w-full text-gray-300 form-input" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="text-sm text-center text-gray-500">
                I agree to be contacted by Contact Guard about this offer as per the Contact Guard <Link href="#" className="text-gray-400 underline transition duration-150 ease-in-out hover:text-gray-200 hover:no-underline">Privacy Policy</Link>.
              </div>
              <div className="flex flex-wrap mt-6 -mx-3">
                <div className="w-full px-3">
                <button className="w-full text-white bg-[#5DADE2] btn hover:bg-[#4987b1]">Sign Up</button>
                </div>
              </div>
            </form>
            <div className="mt-6 text-center text-gray-400">
              Already using Contact Guard? <Link href="/signin" className="text-[#5DADE2] transition duration-150 ease-in-out hover:text-[#4987b1]">Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
