import Link from "next/link";
export const SigninButton = () => {
  return (
    <Link
      href={"/signin"}
      className="bg-primary rounded-lg py-2 px-4 text-sm border border-primary"
    >
      رایگان امتحان کن
    </Link>
  );
};
