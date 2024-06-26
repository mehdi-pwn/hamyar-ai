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
import Cookies from "js-cookie";
import { verifyToken } from "@utils/verifyToken";
import { useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function checkVerified() {
      const verify = await verifyToken();
      if (verify) router.push("/");
    }
    checkVerified();
  }, []);

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
      return Swal.fire({
        icon: "warning",
        title: "لطفا یک شماره تلفن صحیح وارد نمایید",
      });
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
        alert(responseData.code);
        Cookies.set("phone", `${phoneNumber}`);
        router.push("/confirm");
      } else {
        setProcessing(false);
        return Swal.fire({
          icon: "error",
          title: "خطا در ارسال کد فعالسازی",
        });
      }
    } catch (error) {
      setProcessing(false);
      return Swal.fire({ icon: "error", title: "خطا در ارسال کد فعالسازی" });
    }
  };

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
