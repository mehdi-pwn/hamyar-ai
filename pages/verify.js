import MainLayout from "@layout/main/mainLayout";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { verifyToken } from "@utils/verifyToken";

const NotVerified = ({
  errorMessage = "متاسفانه خرید، موفقیت آمیز نبوده و یا توسط کاربر لغو شده است.",
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="rounded-lg py-8 px-4 shadow-lg bg-white">
        <div className="flex flex-col items-center gap-7">
          <div>
            <AiFillCloseCircle size={100} color="red" />
          </div>
          <div className="flex flex-col items-center gap-10">
            <div>
              <Typography variant="h3" color="initial">
                عملیات خرید، موفقیت آمیز نبود
              </Typography>
            </div>
            <div>
              <Typography variant="body1">{errorMessage}</Typography>
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <Button
                  onClick={() => router.push("/price")} //TODO: check here and directly /startpay/
                  variant="contained"
                  color="warning"
                  size="large"
                >
                  امتحان مجدد و اتصال به درگاه
                </Button>
              </FormControl>
            </div>
          </div>
          <div>
            <Link href={"/"}>رفتن به صفحه اصلی</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const Verified = ({ ref_id = 0 }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="rounded-lg py-8 px-4 shadow-lg bg-white">
        <div className="flex flex-col items-center gap-7">
          <div>
            <BsFillPatchCheckFill size={100} color="green" />
          </div>
          <div className="flex flex-col items-center gap-10">
            <div>
              <Typography variant="h3" color="initial">
                خرید شما با موفقیت انجام شد
              </Typography>
            </div>
            <div>
              <Typography variant="body1">
                پلن طلایی همیار اِی آی هم اکنون برای شما فعال شده و می توانید از
                ابزار ها استفاده کنید
                <br />
                شماره پیگیری بانک: {ref_id}
              </Typography>
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <Button
                  onClick={() => router.push("/tools")}
                  variant="contained"
                  color="success"
                  size="large"
                >
                  مشاهده ابزار ها
                </Button>
              </FormControl>
            </div>
          </div>
          <div>
            <Link href={"/"}>رفتن به صفحه اصلی</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Verify = () => {
  const router = useRouter();
  useEffect(() => {
    async function checkVerified() {
      const verify = await verifyToken();
      if (!verify) router.push("/");
    }
    checkVerified();
  }, []);
  //const { Authority, Status } = router.query;
  const Authority = 56;
  const Status = "NOK";

  if (!Authority || !Status) {
    return (
      <p>
        Access to this page without required data is not allowed. Go to{" "}
        <Link href={"/price"}>price</Link> page to buy plan.
      </p>
    );
  }
  if (Status === "NOK") {
    return <NotVerified />;
  } else if (Status === "OK") {
    try {
      const verify = await verifyToken();
      const userId = verify.user.id;
      const verifyPayment = await fetch("/api/verify-payment", {
        method: "POST",
        body: JSON.stringify({ userId, auth: Authority }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const verified = await verifyPayment.json();

      if (verified.status === "payment-error") {
        return <NotVerified errorMessage={verified.message} />;
      }

      return <Verified ref_id={verified.data.ref_id} />;
    } catch (error) {
      console.log("Error: " + error);
      return Swal.fire(
        "خطا در تایید تراکنش. در صورت کم شدن وجه، به طور خودکار پس از 48 ساعت به حسابتان باز خواهد گشت"
      );
    }
  }
};
Verify.Layout = MainLayout;
export default Verify;
