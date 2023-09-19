import { useSession } from "next-auth/react";

export const isLoggedIn = () => {
  const { status } = useSession();

  return status === "authenticated";
};
