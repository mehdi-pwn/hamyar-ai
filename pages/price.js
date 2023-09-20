import MainLayout from "@layout/main/mainLayout";
import Image from "next/image";
import screenShot from "@image/app-screenshot.webp";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { isLoggedIn } from "@utils/isLoggedIn";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Price = () => {
  const router = useRouter();
  const handleBuy = async () => {
    const isLogged = true;
    const userId = 1;
    if (isLogged) {
      try {
        const active = await fetch("/api/active-plan", {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonResponse = await active.json();

        if (jsonResponse.status == "actice") {
          return Swal.fire({
            icon: "info",
            title: "شما در حال حاضر یک پلن فعال دارید",
            text: "برای خرید مجدد پلن، بایستی زمان پلن قبلی شما به اتمام رسیده باشد. در صورتی که میخواهید حتما در همین زمان، یک پلن دیگر را خریداری نمایید، لطفا به ادمین تیکت بزنید",
            confirmButtonText: "بستن",
          });
        } else {
          //goto /pay
        }
      } catch (error) {
        console.error("Failed to send confirmation code: ", error);
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
          localStorage.setItem("from:price", true);
          router.push("/register");
        }
      });
    }
  };
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
                <Button onClick={handleBuy} variant="contained" color="warning">
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
