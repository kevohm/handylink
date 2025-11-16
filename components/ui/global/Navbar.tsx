"use client";

import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-50 bg-white flex items-center justify-between px-12 md:px-24 h-20 shadow-sm">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl block">
          <Image src={logo} alt="logo" width={30} height={50} />
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-800">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <SignedOut>
          <SignInButton>
            <Button className="text-sm"
            
            >Log In</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="text-sm">Sign up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                rootBox: "w-full text-center",
              },
            }}
          />
          <Button className="text-sm">
            <Link href="/profile">Account</Link>
          </Button>
        </SignedIn>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 flex flex-col bg-white p-4 z-50 shadow-md">
          <SignedOut>
            <Button className="mb-3 text-gray-600">
              <Link href="/sign-in" onClick={toggleMenu}>
                Login
              </Link>
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Link href="/sign-up" onClick={toggleMenu}>
                Sign up
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-600"
              >
                <UserButton
                  appearance={{
                    elements: {
                      rootBox:
                        "w-full items-center justify-center flex mt-4 mb-4",
                    },
                  }}
                />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
