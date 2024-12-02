"use client";

import ChatComponent from '@repo/ui/chatComponent'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Chat() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <div>
      <ChatComponent />
    </div>
  )
}