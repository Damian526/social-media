"use client";

import { useState } from "react";
import axios from "axios";
import SocketComponent from "@/components/SocketComponent";
import Button from "@/components/Button";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8008/api/users/register",
        {
          username,
          password,
        }
      );
      setUserId(response.data.user.id);
      console.log("User registered:", response.data.user.id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div>
      {!userId ? (
        <div>
          <h1>Register</h1>
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
          <Button onClick={registerUser}>Register</Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <SocketComponent userId={userId} />
      )}
    </div>
  );
}
