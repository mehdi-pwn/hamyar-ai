import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { useStateContext } from "@context/ContextProvider";
import Image from "next/image";
import unknownUser from "@image/unknownUser.jpg";

const HeaderButton = ({ icon, func }) => {
  return (
    <button onClick={func} type="button" className="p-2 rounded-full text-xl">
      {icon}
    </button>
  );
};

const Header = () => {
  const { sidebarActive, setSidebarActive } = useStateContext();
  return (
    <div className="w-full static bg-slate-800">
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
          <HeaderButton icon={<MdOutlineDarkMode />} />
          {/* BsFillSunFill for sun */}
          <button type="button" className="p-2 text-xl">
            <Image
              src={unknownUser.src}
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
