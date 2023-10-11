import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "@context/ContextProvider";
import { useEffect, useState } from "react";
import { verifyToken } from "@utils/verifyToken";
import {
  DarkModeToggle,
  SigninButton,
  ProfileButton,
  ProfileNotification,
} from "@layout/shared";

const Header = () => {
  const { setSidebarActive, profileBarActive, profileBarRef } =
    useStateContext();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkVerified() {
      const verify = await verifyToken();
      if (verify) setIsLogged(true);
    }
    checkVerified();
  }, []);

  return (
    <header className="w-full static h-16 flex flex-col justify-center border-b border-gray-400 dark:border-gray-800">
      <div className="flex justify-between text-white p-2 relative">
        <div className="flex items-center">
          <button
            onClick={() =>
              setSidebarActive((prevSidebarActive) => !prevSidebarActive)
            }
            type="button"
            className="p-2 rounded-full text-xl text-black dark:text-white"
          >
            {<AiOutlineMenu />}
          </button>
        </div>
        <div className="flex gap-2">
          <DarkModeToggle />
          {!isLogged ? <SigninButton /> : <ProfileButton />}
        </div>
        {profileBarActive && isLogged && (
          <ProfileNotification profileBarRef={profileBarRef} />
        )}
      </div>
    </header>
  );
};

export default Header;
