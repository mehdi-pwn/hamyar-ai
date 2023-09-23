import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
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

export default function Confirm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { status } = useSession();

  const phoneNumber = localStorage.getItem("phone");

  if (
    isNaN(phoneNumber) ||
    !phoneNumber ||
    phoneNumber.length != 11 ||
    !phoneNumber.startsWith("09")
  ) {
    localStorage.setItem("phone", null);
    return router.push("/signin");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isNaN(code) ||
      !code ||
      code == undefined ||
      code.length < 4 ||
      code.length > 5
    )
      return Swal.fire("Enter valid code");

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

        const isBuying = localStorage.getItem("from:price");
        if (isBuying) localStorage.setItem("from:price", false);
        localStorage.setItem("phone", null);

        signIn("credentials", {
          phoneNumber,
          callbackUrl: isBuying ? "/price" : "/",
        });
      } else {
        console.log(JSON.stringify(responseData));
        const error = responseData.error;
        if (error === "not-found") {
          return Swal.fire("User not found");
        } else if (error === "not-valid-number") {
          return Swal.fire(
            "Phone number or code is doesn't have a valid syntax"
          );
        } else if (error === "code-banned-5") {
          return Swal.fire(
            "You cannot accept new code. Try again 5 minutes later"
          );
        } else if (error === "code-expired") {
          return Swal.fire("Code expired");
        } else if (error === "code-incorrect") {
          return Swal.fire("Code incorrect");
        } else alert(error);
      }
    } catch (error) {
      console.error("Failed to check confirmation code:", error);
      return alert(error);
    }

    if (status === "authenticated") {
      router.push("/");
      return null;
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
            "You cannot accept new request. Try again 5 minutes later"
          );
        } else if (error === "code-not-expired") {
          Swal.fire(
            "Your old code is still available to submit. Try again this option in 2 minutes"
          );
        } else {
          alert(resendResponse.error);
        }
      }
    } catch (e) {
      console.error("Failed to resend code:", e);
      return alert(e);
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
          <SubmitForm title="تایید" />
        </Form>
        <div className="mt-5">
          <p onClick={resendCode} className="p-1 cursor-pointer">
            ارسال دوباره کد
          </p>
        </div>
        <div className="text-base mt-10">
          <span>شماره تلفنتان اشتباه است؟</span>
          <Link href="/signin">ثبت نام</Link>
        </div>
      </FormContainer>
    </>
  );
}

Confirm.Layout = Logins;
