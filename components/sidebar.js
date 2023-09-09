import { motion } from "framer-motion";
import { useStateContext } from "../contexts/ContextProvider";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShopware } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const itemClass =
  "flex items-center gap-2 text-white rounded-md cursor-pointer font-medium hover:bg-slate-800 bg-opacity-8 px-3 py-2 mt-2";

const NavItem = ({ path, icon, title }) => {
  const { sidebarActive, setSidebarActive, screenSize } = useStateContext();
  const handleCloseSideBar = () => {
    if (sidebarActive && screenSize < 900) {
      setSidebarActive(false);
    }
  };
  return (
    <li>
      <Link
        href={"/" + path}
        className={itemClass}
        onClick={handleCloseSideBar}
      >
        <span className="text-gray-400">{icon}</span>
        <span className="text-white">{title}</span>
      </Link>
    </li>
  );
};

const SubMenu = ({ data }) => {
  const { sidebarActive, setSidebarActive, screenSize } = useStateContext();
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
        className="flex justify-between items-center text-white rounded-md cursor-pointer font-medium hover:bg-slate-800 bg-opacity-8 px-3 py-2 mt-2"
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-400">{data.icon}</span>
          <span className="text-white">{data.title}</span>
        </div>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
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
              className={itemClass + " mr-5 w-full"}
              onClick={handleCloseSideBar}
            >
              <span className="text-gray-300">{subitem.icon}</span>
              <span className="text-white">{subitem.title}</span>
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

  const sidebar_animation_settings = {
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
      variants={sidebar_animation_settings}
      animate={sidebarActive ? "open" : "closed"}
      className="text-white py-4"
    >
      <div className="flex justify-between items-center px-3 pb-4 border-b border-gray-800">
        <Link
          href="/"
          onClick={handleCloseSideBar}
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
      <div className="flex flex-col h-full">
        <ul className="px-4 py-3">
          <NavItem
            path={"tools"}
            icon={<FaShopware />}
            title={"همه ابزار ها"}
          />
          <div className="mt-4 mr-3 -mb-1">
            <small className="text-slate-500">ابزار ها</small>
          </div>
          {sub_routes.map((item, index) => {
            return <SubMenu key={index} data={item} />;
          })}
        </ul>
      </div>
    </motion.div>
  );
};
const sub_routes = [
  {
    title: "ابزار های مقاله نویسی",
    icon: <FaShopware />,
    menus: [
      {
        title: "مقاله نویس",
        icon: <FaShopware />,
        paid: true,
        path: "/article-writer",
      },
      {
        title: "مقاله نویس",
        icon: <FaShopware />,
        paid: true,
        path: "/article-writer",
      },
      {
        title: "مقاله نویس",
        icon: <FaShopware />,
        paid: true,
        path: "/article-writer",
      },
    ],
  },
  {
    title: "ابزار های مقاله نویسی",
    icon: <FaShopware />,
    menus: [
      {
        title: "مقاله نویس",
        icon: <FaShopware />,
        paid: true,
        path: "/article-writer",
      },
      {
        title: "مقاله نویس",
        icon: <FaShopware />,
        paid: true,
        path: "/article-writer",
      },
      {
        title: "مقاله نویس",
        icon: <FaShopware />,
        paid: true,
        path: "/article-writer",
      },
    ],
  },
];
export default Sidebar;
