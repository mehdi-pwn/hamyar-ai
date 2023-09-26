import Typography from "@mui/material/Typography";
import Link from "next/link";
export const Button = ({ children, colors }) => {
  const c = "rounded-lg py-2 px-4 border " + colors;
  return <button className={c}>{children}</button>;
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
          className="text-secondary underline underline-offset-8"
          href={href}
        >
          {link}
        </Link>
        {link2 && (
          <>
            <br />
            <Link
              className="text-secondary underline underline-offset-8"
              href={href2}
            >
              {link2}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
