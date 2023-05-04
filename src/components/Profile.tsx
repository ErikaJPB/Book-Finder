import React from "react";
import Image from "next/image";
import { getAuth, User } from "firebase/auth";

function Profile() {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  let displayName: string | null | undefined;
  let email: string | null | undefined;
  let photoURL: string | null | undefined;

  if (user !== null) {
    displayName = user.displayName;
    email = user.email;
    photoURL = user.photoURL;

    user.providerData.forEach((provider) => {
      if (provider.providerId === "google.com") {
        displayName = provider.displayName;
        email = provider.email;
        photoURL = provider.photoURL;
      }
    });
  }

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
                <Image
                  src={photoURL ?? "/default-image.jpg"}
                  alt="Not Found"
                  width={100}
                  height={100}
                  quality={90}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Name:</p>
              <p className="text-gray-700 mb-4">{displayName ?? "No Name"}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-2">Email:</p>
              <p className="text-gray-700 mb-4">{email ?? "No Email"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
