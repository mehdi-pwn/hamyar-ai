import { motion } from "framer-motion";
import { useStateContext } from "@context/ContextProvider";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShopware } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";

const itemClass =
  "flex items-center gap-2 text-white rounded-md cursor-pointer font-medium hover:bg-slate-800 bg-opacity-8 px-3 py-2 mt-2";

const NavItem = ({ path, icon, title }) => {
  const { sidebarActive, setSidebarActive, screenSize } = useStateContext();
  const pathname = useRouter().pathname;

  const handleCloseSideBar = () => {
    if (sidebarActive && screenSize < 900) {
      setSidebarActive(false);
    }
  };
  const liClass = pathname === path ? itemClass + " bg-slate-800" : itemClass;
  return (
    <li>
      <Link href={path} className={liClass} onClick={handleCloseSideBar}>
        <span className="text-gray-400">{icon}</span>
        <span className="text-white">{title}</span>
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
              className={
                pathname === subitem.path
                  ? itemClass + " mr-5 w-full bg-slate-800"
                  : itemClass + " mr-5 w-full"
              }
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
      <div className="flex justify-between items-center h-12 pb-6 px-3 border-b border-gray-800">
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
            path={"/tools"}
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
        path: "/tool/article-content",
      },
      {
        title: "ایده ساز مقاله",
        icon: <FaShopware />,
        path: "/tool/article-ideas",
      },
      {
        title: "تقویم محتوایی",
        icon: <FaShopware />,
        path: "/tool/content-calendar",
      },
      {
        title: "مقدمه مقاله",
        icon: <FaShopware />,
        path: "/tool/article-overview",
      },
      {
        title: "نتیجه گیری مقاله",
        icon: <FaShopware />,
        path: "/tool/article-conclusion",
      },
      {
        title: "بازنویسی محتوا",
        icon: <FaShopware />,
        path: "/tool/content-rewrite",
      },
    ],
  },
  {
    title: "ابزار های اینستاگرام",
    icon: <FaShopware />,
    menus: [
      {
        title: "عنوان پست",
        icon: <FaShopware />,
        path: "/tool/instagram-title",
      },
      {
        title: "کپشن پست",
        icon: <FaShopware />,
        path: "/tool/instagram-caption",
      },
    ],
  },
  {
    title: "ابزار های ویدیو",
    icon: <FaShopware />,
    menus: [
      {
        title: "عنوان ویدیو",
        icon: <FaShopware />,
        paid: true,
        path: "/tool/video-title",
      },
      {
        title: "توضیحات ویدیو",
        icon: <FaShopware />,
        paid: true,
        path: "/tool/video-description",
      },
      {
        title: "فیلمنامه ویدیو",
        icon: <FaShopware />,
        paid: true,
        path: "/tool/video-script",
      },
    ],
  },
  {
    title: "برندسازی وبسایت",
    icon: <FaShopware />,
    menus: [
      {
        title: "عنوان وبسایت",
        icon: <FaShopware />,
        paid: true,
        path: "/tool/website-title",
      },
      {
        title: "دامنه وبسایت",
        icon: <FaShopware />,
        paid: true,
        path: "/tool/website-domain",
      },
    ],
  },
];
export default Sidebar;
