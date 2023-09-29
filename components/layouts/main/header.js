import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { FaShopware } from "react-icons/fa";
import { useStateContext } from "@context/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import unknownUser from "@image/unknownUser.jpg";
import { isLoggedIn } from "@utils/isLoggedIn";
import { signOut } from "next-auth/react";
import { SigninButton } from "@layout/shared";
import { CgProfile } from "react-icons/cg";

const HeaderLink = ({ href, title }) => {
  return (
    <Link href={href} className="text-black">
      <span>{title}</span>
    </Link>
  );
};

const HeaderButton = ({ icon, func }) => {
  return (
    <button
      onClick={func}
      type="button"
      className="p-2 rounded-full text-xl text-gray-500"
    >
      {icon}
    </button>
  );
};

const Header = () => {
  const {
    themeMode,
    setMode,
    profileBarActive,
    setProfileBarActive,
    profileBarRef,
  } = useStateContext();

  const isLogged = isLoggedIn();

  return (
    <header className="w-full fixed bg-primary bg-opacity-10 backdrop-filter backdrop-blur-lg z-[9999] h-16 flex flex-col justify-center">
      <div className="flex justify-between text-white py-2 px-5 relative">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-row text-2xl items-center font-extrabold text-black gap-3 mx-auto"
          >
            <FaShopware /> <span>همیار اِی آی</span>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-14">
          <HeaderLink href={"/features"} title={"قابلیت ها"} />
          <HeaderLink href={"/tools"} title={"ابزار ها"} />
          <HeaderLink href={"/price"} title={"خرید اشتراک"} />
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
            <SigninButton />
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
          <div
            ref={profileBarRef}
            className="absolute top-[3.8rem] left-4 shadow-lg"
          >
            <div className="bg-slate-100 p-2 flex flex-col gap-2 rounded-lg">
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
