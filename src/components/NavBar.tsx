import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SignOut from "./SignOut";
import { auth } from "../../firebase";
import bookIcon from "../assets/bookIcon.png";
import Image from "next/image";

function NavBar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image
              src={bookIcon}
              layout="fill"
              objectFit="contain"
              alt="Book icon"
            />
          </div>
          <Link href="/">
            {/* Logo o nombre de la aplicación */}
            <button className="text-white text-2xl font-bold">BookCove</button>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Search
              </Link>
              {isAuthenticated && (
                <Link
                  href="/favorites"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Favorites
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  href="/profile"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
              )}
              <Link
                href="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>

              {auth.currentUser ? (
                <SignOut onSignOut={handleSignOut} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Search
          </Link>
          {isAuthenticated && (
            <Link
              href="/favorites"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Favorites
            </Link>
          )}
          {isAuthenticated && (
            <Link
              href="/profile"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Profile
            </Link>
          )}
          <Link
            href="/about"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>

          {auth.currentUser ? (
            <SignOut onSignOut={handleSignOut} />
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
