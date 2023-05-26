import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "../../firebase";

function Profile() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
          Profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full"></div>
                {photoURL ? (
                  <Image
                    src={photoURL}
                    alt="Not Found"
                    width={100}
                    height={100}
                    quality={90}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300"></div>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Name:</p>
              <p className="text-gray-700 mb-4">{displayName || "No Name"}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Email:</p>
              <p className="text-gray-700 mb-4">{email || "No Email"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
