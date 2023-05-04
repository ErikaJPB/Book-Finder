import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Login with Google Successful");
      router.push("/profile");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center ">
          Login
        </h1>
        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="bg-gray-600 text-white  py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
