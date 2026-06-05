import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );

      alert(response.data);

      if (
        response.data ===
        "Login successful"
      ) {
        localStorage.setItem(
  "loggedInUser",
  email
);

localStorage.setItem(
  "userEmail",
  email
);

        navigate("/");
      }
    } catch (error) {
      console.error(error);

      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          🔐 Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            p-4
            mb-4
            rounded-xl
            bg-white/10
            border border-white/20
            text-white
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            p-4
            mb-6
            rounded-xl
            bg-white/10
            border border-white/20
            text-white
          "
        />

        <button
          onClick={loginUser}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-bold
          "
        >
          Login
        </button>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;