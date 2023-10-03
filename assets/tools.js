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
const tools = [
  {
    title: "ابزار های مقاله نویسی",
    icon: <BsPencilFill />,
    menus: [
      {
        title: "مقاله نویس",
        description: "نوشتن مقاله با کلمه کلیدی",
        icon: <BsPencilFill />,
        path: "/tool/article-content",
      },
      {
        title: "ایده ساز مقاله",
        description: "پیشنهاد ایده برای نوشتن مقاله",
        icon: <IoMdBulb />,
        path: "/tool/article-ideas",
      },
      {
        title: "تقویم محتوایی",
        description: "نوشتن تقویم محتوایی",
        icon: <BsFillCalendarDateFill />,
        path: "/tool/content-calendar",
      },
      {
        title: "مقدمه مقاله",
        description: "نوشتن بخش مقدمه مقاله با بررسی متن مقاله",
        icon: <GrOverview />,
        path: "/tool/article-overview",
      },
      {
        title: "نتیجه گیری مقاله",
        description: "نوشتن بخش نتیجه گیری مقاله با بررسی متن مقاله",
        icon: <LuListEnd />,
        path: "/tool/article-conclusion",
      },
      {
        title: "بازنویسی محتوا",
        description: "بازنویسی مجدد محتوا با لحن خاص از روی محتوا",
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
        description: "پیشنهاد عنوان پست اینستاگرام",
        icon: <BsFillFilePostFill />,
        path: "/tool/instagram-title",
      },
      {
        title: "کپشن پست",
        description: "پیشنهاد کپشن پست اینستاگرام",
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
        description: "پیشنهاد عنوان ویدیو با بررسی موضوع ویدیو",
        icon: <FaGripLines />,
        path: "/tool/video-title",
      },
      {
        title: "توضیحات ویدیو",
        description: "نوشتن توضیحات ویدیو با بررسی موضوع ویدیو",
        icon: <MdSubtitles />,
        path: "/tool/video-description",
      },
      {
        title: "فیلمنامه ویدیو",
        description: "نوشتن فیلمنامه ویدیو با بررسی موضوع ویدیو",
        icon: <TfiVideoClapper />,
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
        description: "پیشنهاد عنوان وبسایت با بررسی موضوع وبسایت",
        icon: <MdOutlineWebAsset />,
        path: "/tool/website-title",
      },
      {
        title: "دامنه وبسایت",
        description: "پیشنهاد دامنه وبسایت با بررسی موضوع وباسیت",
        icon: <GrDomain />,
        path: "/tool/website-domain",
      },
    ],
  },
];

export default tools;
