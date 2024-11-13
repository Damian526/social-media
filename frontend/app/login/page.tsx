"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8008/api/auth/login",
        {
          username,
          password,
        }
      );
      // Store the token in localStorage (later we'll handle this securely)
      localStorage.setItem("token", response.data.access_token);
      router.push("/"); // Redirect to a protected page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={loginUser}>Login</Button>
    </div>
  );
}