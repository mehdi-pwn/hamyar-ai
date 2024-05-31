import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { BingChat } from "bing-chat";
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
    accessToken: process.env.OPENAI_ACCESS_TOKEN, //https://chat.openai.com/api/auth/session
    apiReverseProxyUrl: process.env.API_REVERSE_PROXY_URL,
  });
  const bingAPI = new BingChat({
    cookie: process.env.BING_API_KEY,
  });
  const handlePrompt = async (prompt, userId) => {
    try {
      if (
        BAD_WORDS.some((word) =>
          prompt.toLowerCase().includes(word.toLowerCase())
        )
      ) {
        logger.info("USER:" + userId + " used bad word. PROMPT:" + prompt);
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
          logger.info(
            `USER:${userId} tried to get an ai response with ended free plan`
          );
          return res.status(403).json({
            status: "no-plan",
          });
        } else if (plan == 1) {
          const result = await getAiResponse(prompt, userId);
          if (!result) {
            return error("خطای دریافت اطلاعات از هوش مصنوعی");
          } else {
            await query(
              //* CHANGE PLAN=1 IF NEEDED FOR DEVELOPEMENT
              `
UPDATE users SET plan = 1 WHERE id = ?
`,
              [userId]
            );
            await addToHistory(
              user.plan_history,
              {
                date: new Date().toISOString().slice(0, 19).replace("T", " "),
                msg: "plan-1:end",
              },
              userId
            );
            logger.info(`USER:${userId} used it's free plan`);
            return res.status(200).json({
              status: "success",
              prompt,
              response: result,
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
            logger.info(
              `USER:${userId} tried to get an ai response. But expiredate is passed`
            );
            return res.status(403).json({
              status: "no-plan",
            });
          }
          const userWords = parseInt(user.words);
          if (userWords <= 0) {
            logger.info(
              `USER:${userId} tried to get an ai response. But no words remained`
            );
            return res.status(403).json({
              status: "limit-0",
            });
          } else {
            const result = await getAiResponse(prompt, userId);
            if (!result) {
              return error("خطای دریافت اطلاعات از هوش مصنوعی");
            } else {
              const responseWords = result.split(" ").length;
              let newWords = userWords - responseWords;
              if (newWords < 0) newWords = 0;
              await query(
                `
UPDATE users SET words = ? WHERE id = ?
`,
                [newWords, userId]
              );
              logger.info(
                `USER:${userId} tried to get an ai response. Success. NEW_WORDS:${newWords}`
              );
              return res.status(200).json({
                status: "success",
                prompt,
                response: result,
              });
            }
          }
        } else {
          logger.info(`USER:${userId} tried to get an ai response. But failed`);
          error("خطایی رخ داد");
        }
      } else {
        logger.info(
          `USER:${userId} tried to get an ai response. But user not found from DB`
        );
        error(`کاربر پیدا نشد.`);
      }
    } catch (e) {
      let ipAddress = req.headers["x-real-ip"];
      if (!ipAddress) {
        ipAddress = req.headers["x-forwarded-for"]?.split(",")[0];
      }
      logger.info(
        `Trying to get an ai response. But failed: ${e}. IP:${ipAddress}`
      );
      return error("خطای سیستمی رخ داد. لطفا ادمین را مطلع سازید");
    }
  };
  const getAiResponse = (prompt, userId) => {
    try {
      const gptResponse = bingAPI.sendMessage(prompt);
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
    logger.info(`USER:${userId} history has been updated`);
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
        const { content, tone, lang, lowWords, highWords } = req.body;
        prompt = `از تو میخواهم که به عنوان یک نویسنده حرفه ای عمل کنید و برام یک نتیجه گیری متقاعد کننده برای این مقاله بنویسی: ${content} نتیجه گیری باید خلاصه ای مختصر از نکات اصلی مورد بحث در مقاله ارائه دهد. باید پایان احساساتی را شامل شود و پایان رضایت بخشی را برای خواننده ارائه دهد. نتیجه باید شامل دعوت به اقدام برای تشویق خواننده به برداشتن گام‌های بیشتر باشد. نتیجه گیری باید ذهن خواننده را درگیر یک سوال کند و به تفکر عمیق تر در مورد موضوع تشویق کند. نتیجه گیری باید نکات کلیدی یا موارد آموخته شده از مقاله را برجسته کند و پایانی به یاد ماندنی برای خواننده فراهم سازد. طول خروجی باید بین ${lowWords} و ${highWords} کلمه باشد. از لحن ${tone} استفاده کن`;
        logger.info(`TOOL:article-conclusion just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "article-content": {
        const { keyword, tone, minWords, lang } = req.body;
        prompt = `شما یک مقاله نویس خوب برای وبسایت هستید و تجربه خوبی در این موضوع دارید. یک مقاله در مورد این کلمات کلیدی بنویس: ${keyword} این مقاله باید دارای ساختار خوب و قوی باشد (دارای ساختاری واضح با سرفصل ها، زیر عنوان ها و پاراگراف ها برای کمک به خوانندگان برای هدایت آنها و درک اطلاعات آسان). همچنین متن مقاله باید با به سایت و موضوع مرتبط باشد و دارای اطلاعات مفید و ارزشمند باشد. همچنین محتوا باید به شیوه ای واضح نوشته شود و از اصطلاحات غیر ضروری یا کلمات پیچیده اجتناب شود. برای افزایش خوانایی از جملات ساده و قابل هضم استفاده شود. محتوا باید حداقل () کلمه داشته باشد و از لحن ${tone} در نوشتن مقاله استفاده شود. همچنین القا شود که نویسنده، در موضوع مقاله متخصص است. فراموش نکن که یک مقاله با کیفیت بالا بنویسی.`;
        logger.info(`TOOL:article-content just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "article-ideas": {
        const { keyword, tone, lang } = req.body;
        prompt = `یک لیست پست های وبلاگی با حداقل 10 تا ایده در مورد این موضوعات بنویس: ${keyword}. برای هر آیتم، یک عنوان سئو شده بنویس و از لحن ${tone} در عناوین استفاده کن.`;
        logger.info(`TOOL:article-ideas just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "article-overview": {
        const { content, tone, words, lang } = req.body;
        prompt = `برای این مقاله، مقدمه بنویس: ${content}. مقدمه باید مختصر، جذاب، دارای عنوان واضح و قانع کننده. دارای عنوان مرتبط، لحن متقاعد کننده، دارای قلاب شروع و سوال ابتدایی، بهینه شده برای سئو و خوانا. اندازه متن خروجی حدود ${words} کلمه باشد. از لحن ${tone} استفاده کن.`;
        logger.info(`TOOL:article-overview just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "content-rewrite": {
        const { content, tone, writer, pov, words, lang } = req.body;
        prompt = `این مقاله رو مجددا بنویس و مشکلات گرامری رو تصحیح کن. از لحن ${tone} استفاده کن و متن اون رو برای سئو بهینه کن. شبیه ${writer} بنویس. این متن مقاله هست: ${content}. زاویه دید رو ${pov} کن. کلمات خروجی حدودا ${words} تا باشه.`;
        logger.info(`TOOL:content-rewrite just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "instagram-caption": {
        const { description, tone, lang } = req.body;
        prompt = `من یک عکس/ویدیو دارم که میخام اون رو داخل اینستاگرام منتشر کنم. توضیح عکس: ${description}. برام حداقل 5 کپشن برای این عکس/ویدیو بنویس تا اون رو داخل کانالم قرار بدم. کپشن ها باید مرتبط به عکس، خلاق، (دارای دعوت به اقدام)، احساسی و دارای هشتگ باشند و از لحن ${tone} استفاده شده باشد.`;
        logger.info(`TOOL:instagram-caption just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "instagram-title": {
        const { description, tone, lang } = req.body;
        prompt = `یک لیست شامل 5 عنوان جذاب برای این متن پیشنهاد بده که میخام داخل پیج اینستاگرامم، اون رو منتشر کنم: ${description}. از لحن ${tone} استفاده کنم`;
        logger.info(`TOOL:video-title just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "video-description": {
        const { description, tone, lang } = req.body;
        prompt = `برای این ویدیو، توضیحات بنویس: ${description}`;
        logger.info(`TOOL:video-descriptin just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "video-script": {
        const { description, tone, lang } = req.body;
        prompt = `برای این ویدیو، فیلنامه بنویس: ${description}`;
        logger.info(`TOOL:video-script just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "video-title": {
        const { description, tone, lang } = req.body;
        prompt = `برای این ویدیو، چند عدد عنوان پیشنهاد بده: ${description}`;
        logger.info(`TOOL:video-title just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "website-domain": {
        const { description, tone, lang } = req.body;
        prompt = `برای یک وبسایت در مورد ${description}، چند عدد دامنه خوب پیشنهاد بده`;
        logger.info(`TOOL:video- just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      case "website-title": {
        const { description, tone, lang } = req.body;
        prompt = `برای یک وبسایت در مورد ${description}، چند عدد عنوان خوب پیشنهاد بده`;
        logger.info(`TOOL:video- just used`);
        await handlePrompt(prompt, userId);
        break;
      }
      default: {
        let ipAddress = req.headers["x-real-ip"];
        if (!ipAddress) {
          ipAddress = req.headers["x-forwarded-for"]?.split(",")[0];
        }
        logger.info(`TOOL:unknown used. IP:${ipAddress}`);
        error("ابزار هوش مصنوعی پیدا نشد " + req.body.tool);
      }
    }
  } else {
    let ipAddress = req.headers["x-real-ip"];
    if (!ipAddress) {
      ipAddress = req.headers["x-forwarded-for"]?.split(",")[0];
    }
    logger.info(
      `Tried to access ai-response with invalid request method. IP:${ipAddress}`
    );
    error("Invalid request method");
  }
}
