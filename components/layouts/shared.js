import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { logoutUser } from "@utils/logoutUser";
import Swal from "sweetalert2";
import { useStateContext } from "@context/ContextProvider";
import { useRouter } from "next/router";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";

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
export const ProfileButton = () => {
  const { setProfileBarActive } = useStateContext();
  return (
    <button
      type="button"
      className="p-2 text-xl"
      onClick={() =>
        setProfileBarActive((prevProfileBarActive) => !prevProfileBarActive)
      }
    >
      <CgProfile color="gray" size={40} />
    </button>
  );
};
export const ProfileNotification = ({ profileBarRef }) => {
  const router = useRouter();
  return (
    <div ref={profileBarRef} className="absolute top-16 left-4 shadow-lg">
      <div className="bg-slate-100 p-2 flex flex-col gap-2 rounded-lg">
        <Link
          href={"/profile"}
          className="text-center hover:bg-gray-300 rounded-lg py-2 px-3 text-gray-900"
          onClick={() =>
            setProfileBarActive((prevProfileBarActive) => !prevProfileBarActive)
          }
        >
          پروفایل
        </Link>
        <button
          className="text-center hover:bg-gray-300 rounded-lg py-2 px-3 text-red-500"
          onClick={async () => {
            setProfileBarActive(
              (prevProfileBarActive) => !prevProfileBarActive
            );
            const logout = await logoutUser();
            if (logout) {
              if (router.pathname === "/") window.location.reload();
              else router.push("/");
            } else return Swal.fire("خطا در خروج از حساب کاربری");
          }}
        >
          خروج از حساب کاربری
        </button>
      </div>
    </div>
  );
};
export const DarkModeToggle = () => {
  const { themeMode, setMode } = useStateContext();
  return (
    <button
      onClick={() => {
        if (themeMode == "dark") {
          setMode("light");
        } else {
          setMode("dark");
        }
      }}
      type="button"
      className="p-2 rounded-full text-xl text-gray-500"
    >
      {themeMode == "dark" ? <MdOutlineDarkMode /> : <BsFillSunFill />}
    </button>
  );
};
