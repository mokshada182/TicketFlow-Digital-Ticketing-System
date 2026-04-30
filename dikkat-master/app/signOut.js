import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";

export function useSignOut() {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return handleSignOut;
}