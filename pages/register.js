import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import {
  FormContainer,
  FormHeader,
  Form,
  NumericInput,
  PasswordInput,
  SubmitForm,
} from "@components/signin-design";
import Logins from "@layout/logins";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //5859831161125587 حامد بیرانوند
    if (
      isNaN(phoneNumber) ||
      !phoneNumber ||
      phoneNumber == null ||
      phoneNumber.length != 11 ||
      !phoneNumber.startsWith("09")
    )
      return Swal.fire("Enter valid number");

    try {
      const userExists = await fetch("/api/user-exist", {
        method: "POST",
        body: JSON.stringify({ phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await userExists.json();

      if (user.status == "found") {
        Swal.fire("User already exists. please login");
        return;
      }

      //TODO: Handle if not verified but code sent less than 2 minutes before
      const response = await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ request: "send", phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (responseData.status == "success") {
        console.log(responseData.code);
        localStorage.setItem("phone", phoneNumber);
        router.replace({
          pathname: "/confirm",
        });
      } else {
        console.error("Failed to send confirmation code");
      }
    } catch (error) {
      console.error("Failed to send confirmation code: ", error);
    }
  };

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <FormContainer>
      <FormHeader title="ثبت نام" text="برای کار با سامانه، ثبت نام کنید" />
      <Form onSubmit={handleSubmit}>
        <NumericInput
          placeholder="با 09 شروع شود"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <SubmitForm title="دریافت کد فعالسازی" />
      </Form>
      <div className="text-base mt-5">
        <span>ﻗﺒﻼ ﻗﺒﺖ ﻧﺎﻡ ﮐﺮﺩﻩ اﯾﺪ؟ </span> <Link href="/login">ﻭﺭﻭﺩ</Link>
      </div>
    </FormContainer>
  );
}

Register.Layout = Logins;
