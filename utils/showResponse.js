import Swal from "sweetalert2";
import { saveResponse } from "./saveResponse";

export const showResponse = async (result) => {
  switch (result.status) {
    case "error":
      console.log(result.text);
      Swal.fire({
        icon: "error",
        title: result.title,
        text: result.text,
        confirmButtonText: "بستن",
      });
      break;
    case "no-plan":
      Swal.fire({
        icon: "info",
        title: "شما هیچ پلن فعالی ندارید",
        text: "اعتبار رایگان شما به پایان رسیده است و شما هیچ پلن فعالی ندارید. برای خرید پلن روی گزینه مشاهده قیمت ها کلیلک کنید",
        confirmButtonText: "مشاهده قیمت ها",
        showCancelButton: true,
        cancelButtonText: "بستن",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/price");
        }
      });
      break;

    case "limit-0":
      Swal.fire({
        icon: "info",
        title: "محدوودیت شما برای این ابزار هوش مصنوعی به پایان رسیده است",
        text: "جهت شارژ مجدد ابزار، به ادمین تیکت بزنید",
        confirmButtonText: "بستن",
      });
      break;

    case "success":
      Swal.fire({
        icon: "success",
        title: "پاسخ هوش مصنوعی آماده است",
        confirmButtonText: "بستن",
        html: `<div>${result.response.text}</div>`,
      });
      await saveResponse(result.prompt, result.response.text);
      break;
  }
};
