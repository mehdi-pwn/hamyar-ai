import { motion } from "framer-motion";
import { useStateContext } from "@context/ContextProvider";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { subRoutes } from "./routes";
import { FaBorderAll } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const itemClass =
  "flex items-center gap-2 text-white rounded-md cursor-pointer font-medium hover:bg-slate-400 dark:hover:bg-slate-800 bg-opacity-8 px-3 py-2 mt-2";

const NavItem = ({ path, icon, title }) => {
  const { sidebarActive, setSidebarActive, screenSize } = useStateContext();
  const pathname = useRouter().pathname;

  const handleCloseSideBar = () => {
    if (sidebarActive && screenSize < 900) {
      setSidebarActive(false);
    }
  };
  const liClass =
    pathname === path
      ? itemClass + " bg-slate-400 dark:bg-slate-800"
      : itemClass;
  return (
    <li>
      <Link href={path} className={liClass} onClick={handleCloseSideBar}>
        <span className="text-gray-700 dark:text-gray-400">{icon}</span>
        <span className="text-gray-900 dark:text-white">{title}</span>
      </Link>
    </li>
  );
};

const SubMenu = ({ data }) => {
  const { sidebarActive, setSidebarActive, screenSize } = useStateContext();
  const pathname = useRouter().pathname;
  const handleCloseSideBar = () => {
    if (sidebarActive && screenSize < 900) {
      setSidebarActive(false);
    }
  };
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const menus = data.menus;
  return (
    <>
      <li
        className="flex justify-between items-center text-white rounded-md cursor-pointer font-medium hover:bg-slate-400 hover:dark:bg-slate-800 bg-opacity-8 px-3 py-2 mt-2"
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-400">{data.icon}</span>
          <span className="text-gray-900 dark:text-white">{data.title}</span>
        </div>
        <IoIosArrowDown
          className={` ${
            subMenuOpen && "rotate-180"
          } duration-200 text-gray-700 dark:text-gray-400`}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex pl-5 flex-col overflow-hidden"
      >
        {menus.map((subitem, i) => (
          <li key={i}>
            <Link
              href={subitem.path}
              className={
                pathname === subitem.path
                  ? itemClass + " mr-5 w-full bg-slate-400"
                  : itemClass + " mr-5 w-full"
              }
              onClick={handleCloseSideBar}
            >
              <span className="text-gray-700 dark:text-gray-400">
                {subitem.icon}
              </span>
              <span className="text-gray-900 dark:text-white">
                {subitem.title}
              </span>
            </Link>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

const Sidebar = () => {
  const { sidebarActive, setSidebarActive, screenSize, setScreenSize } =
    useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setSidebarActive(false);
    } else {
      setSidebarActive(true);
    }
  }, [screenSize]);

  const handleCloseSideBar = () => {
    if (sidebarActive && screenSize < 900) {
      setSidebarActive(false);
    }
  };

  const sidebarAnimationSettings = {
    open: {
      width: "18rem",
      visibility: "visible",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "0px",
      visibility: "hidden",
      transition: {
        damping: 40,
      },
    },
  };
  return (
    <motion.div
      variants={sidebarAnimationSettings}
      animate={sidebarActive ? "open" : "closed"}
      className="text-white py-4"
    >
      <div className="flex justify-between items-center h-12 pb-6 px-3 border-b border-gray-400 dark:border-gray-800">
        <Link
          href="/"
          onClick={handleCloseSideBar}
          className="flex flex-row text-2xl items-center font-extrabold text-black dark:text-white gap-3 mx-auto"
        >
          <FaBorderAll /> <span>میهن اِی آی</span>
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
      <div className="flex flex-col h-full">
        <ul className="px-4 py-3">
          <NavItem
            path={"/tools"}
            icon={<FaBorderAll />}
            title={"همه ابزار ها"}
          />
          <div className="mt-4 mr-3 -mb-1">
            <small className="text-slate-500 dark:text-slate-600">
              ابزار ها
            </small>
          </div>
          {subRoutes.map((item, index) => {
            return <SubMenu key={index} data={item} />;
          })}
          <NavItem path={"/ticket"} icon={<GoReport />} title={"ارسال تیکت"} />
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;
