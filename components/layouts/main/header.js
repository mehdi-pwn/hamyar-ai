import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { FaShopware } from "react-icons/fa";
import { useStateContext } from "@context/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import unknownUser from "@image/unknownUser.jpg";

const HeaderLink = ({ href, title }) => {
  return (
    <Link href={href} className="text-white">
      <span>{title}</span>
    </Link>
  );
};

const HeaderButton = ({ icon, func }) => {
  return (
    <button onClick={func} type="button" className="p-2 rounded-full text-xl">
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

  return (
    <div className="w-full fixed bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-[9999]">
      <div className="flex justify-between text-white py-2 px-5 relative">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-row text-2xl items-center font-extrabold text-white gap-3 mx-auto"
          >
            <FaShopware /> <span>میهن اِی آی</span>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-14">
          <HeaderLink href={"/features"} title={"قابلیت ها"} />
          <HeaderLink href={"/price"} title={"قیمت ها"} />
          <HeaderLink href={"/tools"} title={"ابزار ها"} />
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
          <button
            type="button"
            className="p-2 text-xl"
            onClick={() =>
              setProfileBarActive(
                (prevProfileBarActive) => !prevProfileBarActive
              )
            }
          >
            <Image
              src={unknownUser.src}
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full"
            />
          </button>
        </div>
        {profileBarActive && (
          <div ref={profileBarRef} className="absolute top-16 left-4">
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
                  console.log("UserLogOut");
                }}
              >
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
