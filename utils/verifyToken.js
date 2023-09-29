export const verifyToken = async () => {
  const verify = await fetch("/api/verify-jwt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const verified = await verify.json();

  if (verified.status === "success") {
    return {
      status: "verified",
      user: verified.decoded,
    };
  } else return null;
};
