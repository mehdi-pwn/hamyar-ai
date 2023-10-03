import { GrOverview, GrDomain } from "react-icons/gr";
import { LuListEnd } from "react-icons/lu";
import { TfiWrite, TfiVideoClapper } from "react-icons/tfi";
import { AiFillInstagram } from "react-icons/ai";
import { IoMdBulb } from "react-icons/io";
import { FaGripLines } from "react-icons/fa";
import {
  MdOutlineDescription,
  MdSubtitles,
  MdOutlineWebAsset,
} from "react-icons/md";
import {
  BsFillCameraVideoFill,
  BsPencilFill,
  BsFillCalendarDateFill,
  BsFillFilePostFill,
} from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
export const subRoutes = [
  {
    title: "ابزار های مقاله نویسی",
    icon: <BsPencilFill />,
    menus: [
      {
        title: "مقاله نویس",
        icon: <BsPencilFill />,
        path: "/tool/article-content",
      },
      {
        title: "ایده ساز مقاله",
        icon: <IoMdBulb />,
        path: "/tool/article-ideas",
      },
      {
        title: "تقویم محتوایی",
        icon: <BsFillCalendarDateFill />,
        path: "/tool/content-calendar",
      },
      {
        title: "مقدمه مقاله",
        icon: <GrOverview />,
        path: "/tool/article-overview",
      },
      {
        title: "نتیجه گیری مقاله",
        icon: <LuListEnd />,
        path: "/tool/article-conclusion",
      },
      {
        title: "بازنویسی محتوا",
        icon: <TfiWrite />,
        path: "/tool/content-rewrite",
      },
    ],
  },
  {
    title: "ابزار های اینستاگرام",
    icon: <AiFillInstagram />,
    menus: [
      {
        title: "عنوان پست",
        icon: <BsFillFilePostFill />,
        path: "/tool/instagram-title",
      },
      {
        title: "کپشن پست",
        icon: <MdOutlineDescription />,
        path: "/tool/instagram-caption",
      },
    ],
  },
  {
    title: "ابزار های ویدیو",
    icon: <BsFillCameraVideoFill />,
    menus: [
      {
        title: "عنوان ویدیو",
        icon: <FaGripLines />,
        paid: true,
        path: "/tool/video-title",
      },
      {
        title: "توضیحات ویدیو",
        icon: <MdSubtitles />,
        paid: true,
        path: "/tool/video-description",
      },
      {
        title: "فیلمنامه ویدیو",
        icon: <TfiVideoClapper />,
        paid: true,
        path: "/tool/video-script",
      },
    ],
  },
  {
    title: "برندسازی وبسایت",
    icon: <CgWebsite />,
    menus: [
      {
        title: "عنوان وبسایت",
        icon: <MdOutlineWebAsset />,
        paid: true,
        path: "/tool/website-title",
      },
      {
        title: "دامنه وبسایت",
        icon: <GrDomain />,
        paid: true,
        path: "/tool/website-domain",
      },
    ],
  },
];
