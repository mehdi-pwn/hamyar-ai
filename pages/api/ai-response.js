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

  const getAiResponse = async (prompt) => {
    try {
      return res.status(200).json({
        status: "success",
        response: "response",
        // response: responseFromOpenAI.text,
      });
    } catch (e) {
      return error(e);
    }
  };

  const handlePrompt = async (toolName, prompt) => {
    try {
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
        UPDATE users SET plan = 1 WHERE id = ?
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

          await getAiResponse(prompt); //! TESTED UNTIL plan==1 and other plans should be tested (0, 2)
        } else if (plan == 2) {
          var today = new Date(),
            expireDate = user.plan_history;
          var expireDateParts = expireDate.split("-");
          var date = new Date(
            expireDateParts[0],
            expireDateParts[1] - 1,
            expireDateParts[2]
          );
          const isExpireDatePassed = today > date;

          if (isExpireDatePassed) {
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
      } else error("کاربر پیدا نشد");
    } catch (e) {
      console.log("Error in prompt handling: " + e);
      return error(e);
    }
  };

  var prompt;
  if (req.method === "POST") {
    switch (req.body.tool) {
      case "article-content": {
        const { keyword, tone, lang } = req.body;
        prompt = `${keyword}`;
        await handlePrompt("article-content", prompt);
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
