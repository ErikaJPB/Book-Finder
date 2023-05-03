import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface LoginState {
  email: string;
  password: string;
}

function Login() {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );
      alert("Login Successful");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-white text-center ">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1 text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginState.email}
              onChange={handleChange}
              className="w-full border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-1 text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginState.password}
              onChange={handleChange}
              className="w-full border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-white  py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
