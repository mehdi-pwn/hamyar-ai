import { FaShopware } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "@context/ContextProvider";
import Link from "next/link";
import {
  DarkModeToggle,
  ProfileNotification,
  SigninButton,
} from "@layout/shared";
import { useEffect, useState } from "react";
import { verifyToken } from "@utils/verifyToken";
import { GrClose } from "react-icons/gr";

const HeaderLink = ({ href, title }) => {
  return (
    <Link href={href} className="text-black dark:text-white">
      <span>{title}</span>
    </Link>
  );
};

const Header = () => {
  const {
    profileBarActive,
    profileBarRef,
    screenSize,
    navbarActive,
    setNavbarActive,
  } = useStateContext();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkVerified() {
      const verify = await verifyToken();
      if (verify) setIsLogged(true);
    }
    checkVerified();
  }, []);

  return (
    <header className="w-full fixed bg-primary bg-opacity-10 backdrop-filter backdrop-blur-lg z-[9999] h-16 flex flex-col justify-center">
      <div className="flex justify-between text-white py-2 px-5 relative">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-row text-2xl items-center font-extrabold text-black gap-3 mx-auto dark:text-white"
          >
            <FaShopware /> <span>همیار اِی آی</span>
          </Link>
        </div>
        {screenSize > 820 && (
          <div className="flex justify-between items-center gap-14">
            <HeaderLink href={"/features"} title={"قابلیت ها"} />
            <HeaderLink href={"/tools"} title={"ابزار ها"} />
            <HeaderLink href={"/price"} title={"خرید اشتراک"} />
          </div>
        )}

        <div className="flex gap-2">
          <DarkModeToggle />
          {screenSize < 820 ? (
            <button
              onClick={() => {
                setNavbarActive((prevNvbarActive) => !prevNvbarActive);
              }}
              type="button"
              className="p-2 rounded-full text-xl text-black dark:text-white"
            >
              {navbarActive ? <GrClose /> : <AiOutlineMenu />}
            </button>
          ) : (
            <>{!isLogged ? <SigninButton /> : <ProfileButton />}</>
          )}
        </div>

        {profileBarActive && isLogged && (
          <ProfileNotification profileBarRef={profileBarRef} />
        )}
      </div>
    </header>
  );
};

export default Header;
