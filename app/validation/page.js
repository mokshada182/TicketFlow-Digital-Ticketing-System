"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import "../main.css";

export default function ValidationPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      const email = user.primaryEmailAddress.emailAddress;
      const isValidEmail = email.includes("@spsmayurvihar.com");

      if (isValidEmail) {
        router.push("/submit");
      } else {
        signOut();
        router.push("/");
      }
    }
  }, [isLoaded, isSignedIn, router, signOut, user]);

  return (
    <div role="alert" className="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Validating the account!</span>
    </div>
  );
}
