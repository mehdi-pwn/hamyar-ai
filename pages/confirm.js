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

export default function Confirm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { status } = useSession();
  const phoneNumber = localStorage.getItem("phone");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: CHECK IF PHONE PROVIDED OR NOT AND ALSO CHECK IF USER EXISTS
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

      if (responseData.accepted) {
        const verified = await fetch("/api/send-code", {
          method: "POST",
          body: JSON.stringify({ request: "verified", phoneNumber }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        signIn("credentials", {
          phoneNumber,
          callbackUrl: `/`,
        });
        router.replace({
          pathname: "/",
        });
      } else {
        Swal.fire("Incorrrect code");
        return;
      }
    } catch (error) {
      console.error("Failed to check confirmation code:", error);
    }

    //TODO:if no phone detected, navigate to /register
    //send error and if tried to enter more than 5 times below 2 mins, then disallow user to enter more code for 15 mins
    //this features will be added:
    //return to login or reg page and change number //// resend code //// boxed numbers //// banip when user tried to login more than 5 times with same number and failed //// show number which user can check if entered number is correct or not	}

    if (status === "authenticated") {
      router.push("/");
      return null;
    }
  };
  return (
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
    </FormContainer>
  );
}

Confirm.Layout = Logins;
