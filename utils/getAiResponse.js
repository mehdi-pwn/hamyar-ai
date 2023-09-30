import { verifyToken } from "./verifyToken";

export async function getAiResponse(data) {
  const verify = await verifyToken();
  if (!verify)
    return {
      result: "error",
      title: "خطای اعتبار سنجی",
      text: "شما از حساب کاربری خود خارج شدید. برای دریافت پاسخ هوش مصنوعی، مجددا وارد شوید",
    };
  try {
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch("/api/ai-response", options);

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return alert(error);
  }
}
