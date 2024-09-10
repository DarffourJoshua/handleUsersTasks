'use client';
import Link from 'next/link'
import Image from 'next/image';
import { signOut } from 'next-auth/react';



const Header = (session) => {
  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Manage Task</span>
            
            <Image 
                alt="logo" src="https://cdn-icons-png.flaticon.com/512/906/906334.png" 
                className="h-8 w-auto" 
                width={32}
                height={32}
            />
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session.user ? (
            <>
                <span className="font-medium text-gray-900">{session.user.email}</span>
                <button
                    onClick={() => signOut()}
                    className="font-medium text-gray-900 hover:text-gray-900"
                >   sign out
                </button>
            </>
          ) : (
            <Link href="/" className="font-medium text-gray-900 hover:text-gray-900">
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )

}

export default Header;
