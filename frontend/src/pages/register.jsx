import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data);

      if (
        response.data ===
        "Registration successful"
      ) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      alert(
        "Registration failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          🚀 Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
            w-full
            p-4
            mb-4
            rounded-xl
            bg-white/10
            border
            border-white/20
            text-white
          "
        />

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
            border
            border-white/20
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
            border
            border-white/20
            text-white
          "
        />

        <button
          onClick={registerUser}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-3
            rounded-xl
            font-bold
          "
        >
          Register
        </button>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;