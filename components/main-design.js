import Typography from "@mui/material/Typography";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { BsFillCheckCircleFill } from "react-icons/bs";
export const Button = ({ children, colors, onClick = null, disabled }) => {
  const c = "rounded-lg py-2 px-4 border " + colors;
  return (
    <button onClick={onClick && onClick} className={c} disabled={disabled}>
      {children}
    </button>
  );
};
export const IndexToolCard = ({
  icon,
  title,
  desc,
  link,
  href,
  link2 = null,
  href2 = null,
}) => {
  return (
    <div className="w-full h-72 shadow-2xl rounded-2xl bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900 py-5 px-3 text-center flex flex-col justify-center">
      <div className="text-5xl flex justify-center text-primary">{icon}</div>
      <div className="mt-5">
        <Typography variant="h5" color="initial">
          <strong className="dark:text-gray-200">{title}</strong>
        </Typography>
      </div>
      <div className="text-gray-600 dark:text-gray-500 mt-5">
        <p>{desc}</p>
      </div>
      <div className="mt-11 flex gap-4 justify-center">
        <Link
          className="text-secondary underline underline-offset-8 flex gap-2 items-center"
          href={href}
        >
          {link}
          <GoArrowLeft />
        </Link>
        {link2 && (
          <>
            <br />
            <Link
              className="text-secondary underline underline-offset-8 flex gap-2 items-center"
              href={href2}
            >
              {link2}
              <GoArrowLeft />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export const CTA = () => {
  return (
    <div className="rounded-2xl shadow-2xl bg-gradient-to-br bg-grad from-cyan-700 to-purple-700 py-10">
      <div className="flex flex-col gap-4 items-center">
        <div>
          <Typography variant="h3">
            <strong className="font-ordibehesht text-white">
              هوشِتو مصنوعی کن
            </strong>
          </Typography>
        </div>
        <div>
          <p className="text-gray-300">
            قله های تولید محتوا رو با هوش مصنوعی، فتح کن. امتحانش می ارزه!
          </p>
        </div>
        <div>
          <Link href={"/signin"}>
            <Button colors="bg-amber-500 border-transparent mt-5 flex gap-3 items-center">
              امتحان رایگان
              <GoArrowLeft />
            </Button>
          </Link>
        </div>
        <div className="flex justify-around gap-20 text-slate-200 mt-8">
          <span className="flex gap-2 items-center">
            <BsFillCheckCircleFill color="#00ff00" />
            <span>پرامپت قوی</span>
          </span>
          <span className="flex gap-2 items-center">
            {" "}
            <BsFillCheckCircleFill color="#00ff00" />
            <span>10+ ابزار هوش مصنوعی</span>
          </span>
          <span className="flex gap-2 items-center">
            {" "}
            <BsFillCheckCircleFill color="#00ff00" />
            <span>دسترسی آنی</span>
          </span>
        </div>
      </div>
    </div>
  );
};
