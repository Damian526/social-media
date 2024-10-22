// frontend/app/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import SocketComponent from "@/components/SocketComponent";
import Button from "@/components/Button";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          username,
        }
      );
      setUserId(response.data.user.id);
      console.log("User registered:", response.data.user);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(userId)

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
          <Button onClick={registerUser}>Register</Button>
        </div>
      ) : (
        <SocketComponent userId={userId} />
      )}
    </div>
  );
}
