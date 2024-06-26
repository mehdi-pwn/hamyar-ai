import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import Link from "next/link";
import screenShot from "@image/app-screenshot.webp";
import Typography from "@mui/material/Typography";
import { HiBadgeCheck } from "react-icons/hi";
import { Button, CTA } from "@components/main-design";
import { useStateContext } from "@context/ContextProvider";

const Features = () => {
  return (
    <div className="pt-16">
      <div className="flex flex-col justify-center items-center gap-2 px-4 lg:px-20">
        <Typography variant="h2" component="h2">
          <strong className="font-ordibehesht flex justify-center items-center bg-gradient-to-l from-amber-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
            همیار اِی آی: ابزار تولید محتوای هوش مصنوعی
          </strong>
        </Typography>
        <p className="text-gray-500 dark:text-gray-400">
          همیار اِی آی، نیاز های محتوانویسان، بلاگرها، صاحبان کسب و کار های
          مجازی و خیلی دیگه از آدمو رو برطرف میکنه!
        </p>
      </div>
      <div className="h-fit flex flex-col lg:flex-row gap-5 px-4 lg:px-20 py-5 mt-20">
        <div className="bg-gradient-to-br from-blue-300 to-red-300 p-3 lg:py-20 lg:pl-20 rounded-lg shadow-lg">
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-2xl lg:rounded-e-2xl shadow-2xl -mt-14"
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
              <strong className="text-black dark:text-white">
                برای محتوایی که میخوای منتشر کنی، ایده پیدا کن{" "}
              </strong>
            </Typography>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mt-8 text-justify">
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
      <div className="h-fit flex flex-col lg:flex-row gap-5 px-4 lg:px-20 py-5 my-20">
        <div className="flex flex-col">
          <div>
            <Typography variant="h6">
              <strong className="text-primary">محتوا نویس</strong>
            </Typography>
          </div>
          <div className="font-bold">
            <Typography variant="h3">
              <strong className="text-black dark:text-white">
                سریعتر از همیشه محتوات رو بساز
              </strong>
            </Typography>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mt-8 text-justify">
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
        <div className="bg-gradient-to-br from-purple-300 via-green-300 to-amber-300 lg:pr-16 lg:pt-20 p-3 lg:pb-8 rounded-lg shadow-lg">
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-2xl lg:rounded-s-2xl shadow-2xl mt-8"
            width={2000}
            height={180}
          />
        </div>
      </div>
      <CTA />
      {/* todo:print 6 tool cards here as grid */}
    </div>
  );
};
Features.Layout = MainLayout;
export default Features;
