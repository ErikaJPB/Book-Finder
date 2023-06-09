import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SignOut from "./SignOut";
import { auth } from "../../firebase";
import bookIcon from "../../public/bookIcon.png";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

function NavBar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 items-center ">
      <div className="mx-2 px-2 sm:px-2 lg:px-2 flex items-center justify-between h-20 max-w-full">
        <div className="flex items-center ">
          <div className="relative w-8 h-8 mr-2">
            <Image
              src={bookIcon}
              layout="fill"
              objectFit="contain"
              alt="Book icon"
            />
          </div>
          <Link href="/">
            <button className="text-white text-2xl font-bold">BookCove</button>
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1 w-full">
          <div className="hidden sm:block mr-10 md:items-center">
            <div className="flex space-x-4 ">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-large"
              >
                Search
              </Link>
              {isAuthenticated && (
                <Link
                  href="/favorites"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-large"
                >
                  Favorites
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  href="/profile"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-large"
                >
                  Profile
                </Link>
              )}
              <Link
                href="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-large"
              >
                About
              </Link>

              {auth.currentUser ? (
                <SignOut onSignOut={handleSignOut} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-large"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-large font-large"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex sm:items-center ">
          <FiMenu
            className="text-white text-3xl ml-2 sm:hidden"
            onClick={handleMenuClick}
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="sm:hidden flex flex-col items-center text-center"
          id="mobile-menu"
        >
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
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 pynded-md text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
