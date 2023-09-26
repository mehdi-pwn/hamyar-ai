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
  const [processing, setProcessing] = useState(false);
  const { status } = useSession();

  const handleSubmit = async (e) => {
    setProcessing(true);
    e.preventDefault();
    if (
      isNaN(phoneNumber) ||
      !phoneNumber ||
      phoneNumber == null ||
      phoneNumber.length != 11 ||
      !phoneNumber.startsWith("09")
    ) {
      setProcessing(true);
      return Swal.fire("Enter valid number");
    }

    try {
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
        router.push("/confirm");
      } else {
        setProcessing(false);

        console.log(JSON.stringify(responseData));
        console.error(
          "Failed to send confirmation code: " + responseData.error
        );
      }
    } catch (error) {
      setProcessing(false);

      console.error("Failed to send confirmation code: ", error);
      return alert(error);
    }
  };

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <FormContainer>
      <FormHeader
        title="ورود | ثبت نام"
        text="برای کار با همیار اِی آی، تلفن همراه خود را وارد نمایید"
      />
      <Form onSubmit={handleSubmit}>
        <NumericInput
          placeholder="با 09 شروع شود"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <SubmitForm disabled={processing} title="دریافت کد فعالسازی" />
      </Form>
    </FormContainer>
  );
}

Register.Layout = Logins;
