import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import {
  FormContainer,
  FormHeader,
  Form,
  NumericInput,
  SubmitForm,
} from "@components/signin-design";
import Logins from "@layout/logins";
import Link from "next/link";
import { verifyToken } from "@utils/verifyToken";
import { useEffect } from "react";

export default function Confirm() {
  const router = useRouter();
  let phoneNumber = null;
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function checkVerified() {
      const verify = await verifyToken();
      if (verify) router.push("/");
    }
    checkVerified();

    phoneNumber = localStorage.getItem("phone");

    if (
      isNaN(phoneNumber) ||
      !phoneNumber ||
      phoneNumber.length != 11 ||
      !phoneNumber.startsWith("09")
    ) {
      localStorage.setItem("phone", null);
      return router.push("/signin");
    }
  }, []);

  const handleSubmit = async (e) => {
    setProcessing(true);

    e.preventDefault();
    if (
      isNaN(code) ||
      !code ||
      code == undefined ||
      code.length < 4 ||
      code.length > 5
    ) {
      setProcessing(false);
      return Swal.fire("کد وارد شده اشتباه است");
    }

    try {
      const response = await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ request: "verify", code, phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.status === "success") {
        const verified = await fetch("/api/send-code", {
          method: "POST",
          body: JSON.stringify({ request: "verified", phoneNumber }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/");
      } else {
        setProcessing(false);
        console.log(JSON.stringify(responseData));
        const error = responseData.error;
        if (error === "not-found") {
          return Swal.fire("کاربر پیدا نشد");
        } else if (error === "not-valid-number") {
          return Swal.fire("فرمت تلفن همراه یا کد وارد شده، اشتباه است");
        } else if (error === "code-banned-5") {
          return Swal.fire(
            "شما اجازه وارد کردن کد را برای 5 دقیقه آینده ندارید"
          );
        } else if (error === "code-expired") {
          return Swal.fire("کد ارسال شده، منقضی شده است");
        } else if (error === "code-incorrect") {
          return Swal.fire("کد وارد شده اشتباه است");
        } else alert(error);
      }
    } catch (error) {
      setProcessing(false);
      console.error("Failed to check confirmation code:", error);
      return alert(error);
    }
  };
  const resendCode = async () => {
    try {
      const response = await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ request: "resend", phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resendResponse = await response.json();

      if (resendResponse.status === "success") {
        console.log(resendResponse.code);
      } else {
        const error = resendResponse.error;
        if (error === "not-found" || error === "no-phone") {
          localStorage.setItem("phone", null);
          router.push("/signin");
        } else if (error === "code-banned-5") {
          return Swal.fire(
            "شما 5 بار کد فعالسازی را اشتباه وارد کردید. لطفا 5 دقیقه دیگر، دوباره امتحان کنید"
          );
        } else if (error === "code-not-expired") {
          Swal.fire(
            "کد ارسال شده قبلی، هنوز قابل استفاده است. برای دریافت کد جدید، لطفا 2 دقیقه صبر کنید"
          );
        } else {
          Swal.fire("خطایی رخ داد");
        }
      }
    } catch (e) {
      return Swal.fire("خطایی رخ داد");
    }
  };
  return (
    <>
      <FormContainer>
        <FormHeader
          title="ورود کد فعالسازی"
          text="کد فعالسازی ارسال شده به تلفن همراه خود را وارد نمایید"
        />
        <Form onSubmit={handleSubmit}>
          <NumericInput
            placeholder="کد فعالسازی"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <SubmitForm disabled={processing} title="تایید" />
        </Form>
        <div className="mt-5">
          <p onClick={resendCode} className="p-1 cursor-pointer">
            ارسال دوباره کد
          </p>
        </div>
        <div className="text-base mt-3">
          <span>شماره تلفنتان اشتباه است؟</span>
          &nbsp;
          <Link
            className="text-primary underline underline-offset-8"
            href="/signin"
          >
            بازگشت
          </Link>
        </div>
      </FormContainer>
    </>
  );
}

Confirm.Layout = Logins;
