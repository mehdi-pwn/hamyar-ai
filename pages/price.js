import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import screenShot from "@image/app-screenshot.webp";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "@components/main-design";
import { GoArrowLeft } from "react-icons/go";
import { verifyToken } from "@utils/verifyToken";
import { useStateContext } from "@context/ContextProvider";

const Price = () => {
  const router = useRouter();
  const { screenSize } = useStateContext();

  const handleBuy = async () => {
    try {
      const verify = await verifyToken();
      if (verify) {
        const userId = verify.user.id;
        const active = await fetch("/api/active-plan", {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonResponse = await active.json();

        if (jsonResponse.status == "active") {
          return Swal.fire({
            icon: "info",
            title: "شما در حال حاضر یک پلن فعال دارید",
            text: "برای خرید مجدد پلن، بایستی زمان پلن قبلی شما به اتمام رسیده باشد. در صورتی که میخواهید حتما در همین زمان، یک پلن دیگر را خریداری نمایید، لطفا به ادمین تیکت بزنید",
            confirmButtonText: "ارسال تیکت",
            showCancelButton: true,
            cancelButtonText: "بستن",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/ticket");
            }
          });
        } else {
          const payRequest = await fetch("/api/request-payment", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const paymentData = await payRequest.json();

          if (paymentData.status === "not-found")
            return Swal.fire({
              icon: "error",
              title: "کاربر پیدا نشد.",
              text: "لطفا از حساب کاربری خود خارج شده و مجددا وارد شوید. در صورتی که مجددا این خطا را مشاهده کردید، افزونه های خود را غیر فعال کرده و یا در بخش پشتیبانی، تیکت بزنید",
            });
          if (paymentData.status === "active")
            return Swal.fire({
              icon: "info",
              title: "شما در حال حاضر یک پلن فعال دارید",
            });

          if (paymentData.code === 100) {
            //continue
            const paymentAuth = paymentData.data.authority;
            router.push("https://www.zarinpal.com/pg/StartPay/" + paymentAuth);
            console.log(paymentData);
          } else {
            console.log(paymentData);
            Swal.fire({
              icon: "warning",
              title: "خطا در ارتباط با درگاه پرداخت",
            });
          }
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "شما هنوز ثبت نام نکردید یا وارد نشده اید",
          text: "برای خرید این پلن، لطفا در ابتدا وارد سایت شده و سپس اقدام به خرید نمایید",
          confirmButtonText: "ثبت نام | ورود",
          showCancelButton: true,
          cancelButtonText: "بستن",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/signin");
          }
        });
      }
    } catch (error) {
      console.error("Failed to buy plan: ", error);
      return alert(error);
    }
  };
  return (
    <div className="pt-16">
      <div className="flex flex-col items-center gap-4 px-5 lg:px-28 pt-16">
        <h1 className="font-extrabold text-3xl"></h1>
        <Typography variant="h3">
          <span>
            اشتراک{" "}
            <strong className="bg-gradient-to-r from-blue-800 to-purple-950 text-transparent bg-clip-text">
              الماس
            </strong>{" "}
            همیار اِی آی
          </span>
        </Typography>
        <p>
          در همیار اِی آی، برای راحتی مشتریان گرامی، از یک پلن استفاده کردیم. با
          خیال راحت خرید کنین!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 px-7 lg:px-10 mt-10">
        <div className="flex-grow">
          <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-amber-500 rounded-2xl flex flex-col items-center gap-3 p-4 text-white">
            <div className="text-center">
              <Typography variant="h4" component="h5">
                <strong className="font-extrabold">پلن الماس</strong>
              </Typography>
              <div className="mt-2">
                <Typography variant="body1">
                  <span className="text-gray-300">
                    دسترسی به همه ابزار های همیار اِی آی &nbsp;
                    <span className="underline underline-offset-8">
                      برای یک ماه
                    </span>
                  </span>
                </Typography>
              </div>
            </div>
            <div className="py-2 mt-8 flex gap-2 items-end">
              <Typography variant="h4" component="h5">
                <strong className="font-extrabold">55 هزار تومان</strong>
              </Typography>
              <p className="mb-1">/ یک ماه</p>
            </div>
            <div className="px-3 mt-10 flex-grow">
              <ul className="flex flex-col gap-3 h-full">
                <Pro>بیشتر از 20 ابزار هوش مصنوعی تولید محتوا</Pro>
                <Pro>ساخت مقاله با هر استایل متن</Pro>
                <Pro>آموزش تبدیل متن هوش مصنوعی به شبه انسانی و انسانی</Pro>
                <Pro>پشتیبانی رایگان</Pro>
                <Pro>لغو پلن و بازگشت وجه در هر زمان</Pro>
              </ul>
            </div>
            <div className="w-full">
              <Button
                onClick={handleBuy}
                colors="bg-gradient-to-l from-orange-600 to-yellow-600 border-none w-full flex gap-2 items-center justify-center !rounded-full py-2 text-lg"
              >
                خرید
                <GoArrowLeft />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-grow rounded-xl bg-gradient-to-br from-amber-300 to-green-300 flex flex-col items-center justify-center gap-10 pt-10 pb-8 px-3">
          <div>
            <Typography variant={screenSize > 900 ? "h5" : "h6"}>
              <strong className="bg-gradient-to-l from-yellow-600 via-green-500 to-blue-600 text-white p-3 rounded-full">
                همیار اِی آی: هوشِتو مصنوعی کن!
              </strong>
            </Typography>
          </div>
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

const Pro = ({ children }) => {
  return (
    <li className="flex gap-2 items-center">
      <BsFillCheckCircleFill color="#3ABC51" />
      {children}
    </li>
  );
};

Price.Layout = MainLayout;

export default Price;
