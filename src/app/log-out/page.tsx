"use client";

import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export function LogoutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/sign-in");
      }}
    >
      Logout
    </button>
  );
}