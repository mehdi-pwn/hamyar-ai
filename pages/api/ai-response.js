import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { query } from "@lib/db";
import jwt from "jsonwebtoken";
import logger from "@utils/logger";

const BAD_WORDS = [
  "Blood",
  "Bloodbath",
  "Crucifixion",
  "Bloody",
  "Flesh",
  "Bruises",
  "Car crash",
  "Corpse",
  "Crucified",
  "Cutting",
  "Decapitate",
  "Infested",
  "Gruesome",
  "Kill",
  "Infected",
  "Sadist",
  "Slaughter",
  "Teratoma",
  "Tryphophobia",
  "Wound",
  "Cronenberg",
  "Khorne",
  "Cannibal",
  "Cannibalism",
  "Visceral",
  "Guts",
  "Bloodshot",
  "Gory",
  "Killing",
  "Surgery",
  "Vivisection",
  "Massacre",
  "Hemoglobin",
  "Suicide",
  "Female Body Parts",
  "ahegao",
  "pinup",
  "ballgag",
  "Playboy",
  "Bimbo",
  "pleasure",
  "bodily fluids",
  "pleasures",
  "boudoir",
  "rule34",
  "brothel",
  "seducing",
  "dominatrix",
  "seductive",
  "erotic seductive",
  "fuck",
  "sensual",
  "Hardcore",
  "sexy",
  "Hentai",
  "Shag",
  "horny",
  "shibari",
  "incest",
  "Smut",
  "jav",
  "succubus",
  "Jerk off king at pic",
  "thot",
  "kinbaku",
  "transparent",
  "legs spread",
  "twerk",
  "making love",
  "voluptuous",
  "naughty",
  "wincest",
  "orgy",
  "Sultry",
  "XXX",
  "Bondage",
  "Bdsm",
  "Dog collar",
  "Slavegirl",
  "Transparent and Translucent",
  "Arse",
  "Labia",
  "Ass",
  "Mammaries",
  "Human centipede",
  "Badonkers",
  "Minge",
  "Massive chests",
  "Big Ass",
  "Mommy Milker",
  "Booba",
  "Nipple",
  "Booty",
  "Oppai",
  "Bosom",
  "Organs",
  "Breasts",
  "Ovaries",
  "Busty",
  "Penis",
  "Clunge",
  "Phallus",
  "Crotch",
  "sexy female",
  "Dick",
  "Skimpy",
  "Girth",
  "Thick",
  "Honkers",
  "Vagina",
  "Hooters",
  "Veiny",
  "Knob",
  "no clothes",
  "Speedo",
  "au naturale",
  "no shirt",
  "bare chest",
  "nude",
  "barely dressed",
  "bra",
  "risqué",
  "clear",
  "scantily",
  "clad",
  "cleavage",
  "stripped",
  "full frontal unclothed",
  "invisible clothes",
  "wearing nothing",
  "lingerie with no shirt",
  "naked",
  "without clothes on",
  "negligee",
  "zero clothes",
  "Taboo",
  "Fascist",
  "Nazi",
  "Prophet Mohammed",
  "Slave",
  "Coon",
  "Honkey",
  "Arrested",
  "Jail",
  "Handcuffs",
];

