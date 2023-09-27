import Typography from "@mui/material/Typography";
import MainLayout from "@layout/main/mainLayout";

const About = () => {
  return (
    <div className="pt-8">
      <div className="h-screen flex flex-col items-center justify-center gap-5">
        <Typography variant="h1">
          <strong className="font-ordibehesht">
            همیار &nbsp;&nbsp;&nbsp; اِی آی
          </strong>
        </Typography>
        <Typography variant="ا5">
          <strong>ساخته شده برای بلاگر ها</strong>
        </Typography>
      </div>
      <div className="px-20">
        <div>
          <Typography variant="h4">
            <strong>وظایف همیار اِی آی</strong>
          </Typography>
        </div>
        <div className="flex justify-around gap-20 mt-5 pb-10">
          <div className="flex flex-col gap-10">
            <div className="text-gray-600">
              <p>
                <span className="text-black">پیشرفت شما: </span>
                ما در همیار اِی آی به شما اجازه میدیم که با تولید محتوای سریعتر،
                سرعت رشد کسب و کار خودتونو بالا ببرین.
              </p>
            </div>
            <div className="text-gray-600">
              <p>
                <span className="text-black">قیمت معقول: </span>
                در همیار اِی آی، از قیمتی معقول برای پلن الماس استفاده شده و
                بنابراین کسب و کار هایی که تازه شروع به کار کرده اند، از قدرت
                هوش مصنوعی در پیشرفت کسب و کارشان محروم نمی شوند.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="text-gray-600">
              <p>
                <span className="text-black">پرامپت حرفه ای: </span>
                در همیار اِی آی، از پرامپت های پیچیده و منطقی (Logic) برای ساخت
                محتوا استفاده می شود. این کار باعث بهبود نوشتن مقاله نسبت به
                داده های دریافتی می شود.
              </p>
            </div>
            <div className="text-gray-600">
              <p>
                <span className="text-black">مشتری محور: </span>
                ما برای به حداکثر رساندن رضایت مشتری به تیکت های پیشنهادی و
                انتقادی شما، اهمیت قائل هستیم و در صورتی که ایده خوبی برای میهن
                اِی آی ارائه دهید، با شما ارتباط خواهیم گرفت و در صورت اجرایی
                شدن ایده، به شما پاداش خواهیم داد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
About.Layout = MainLayout;

export default About;
