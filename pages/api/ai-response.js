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
      text: text,
    });
  };

  const addToHistory = async (oldData, newData, userId) => {
    let old = JSON.parse(oldData);
    old.push(newData);
    const stringed = JSON.stringify(old);
    const add = await query(
      `
        UPDATE users SET plan_history = ? WHERE id = ?
        `,
      [stringed, userId]
    );
  };

  const getAiResponse = (prompt) => {
    try {
      //   const responseFromOpenAI = await api.sendMessage(prompt);
      return res.status(200).json({
        status: "success",
        response: prompt,
        // response: responseFromOpenAI.text,
      });
    } catch (error) {
      return error("خطایی رخ داد");
    }
  };

  const handlePrompt = async (toolName, prompt) => {
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
        var updatePlan = await query(
          `
        UPDATE users SET plan = 0 WHERE id = ?
        `,
          [userId]
        );
        addToHistory(
          user.plan_history,
          {
            date: new Date().toISOString().slice(0, 19).replace("T", " "),
            msg: "plan-1:end",
          },
          userId
        );
        return getAiResponse(prompt);
      } else if (plan == 2) {
        var today = new Date(),
          expireDate = user.plan_history;
        var expireDateParts = expireDate.split("-");
        var date = new Date(
          expireDateParts[0],
          expireDateParts[1] - 1,
          expireDateParts[2]
        );
        const isExpireDatePasses = today > date;

        if (isExpireDatePasses) {
          addToHistory(
            user.plan_history,
            {
              date: new Date().toISOString().slice(0, 19).replace("T", " "),
              msg: "plan-2:end",
            },
            userId
          );
          var updatePlan = await query(
            `
						UPDATE users SET plan = 0, plan_expire_date = NULL WHERE id = ?
						`,
            [userId]
          );
          return res.status(200).json({
            status: "no-plan",
          });
        }

        const toolLimits = JSON.parse(user.tool_limits);
        var currentToolLimit = toolLimits[toolName];
        if (currentToolLimit == 0) {
          return res.status(200).json({
            status: "limit-0",
          });
        } else {
          currentToolLimit--;
          toolLimits[toolName] = currentToolLimit;
          await query("UPDATE users SET tool_limits = ? WHERE id = ?", [
            JSON.stringify(toolLimits),
            userId,
          ]);
          return getAiResponse(prompt);
        }
      } else error("خطایی رخ داد");
    } else error("کاربر پیدا نشد"); //todo:abuse?
    /*
		//get current user id:
        todo:security check: ??? //not working: last_ip == current user ip
            then
        get user plan
            if plan == end
                err
            else plan == free
                send response
                end plan + save to user history:
            else plan == plan_a
                if expire_date < now():
                    err + save to history and clear user row additional items
                if requesting tool user limit == 0
                    err
                else != 0
                    send response
                    current tool user limit - 1 =.
    */
  };

  var prompt;
  if (req.method === "POST") {
    switch (req.body.tool) {
      case "article-content": {
        const { keyword, tone, lang } = req.body;
        prompt = `prompt: ${keyword} / ${tone} / ${lang}`;
        handlePrompt("article-content", prompt);
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