import { motion } from "framer-motion";
import { useStateContext } from "../contexts/ContextProvider";
import Link from "next/link";
import { FaShopware } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const Sidebar = () => {
  const { sidebarActive, setSidebarActive } = useStateContext();
  const sidebar_animation_settings = {
    open: {
      width: "18rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "0px",
      transition: {
        damping: 40,
      },
    },
  };
  return (
    <motion.div
      variants={sidebar_animation_settings}
      animate={sidebarActive ? "open" : "closed"}
      className="bg-transparent w-72 h-screen relative z-[9999] text-white py-4 border-l border-gray-800"
    >
      <div className="flex justify-between items-center px-3 pb-4 border-b border-gray-800">
        <Link
          href="/"
          onClick={() => {}}
          className="flex flex-row text-2xl items-center font-extrabold text-white gap-3 mx-auto"
        >
          <FaShopware /> <span>میهن اِی آی</span>
        </Link>
        <button
          type="button"
          onClick={() =>
            setSidebarActive((prevSidebarActive) => !prevSidebarActive)
          }
          className="text-xl rounded-full mt-1 ml-4 hover:bg-gray-700 md:hidden"
        >
          <MdOutlineCancel />
        </button>
      </div>
      ...items
    </motion.div>
  );
};

export default Sidebar;