export default async function handler(req, res) {
  const gptAPI = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPENAI_ACCESS_TOKEN,
    apiReverseProxyUrl: process.env.API_REVERSE_PROXY_URL,
  });

  const handlePrompt = async (prompt, userId) => {
    try {
      if (
        BAD_WORDS.some((word) =>
          prompt.toLowerCase().includes(word.toLowerCase())
        )
      ) {
        logger.info("User " + userId + " used bad word. Prompt: " + prompt);
        return error(
          "متن ورودی شما دارای کلمات ممنوعه است. لطفا متن خود را اصلاح نموده و مجدد امتحان نمایید"
        );
      }
      const userDB = await query(
        `
        SELECT plan,plan_history,words FROM users WHERE id = ?
        `,
        [userId]
      );
      if (userDB[0]) {
        const user = userDB[0];

        const plan = parseInt(user.plan);

        if (plan == 0) {
          return res.status(403).json({
            status: "no-plan",
          });
        } else if (plan == 1) {
          const res = await getAiResponse(prompt, userId);
          if (!res) {
            return error("خطای دریافت اطلاعات از هوش مصنوعی");
          } else {
            await query(
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
            return res.status(200).json({
              status: "success",
              prompt,
              response: res,
            });
          }
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
            await query(
              `
						UPDATE users SET plan = 0, plan_expire_date = NULL WHERE id = ?
						`,
              [userId]
            );
            return res.status(403).json({
              status: "no-plan",
            });
          }

          const userWords = parseInt(user.words);
          if (userWords <= 0) {
            return res.status(403).json({
              status: "limit-0",
            });
          } else {
            const res = await getAiResponse(prompt, userId);
            if (!res) {
              return error("خطای دریافت اطلاعات از هوش مصنوعی");
            } else {
              const responseWords = res.split(" ").length;
              let newWords = userWords - responseWords;

              if (newWords < 0) newWords = 0;

              await query(
                `
      UPDATE users SET words = ? WHERE id = ?
      `,
                [newWords, userId]
              );
              return res.status(200).json({
                status: "success",
                prompt,
                response: res,
              });
            }
          }
        } else error("خطایی رخ داد");
      } else error("کاربر پیدا نشد");
    } catch (e) {
      console.log("Error in prompt handling: " + e);
      return error(e);
    }
  };

  const getAiResponse = async (prompt, userId) => {
    try {
      const gptResponse = await gptAPI.sendMessage(prompt, {
        timeoutMs: 3 * 60 * 1000,
      });
      const responseText = gptResponse.text;
      return responseText;
    } catch (e) {
      return false;
    }
  };

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

  var prompt;
  if (req.method === "POST") {
    const token = req.cookies.token;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (e) {
      return error("خطای اعتبار سنجی کاربر");
    }
    const userId = decoded.id;
    switch (req.body.tool) {
      case "article-conclusion": {
        const { content, tone, lang } = req.body;
        prompt = `برای این مقاله، نتیجه گیری بنویس: ${content}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "article-content": {
        const { keyword, tone, lang } = req.body;
        prompt = `برای این کلمات کلیدی، مقاله بنویس: ${keyword}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "article-ideas": {
        const { keyword, tone, lang } = req.body;
        prompt = `برای این کلمات کلیدی، ایده برای نوشتن مقاله بگو: ${keyword}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "article-overview": {
        const { content, tone, lang } = req.body;
        prompt = `بخش مقدمه برای این مقاله بنویس: ${content}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "content-rewrite": {
        const { content, tone, lang } = req.body;
        prompt = `این مقاله رو مجددا بنویس: ${content}`;
        await handlePrompt(prompt, userId);
        break;
      }

      case "instagram-caption": {
        const { description, tone, lang } = req.body;
        prompt = `برای این پست اینستاگرام، کپشن بنویس: ${description}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "instagram-title": {
        const { description, tone, lang } = req.body;
        prompt = `برای این پست اینستاگرام، چند عنوان خوب پیشنهاد بده: ${description}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "video-description": {
        const { description, tone, lang } = req.body;
        prompt = `برای این ویدیو، توضیحات بنویس: ${description}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "video-script": {
        const { description, tone, lang } = req.body;
        prompt = `برای این ویدیو، فیلنامه بنویس: ${description}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "video-title": {
        const { description, tone, lang } = req.body;
        prompt = `برای این ویدیو، چند عدد عنوان پیشنهاد بده: ${description}`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "website-domain": {
        const { description, tone, lang } = req.body;
        prompt = `برای یک وبسایت در مورد ${description}، چند عدد دامنه خوب پیشنهاد بده`;
        await handlePrompt(prompt, userId);
        break;
      }
      case "website-title": {
        const { description, tone, lang } = req.body;
        prompt = `برای یک وبسایت در مورد ${description}، چند عدد عنوان خوب پیشنهاد بده`;
        await handlePrompt(prompt, userId);
        break;
      }

      default: {
        error("ابزار هوش مصنوعی پیدا نشد " + req.body.tool);
      }
    }
  } else {
    error("Invalid request method");
  }
}
