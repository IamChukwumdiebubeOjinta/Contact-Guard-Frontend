import Link from 'next/link'
import MobileMenu from './mobile-menu'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="absolute z-30 w-full">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <Image src="/images/logo.png" width={250} height={70} alt="Logo" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex flex-wrap items-center justify-end grow">
              <li>
                <Link
                  href="/signin"
                  className="flex items-center px-4 py-3 font-medium text-[#5DADE2] transition duration-150 ease-in-out hover:text-[#4987b1] hover:scale-[1.05]"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="ml-3 text-white bg-[#5DADE2] btn-sm hover:bg-[#4987b1]">
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
