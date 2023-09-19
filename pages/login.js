import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Logins from "@layout/logins";
import { signIn } from "next-auth/react";
import {
  FormContainer,
  FormHeader,
  Form,
  Row,
  NumericInput,
  PasswordInput,
  SubmitForm,
} from "@components/signin-design";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (user.status == "not-found") {
        Swal.fire("User not found. Please register");
        return;
      }

      //TODO: Handle if not verified but code sent less than 2 minutes before
      const response = await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ request: "send-login-code", phoneNumber }),
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
      <FormHeader title="ورود" text="برای کار با سامانه، وارد شوید" />
      <Form onSubmit={handleSubmit}>
        <Row cols={1}>
          <NumericInput
            labeled="تلفن همراه"
            placeholder="تلفن همراه"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Row>
        <SubmitForm title="ورود" />
      </Form>
      <div className="text-base mt-5">
        <span>قبلا ثبت نام نکرده اید؟</span>{" "}
        <Link href="/register">ثبت نام</Link>
      </div>
    </FormContainer>
  );
}

Login.Layout = Logins;
