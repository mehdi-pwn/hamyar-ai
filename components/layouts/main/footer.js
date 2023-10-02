import Typography from "@mui/material/Typography";
import { FaShopware } from "react-icons/fa";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-20 px-20 text-center border-t border-slate-300">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex items-center gap-2">
              <FaShopware />
              <Typography variant="h5">
                <strong>همیار اِی آی</strong>
              </Typography>
            </div>

            <strong>
              <p>محتوا ساز هوش مصنوعی</p>
            </strong>

            <p className="text-gray-600 dark:text-gray-500">
              ابزار های بلاگری و تولید محتوا. بهشتی برای کسب و کار های اینترنتی.
            </p>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex flex-col gap-3 items-start">
            <strong>همیار اِی آی</strong>
            <ul className="flex flex-col gap-3 items-start mt-2">
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/about">درباره</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/terms">شرایط استفاده</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/price">خرید اشتراک</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/signin">ورود به حساب کاربری</Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex flex-col gap-3 items-start">
            <strong>صفحات</strong>
            <ul className="flex flex-col gap-3 items-start mt-2">
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/features">ویژگی ها</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/tools">ابزار ها</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/profile">پروفایل کاربری</Link>
              </li>
              <li className="text-gray-600 dark:text-gray-500 underline underline-offset-8">
                <Link href="/ticket">پشتیبانی</Link>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
