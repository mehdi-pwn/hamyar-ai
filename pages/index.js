import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import Link from "next/link";
import screenShot from "@image/app-screenshot.webp";
import { Button as Btn, IndexToolCard } from "@components/main-design";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";
import Typical from "react-typical";
import Typography from "@mui/material/Typography";
import {
  BsFileEarmarkPost,
  BsFillCheckCircleFill,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { HiBadgeCheck } from "react-icons/hi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa";

const Index = () => {
  return (
    <div className="pt-16">
      <div className="h-screen flex flex-col justify-center items-center gap-24 px-28 -m-10">
        <motion.div
          whileHover={{ backgroundColor: "#3618d3", color: "white" }}
          className="bg-primary px-5 py-3 text-center text-primary bg-opacity-30 rounded-full w-fit"
        >
          <p>
            &#x1F9E0; یک کلام: هوش مصنوعی، محتوا رو خیلی راحت تر و سریع تر
            میسازه!
          </p>
        </motion.div>
        <div className="flex flex-col items-center w-full">
          <div className="text-4xl text-center">
            <Typography variant="h1" component="h2" color="initial">
              <div className="block font-ordibehesht">
                یه راه خیلی سریع و ساده
                <br />
                برای نوشتن
                <strong className="relative inline-block mr-3 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                  <Typical
                    className="font-ordibehesht"
                    steps={[
                      "مقاله",
                      1000,
                      "پست اینستاگرام",
                      1000,
                      "فیلمنامه",
                      1000,
                      "داستان",
                      1000,
                    ]}
                    wrapper="h2"
                    loop={Infinity}
                  />
                </strong>
              </div>
            </Typography>
          </div>
          <div className="mt-10 w-10/12">
            <p className="text-gray-600">
              توی همیار اِی آی، میتونی با هوش مصنوعی، مقاله های عالی برای وبلاگ،
              شبکه های اجتماعی مثل ایتا و روبیکا و اینستاگرام، تبلیغات، سایت
              فروشگاهی و ... بسازی. یادت نره از بقیه جا نمونی.
            </p>
          </div>
          <div className="flex justify-center flex-row-reverse mt-8 gap-8">
            <Link href={"/features"}>
              <Btn colors="text-xl bg-transparent border-transparent text-primary">
                اطلاعات بیشتر
              </Btn>
            </Link>
            <Link href={"/signin"}>
              <Btn colors="text-xl bg-primary border-primary text-white">
                امتحان رایگان
              </Btn>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center gap-5">
        <div>
          <Chip
            label="ویدیوی دمو"
            color="success"
            size="small"
            variant="outlined"
          />
        </div>
        <h2 className="font-extrabold text-3xl">
          قابلیت های همیار اِی آی رو توی این فیلم ببین
        </h2>
        <Image
          src={screenShot.src}
          alt="Mihan AI app dashboard screen shot"
          className="rounded-xl"
          width={800}
          height={180}
        />
      </div>
      <div className="h-screen px-14">
        <div className="grid grid-cols-3 gap-8">
          <IndexToolCard
            icon={<BsInstagram />}
            title={"فضای مجازی"}
            desc={
              "با این ابزار ها، پست و استوری برای شبکه های اجتماعی کسسب و کارت بنویس"
            }
            link={"ایده ساز اینستاگرام"}
            href={"/tool/article-content"}
          />
          <IndexToolCard
            icon={<BsFileEarmarkPost />}
            title={"وبلاگ"}
            desc={
              "با هوش مصنوعی، این قدرت رو داری که مقاله وبلاگ رو خیلی سریع بنویسی"
            }
            link={"مقاله نویس"}
            href={"/tool/article-content"}
          />
          <IndexToolCard
            icon={<BsYoutube />}
            title={"ویدیو"}
            desc={
              "هوش مصنوعی، میتونه برات عنوان، توضیحات و حتی فیلمنامه ویدیوی درخواستی رو برات بسازه"
            }
            link={"کپشن ساز ویدیو"}
            href={"/tool/article-content"}
          />
          <IndexToolCard
            icon={<RiPagesLine />}
            title={"وبسایت"}
            desc={
              "اگه میخای یه سایت جدیدی بسازی ولی نمیدونی اسم سایتت رو چی بزاری و همچنین چطوری طراحیش کنی، حتما از همیار اِی آی استفاده کن"
            }
            link={"دامنه ساز سایت"}
            href={"/tool/article-content"}
            link2={"متن ساز سایت"}
            href2={"/tool/article-content"}
          />
          <div className="col-span-2">
            <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-blue-800 to-purple-950 py-5 px-10 text-center flex items-center justify-between shadow-2xl">
              <div className="text-white text-start">
                <Typography variant="h4">وقت تلف نکن،</Typography>
                <Typography variant="h4">هوشِتو مصنوعی کن!</Typography>
                <div className="flex flex-col gap-2 mt-5">
                  <p className="flex gap-2 items-center">
                    <BsFillCheckCircleFill color="green" />{" "}
                    <span className="text-gray-300">یکبار امتحان رایگان</span>
                  </p>
                  <p className="flex gap-2 items-center">
                    <BsFillCheckCircleFill color="green" />{" "}
                    <span className="text-gray-300">
                      ثبت نام آسان و دسترسی آنی به پنل
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <Link href={"/signin"}>
                  <Btn colors={"bg-white text-primary border-purple-500"}>
                    امتحان رایگان
                  </Btn>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen grid grid-cols-2 gap-5 px-28 py-5">
        <div className="bg-gradient-to-br from-blue-300 to-red-300 h-fit py-20 pl-20 pr-3 rounded-lg shadow-lg">
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-2xl shadow-2xl -mr-20"
            width={1700}
            height={180}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-ordibehesht font-bold">
            <Typography variant="h3">
              <strong className="bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
                توی چند دقیقه مقاله بنویس، نه توی چند ساعت{" "}
              </strong>
            </Typography>
          </div>
          <div>
            <p className="text-gray-600 mt-8 text-justify">
              با استفاده از ابزار های قدرت گرفته از هوش مصنوعی همیار اِی آی، از
              صفر تا صد مقاله ها و پست های شبکه های اجتماعی خود را طراحی و
              برنامه ریزی کرده و بسیار سریعتر نسبت به محتوا نویسان معمولی آن ها
              را منتشر کنید
            </p>
          </div>
          <div>
            <ul className="mt-8 flex flex-col gap-4">
              <li className="flex gap-2 items-center">
                <span>
                  <HiBadgeCheck size={25} color="#ff00ff" />
                </span>
                <span className="text-lg">
                  با{" "}
                  <Link
                    href="/tool/post-idea"
                    className="text-primary underline underline-offset-8"
                  >
                    ایده ساز محتوا
                  </Link>{" "}
                  ایده برای محتوات پیدا کن
                </span>
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <span>
                  <HiBadgeCheck size={25} color="#ff00ff" />
                </span>
                <span className="text-lg">
                  با{" "}
                  <Link
                    href="/tool/article-content"
                    className="text-primary underline underline-offset-8"
                  >
                    محتوا ساز
                  </Link>{" "}
                  محتواتو خیلی سریع بنویس
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span>
                  <HiBadgeCheck size={25} color="#ff00ff" />
                </span>
                <span className="text-lg">
                  با{" "}
                  <Link
                    href="/tools"
                    className="text-primary underline underline-offset-8"
                  >
                    بقیه ابزار ها
                  </Link>{" "}
                  محتواتو کامل کن
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-screen py-5 -mt-20 px-20 text-center w-full">
        <div>
          <Typography variant="h2">
            <strong className="text-secondary">پرسش های متداول</strong>
          </Typography>
        </div>
        <div className="mt-5 w-2/3 mx-auto">
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-label="Expand"
              aria-controls="q1-content"
              id="q1-header"
            >
              <Typography>آیا همیار اِی آی، اشتراک رایگان دارد؟</Typography>
            </AccordionSummary>
            <AccordionDetails>
              کمی تا حدودی! در واقع شما با ثبت نام در همیار اِی آی، فقط یک بار
              از یکی از ابزار های هوش مصنوعی، استفاده کنید.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-label="Expand"
              aria-controls="q1-content"
              id="q1-header"
            >
              <Typography>
                آیا همیار اِی آی، با وردپرس و دیگر سیستم های مدیریت محتوا،
                سازگار است؟
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              بله! شما می توانید محتوای تولید شده را کپی کرده و مستقیم در سیستم
              مدیریت محتوای خود قرار دهید.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-label="Expand"
              aria-controls="q1-content"
              id="q1-header"
            >
              <Typography>آیا همیار اِی آی، API دارد؟</Typography>
            </AccordionSummary>
            <AccordionDetails>
              هنوز خیر! اما در آینده نزدیک، API همیار اِی آی به سایت اضافه شده و
              برنامه نویسان و شکرت های حوزه هوش مصنوعی می توانند از آن استفاده
              کنند.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="h-screen py-5 -mt-72 px-32 text-center w-full">
        <div className="rounded-2xl shadow-2xl bg-gradient-to-br bg-grad from-cyan-700 to-purple-700 py-10">
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="h3">
                <strong className="font-ordibehesht text-white">
                  هوشِتو مصنوعی کن
                </strong>
              </Typography>
            </div>
            <div>
              <p className="text-gray-300">
                قله های تولید محتوا رو با هوش مصنوعی، فتح کن. امتحانش می ارزه!
              </p>
            </div>
            <div>
              <Btn colors="bg-amber-500 border-transparent mt-5">
                امتحان رایگان
              </Btn>
            </div>
            <div className="flex justify-around text-slate-200 mt-8">
              <span className="flex gap-2 items-center">
                <BsFillCheckCircleFill color="#00ff00" />
                <span>پرامپت قوی</span>
              </span>
              <span className="flex gap-2 items-center">
                {" "}
                <BsFillCheckCircleFill color="#00ff00" />
                <span>10+ ابزار هوش مصنوعی</span>
              </span>
              <span className="flex gap-2 items-center">
                {" "}
                <BsFillCheckCircleFill color="#00ff00" />
                <span>دسترسی آنی</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
