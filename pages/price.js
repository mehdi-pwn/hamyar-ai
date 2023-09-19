import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import screenShot from "@image/app-screenshot.webp";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

const Price = () => {
  return (
    <div className="pt-16">
      <div className="flex flex-col items-center gap-4 px-28 pt-16">
        <h1 className="font-extrabold text-3xl">قیمت سرویس میهن اِی آی</h1>
        <p>در میهن اِی آی، برای راحتی، از یک پلن استفاده شده است</p>
      </div>
      <div className="mt-10 flex justify-center items-stretch gap-5 p-10">
        <div className="flex-grow py-4">
          <div className="border-2 border-blue-800 rounded-2xl flex flex-col items-center gap-3 p-4">
            <div className="text-center">
              <Typography variant="h5">
                <span className="font-extrabold">پلن اصلی</span>
              </Typography>
              <div className="mt-2">
                <Typography variant="body1">
                  دسترسی به ابزار های میهن اِی آی &nbsp;
                  <span className="underline">برای یک ماه</span>
                </Typography>
              </div>
            </div>
            <div className="py-2">
              <Typography variant="h5">
                <span className="font-extrabold">55 هزار تومان</span>
              </Typography>
            </div>
            <div className="px-3">
              <ul className="flex flex-col gap-3 h-full">
                <li>بیشتر از 20 ابزار هوش مصنوعی تولید محتوا</li>
                <li>ساخت مقاله با هر استایل متن</li>
                <li>آموزش تبدیل متن هوش مصنوعی به شبه انسانی و انسانی</li>
                <li>پشتیبانی رایگان</li>
                <li>لغو پلن و بازگشت وجه در هر زمان</li>
              </ul>
            </div>
            <div className="mt-2 w-full">
              <FormControl fullWidth>
                <Button variant="contained" color="warning">
                  خرید
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="flex-grow py-4">
          <div>
            <Image
              src={screenShot.src}
              alt="Mihan AI app dashboard screen shot"
              className="rounded-xl"
              width={700}
              height={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Price.Layout = MainLayout;

export default Price;
