import { useSession } from "next-auth/react";

export function isLoggedIn() {
  const { data: session } = useSession();

  if (session) {
    return true;
  } else {
    return false;
  }
}
