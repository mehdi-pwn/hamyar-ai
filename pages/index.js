import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import screenShot from "@image/app-screenshot.webp";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Index = () => {
  return (
    <div className="pt-16">
      <div className="h-screen flex justify-center gap-24 px-28 pt-20">
        <div className="flex flex-col">
          <div>
            <h1 className="text-5xl font-extrabold">
              با میهن اِی آی، خیلی سریع با هوش مصنوعی متن مورد نظرتو بساز!
            </h1>
          </div>
          <div className="mt-5">
            با میهن اِی آی، به بیش از 20 ابزار تولید محتوا با هوش مصنوعی دسترسی
            داشته باشید و سرعت تولید محتوای کسب و کار خود را چند برابر کنید
          </div>
          <div className="flex justify-center flex-row-reverse mt-8 gap-8">
            <Button
              variant="text"
              color="success"
              size="large"
              sx={{ fontSize: "18px" }}
            >
              بیشتر بدانید
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              endIcon={<AiOutlineArrowLeft />}
              sx={{ fontSize: "18px" }}
            >
              شروع
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-xl"
            width={1200}
            height={50}
          />
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
          قابلیت های میهن اِی آی رو توی این فیلم ببین
        </h2>
        <Image
          src={screenShot.src}
          alt="Mihan AI app dashboard screen shot"
          className="rounded-xl"
          width={800}
          height={180}
        />
      </div>
      <div className="h-screen flex justify-center gap-24 px-28 py-20">
        <div>
          <Image
            src={screenShot.src}
            alt="Mihan AI app dashboard screen shot"
            className="rounded-xl"
            width={1700}
            height={180}
          />
        </div>
        <div className="flex flex-col">
          <div>
            <h2>سریعتر مقاله بساز</h2>
          </div>
          <div>
            <p>
              با استفاده از ابزار های قدرت گرفته از هوش مصنوعی همیار اِی آی، از
              صفر تا صد مقاله ها و پست های شبکه های اجتماعی خود را طراحی و
              برنامه ریزی کرده و بسیار سریعتر نسبت به محتوا نویسان معمولی آن ها
              را منتشر کنید
            </p>
          </div>
          <div>
            <ul>
              <li>
                <p>با سه ایده برای محتوات پیدا کن</p>
              </li>
              <li>
                <p>با سه محتواتو خیلی سریع بنویس</p>
              </li>
              <li>
                <p>با بقیهابزارها محتواتو کامل کن</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
