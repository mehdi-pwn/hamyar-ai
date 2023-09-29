import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useStateContext } from "@context/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import unknownUser from "@image/unknownUser.jpg";
import { isLoggedIn } from "@utils/isLoggedIn";
import { signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";

const HeaderButton = ({ icon, func }) => {
  return (
    <button onClick={func} type="button" className="p-2 rounded-full text-xl">
      {icon}
    </button>
  );
};

const Header = () => {
  const {
    sidebarActive,
    setSidebarActive,
    themeMode,
    setMode,
    profileBarActive,
    setProfileBarActive,
    profileBarRef,
  } = useStateContext();

  const isLogged = isLoggedIn();

  return (
    <header className="w-full static bg-slate-800 h-16 flex flex-col justify-center">
      <div className="flex justify-between text-white p-2 relative">
        <div className="flex items-center">
          <HeaderButton
            icon={<AiOutlineMenu />}
            func={() =>
              setSidebarActive((prevSidebarActive) => !prevSidebarActive)
            }
          />
        </div>
        <div className="flex gap-2">
          <HeaderButton
            icon={
              themeMode == "dark" ? <MdOutlineDarkMode /> : <BsFillSunFill />
            }
            func={() => {
              if (themeMode == "dark") {
                setMode("light");
              } else {
                setMode("dark");
              }
            }}
          />
          {!isLogged ? (
            <Link
              href={"/signin"}
              className="bg-blue-400 rounded-full py-2 px-4 text-sm"
            >
              ورود | ثبت نام
            </Link>
          ) : (
            <button
              type="button"
              className="p-2 text-xl"
              onClick={() =>
                setProfileBarActive(
                  (prevProfileBarActive) => !prevProfileBarActive
                )
              }
            >
              <CgProfile color="gray" size={40} />
            </button>
          )}
        </div>
        {profileBarActive && isLogged && (
          <div ref={profileBarRef} className="absolute top-16 left-4 shadow-lg">
            <div className="bg-white p-2 flex flex-col gap-2 rounded-lg">
              <Link
                href={"/profile"}
                className="text-center hover:bg-gray-300 rounded-lg py-2 px-3 text-gray-900"
                onClick={() =>
                  setProfileBarActive(
                    (prevProfileBarActive) => !prevProfileBarActive
                  )
                }
              >
                پروفایل
              </Link>
              <button
                className="text-center hover:bg-gray-300 rounded-lg py-2 px-3 text-red-500"
                onClick={() => {
                  setProfileBarActive(
                    (prevProfileBarActive) => !prevProfileBarActive
                  );
                  signOut({ callbackUrl: "/" }); //!
                }}
              >
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
