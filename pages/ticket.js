const { Page, Title, Form, ContentInput } = require("@components/tool-design");
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import { Button } from "@components/main-design";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { verifyToken } from "@utils/verifyToken";

const Ticket = () => {
  const router = useRouter();
  useEffect(() => {
    async function checkToken() {
      const verify = await verifyToken();
      if (!verify) router.push("/signin");
    }
    checkToken();
  }, []);

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setProcessing(true);

    try {
      const sendMessage = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const sent = await sendMessage.json();

      if (sent.status === "success") {
        Swal.fire(
          "تیکت شما با موفقیت ثبت شد.",
          "نتیجه به زودی از طریق پیامک ارسال خواهد شد"
        );
      } else {
        console.log(JSON.stringify(sent));
        Swal.fire("خطا در ارسال تیکت");
      }
    } catch (error) {
      Swal.fire("خطا در ارسال تیکت");
    }

    setProcessing(false);
  };

  return (
    <>
      <Page>
        <Title>ارسال تیکت به پشتیبانی</Title>
        <Form>
          <Grid container spacing={2}>
            <ContentInput
              label="متن پیام"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <Button
                  disabled={processing}
                  onClick={handleClick}
                  colors={`bg-primary border-primary ${
                    processing
                      ? "bg-opacity-50 cursor-not-allowed flex justify-center items-center border-none"
                      : ""
                  }`}
                >
                  {processing ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-7 h-7"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M22 12c0-5.523-4.477-10-10-10" stroke="black">
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          dur="1s"
                          from="0 12 12"
                          to="360 12 12"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  ) : (
                    "ارسال"
                  )}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Form>
      </Page>
    </>
  );
};

export default Ticket;
