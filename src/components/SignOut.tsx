import React from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

type SignOutButtonProps = {
  onSignOut: () => void;
};

function SignOut(props: SignOutButtonProps) {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      props.onSignOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}

export default SignOut;
