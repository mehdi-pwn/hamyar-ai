import Typography from "@mui/material/Typography";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
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
    <div className="w-full h-72 shadow-2xl rounded-2xl bg-gradient-to-br from-slate-50 to-slate-200 py-5 px-3 text-center flex flex-col justify-center">
      <div className="text-5xl flex justify-center text-primary">{icon}</div>
      <div className="mt-5">
        <strong>
          <Typography variant="h5" color="initial">
            {title}
          </Typography>
        </strong>
      </div>
      <div className="text-gray-600 mt-5">
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
