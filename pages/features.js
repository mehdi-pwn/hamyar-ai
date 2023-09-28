import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import Link from "next/link";
import screenShot from "@image/app-screenshot.webp";

import Typography from "@mui/material/Typography";

import { HiBadgeCheck } from "react-icons/hi";
import { Button } from "@components/main-design";

const ToolCard = () => {
  return;
};

const Features = () => {
  return (
    <div className="pt-16">
      <div className="flex flex-col justify-center items-center gap-2">
        <Typography variant="h2">
          <strong className="font-ordibehesht px-28 py-5 bg-gradient-to-l from-amber-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
            همیار اِی آی: ابزار تولید محتوای هوش مصنوعی
          </strong>
        </Typography>
        <p className="text-gray-500">
          همیار اِی آی، نیاز های محتوانویسان، بلاگرها، صاحبان کسب و کار های
          مجازی و خیلی دیگه از آدمو رو برطرف میکنه!
        </p>
      </div>
      <div className="h-fit grid grid-cols-2 gap-5 px-28 py-5 mt-20">
        <div className="bg-gradient-to-br from-blue-300 to-red-300 py-20 pl-20 rounded-lg shadow-lg">
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-e-2xl shadow-2xl -mt-14"
            width={2000}
            height={180}
          />
        </div>
        <div className="flex flex-col">
          <div>
            <Typography variant="h6">
              <strong className="text-primary">ایده ساز</strong>
            </Typography>
          </div>
          <div className="font-bold">
            <Typography variant="h3">
              <strong className="text-black">
                برای محتوایی که میخوای منتشر کنی، ایده پیدا کن{" "}
              </strong>
            </Typography>
          </div>
          <div>
            <p className="text-gray-600 mt-8 text-justify">
              توی همیار اِی آی، این امکان رو داری که با استفاده از ابزار های
              ایده ساز قدرت گرفته از هوش مصنوعی، برای پست های فضای مجازی و
              وبسایتت و یا حتی کانال آپارات یا یوتیوب، ایده پیدا کنی و ازشون
              الهام بگیری
            </p>
          </div>
          <div>
            <ul className="mt-8 flex flex-col gap-4">
              <li className="flex gap-2 items-center">
                <span>
                  <HiBadgeCheck size={25} color="#ff00ff" />
                </span>
                <span className="text-lg">
                  <Link
                    href="/tool/post-idea"
                    className="text-primary underline underline-offset-8"
                  >
                    ایده ساز پست اینستاگرام
                  </Link>{" "}
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span>
                  <HiBadgeCheck size={25} color="#ff00ff" />
                </span>
                <span className="text-lg">
                  <Link
                    href="/tool/post-idea"
                    className="text-primary underline underline-offset-8"
                  >
                    ایده ساز مقاله وبسایت
                  </Link>{" "}
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span>
                  <HiBadgeCheck size={25} color="#ff00ff" />
                </span>
                <span className="text-lg">
                  <Link
                    href="/tool/post-idea"
                    className="text-primary underline underline-offset-8"
                  >
                    ایده ساز محتوای ویدیویی
                  </Link>{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-fit grid grid-cols-2 gap-5 px-28 py-5 my-20">
        <div className="flex flex-col">
          <div>
            <Typography variant="h6">
              <strong className="text-primary">محتوا نویس</strong>
            </Typography>
          </div>
          <div className="font-bold">
            <Typography variant="h3">
              <strong className="text-black">
                سریعتر از همیشه محتوات رو بساز
              </strong>
            </Typography>
          </div>
          <div>
            <p className="text-gray-600 mt-8 text-justify">
              مقاله، مقدمه، نتیجه گیری، توضیحات ویدیو، کپشن اینستاگرام و روبیکا
              و خیلی ابزار دیگه، میتونن بهتون کمک کنن که خیلی سریع تر از مقاله
              نویسی به صورت دستی، محتواتون رو بسازین
            </p>
          </div>
          <div className="mt-5">
            <Button colors={"bg-secondary border-none text-white text-xl"}>
              امتحان رایگان
            </Button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-300 via-green-300 to-amber-300 pr-16 pt-20 pb-8 rounded-lg shadow-lg">
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-s-2xl shadow-2xl"
            width={2000}
            height={180}
          />
        </div>
      </div>
      {/* todo:print 6 tool cards here as grid */}
    </div>
  );
};
Features.Layout = MainLayout;
export default Features;
