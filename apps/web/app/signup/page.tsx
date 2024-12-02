"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="rounded-3xl px-8 py-2 w-96 bg-zinc-950">
            <div className="flex flex-col my-2">
                Email
                <input onChange={e => {
                    setEmail(e.target.value);
                }} type="text" className="bg-gray-900 p-2 rounded-lg"></input>
            </div>
            <div className="flex flex-col my-2">
                Password
                <input onChange={e => {
                    setPassword(e.target.value);
                }} type="password" className="bg-gray-900 p-2 rounded-lg"></input>
            </div>
            <div className="flex flex-col text-center">
                <button onClick={() => {
                    console.log(email, password);
                    router.push("/chat");
                }} className="bg-zinc-950 hover:bg-gray-900 flex items-center justify-center mb-2 p-6 rounded-lg">Sign in with credentials</button>
            </div>
        </div>
    </div>
);
}
