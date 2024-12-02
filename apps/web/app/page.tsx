"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Appbar from "@repo/ui/appBar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (session) {
      router.push('/chat');
    }
  }, [session, status, router]);
  

  if(status === "loading"){
    return <div>Loading...</div>
  }

  return (
    <div>
      <Appbar />
    </div>
  );
}