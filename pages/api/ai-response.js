//import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { query } from "@lib/db";

export default async function handler(req, res) {
  //   const api = new ChatGPTUnofficialProxyAPI({
  //     accessToken: process.env.OPENAI_ACCESS_TOKEN,
  //     apiReverseProxyUrl: process.env.API_REVERSE_PROXY_URL,
  //   });

  const error = (text = "") => {
    return res.status(500).json({
      status: "error",
      title: "متاسفانه خطایی رخ داد",
      response: text,
    });
  };

  const preChecks = async () => {
    const userId = 1;

    const userDB = await query(
      `
        SELECT * FROM users WHERE id = ?
        `,
      [userId]
    );

    if (userDB[0]) {
      const user = userDB[0];

      const plan = parseInt(user.plan);
      if (plan == 0) {
        return res.status(200).json({
          status: "no-plan",
        });
      } else if (plan == 1) {
        //استارت اینجا
      } else if (plan == 2) {
      } else error("خطایی رخ داد");
    } else error("کاربر پیدا نشد"); //todo:abuse?

    //get current user id:
    /*
        todo:security check: ??? //not working: last_ip == current user ip
            then
        get user plan
            if plan == end
                err
            else plan == free
                send response
                end plan
            else plan == plan_a
                if expire_date < now():
                    err
                if requesting tool user limit == 0
                    err
                else != 0
                    send response
                    current tool user limit - 1 =.

    
    */
  };

  const handlePrompt = (prompt) => {
    try {
      //   const responseFromOpenAI = await api.sendMessage(prompt);
      res.status(200).json({
        status: "success",
        response: prompt,
        // response: responseFromOpenAI.text,
      });
    } catch (error) {
      error("خطایی رخ داد");
    }
  };

  var prompt;

  if (req.method === "POST") {
    switch (req.body.tool) {
      case "article-content": {
        const { keyword, tone, lang } = req.body;
        prompt = `prompt: ${keyword} / ${tone} / ${lang}`;
        handlePrompt(prompt);
        break;
      }
      default: {
        error("ابزار هوش مصنوعی پیدا نشد");
      }
    }
  } else {
    error("Invalid request method");
  }
}
