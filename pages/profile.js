import { Button } from "@components/main-design";
import MainLayout from "@layout/main/mainLayout";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { verifyToken } from "@utils/verifyToken";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NoPlan = () => (
  <div className="bg-slate-200 flex flex-col gap-3 items-center p-2 rounded-xl shadow-lg">
    <span>شما هیچ پلن فعالی ندارید</span>
    <Link href={"/price"}>
      <Button colors={"bg-amber-500 border-none"}>خرید اشتراک</Button>
    </Link>
  </div>
);
const FreePlan = () => (
  <div className="bg-gradient-to-bl from-slate-200 to-gray-200 w-full flex flex-col gap-3 items-center p-2 rounded-xl shadow-lg">
    <span>
      پلن رایگان شما فعال است و می توانید از یکی از ابزار ها، برای یکبار استفاده
      کنید
    </span>
    <Link href={"/price"}>
      <Button colors={"bg-amber-500 border-none"}>خرید اشتراک</Button>
    </Link>
  </div>
);
const PaidPlan = () => (
  <div className="bg-gradient-to-bl from-blue-500 to-purple-500 flex flex-col w-full items-center justify-center p-10 rounded-xl shadow-lg">
    <span className="text-white">پلن الماس برای شما فعال است</span>
  </div>
);

const Profile = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [userData, setUserData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getFullNameFromDB() {
      const decoded = await verifyToken();

      if (!decoded) router.push("/signin");
      else if (decoded) setUserData(decoded.user);

      try {
        const getName = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "get-name",
            userId: userData.id,
          }),
        });
        const gotName = await getName.json();

        if (gotName.status === "success") {
          setFullName(gotName.name);
        } else Swal.fire("خطایی رخ داد");
      } catch (error) {
        console.log(error);
        Swal.fire("خطایی رخ داد");
      }
    }
    getFullNameFromDB();
  }, []);

  const handleUpdate = async () => {
    if (fullName.length > 255 || fullName < 3)
      return Swal.fire(
        "نام و نام خانوادگی نباید کمتر از حرف و بیشتر از 255 حرف باشد"
      );
    setIsSaving(true);
    try {
      const update = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "set-name",
          userId: userData.id,
          name: `${fullName}`,
        }),
      });
      setIsSaving(false);
      const updated = await update.json();
      if (updated.status === "success") {
        Swal.fire("با موفقیت ثبت گردید");
      } else return Swal.fire("خطایی رخ داد");
    } catch (error) {
      console.log(error);
      setIsSaving(false);

      return Swal.fire("خطایی رخ داد");
    }
  };
  return (
    <div className="pt-16">
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-5 p-10">
        <div className="flex-grow bg-slate-200 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center gap-4">
          <Typography variant="h4">
            <strong>مشخصات کاربری</strong>
          </Typography>
          <FormControl fullWidth>
            <TextField
              label="نام و نام خانوادگی"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <div className="w-full">
            <Button
              onClick={handleUpdate}
              colors={"bg-primary border-none text-white"}
              disabled={isSaving}
            >
              ذخیره
            </Button>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center gap-4">
          <div>
            <Typography variant="h3">
              <strong>پلن فعال</strong>
            </Typography>
          </div>
          {userData.plan == 0 ? (
            <NoPlan />
          ) : userData.plan == 1 ? (
            <FreePlan />
          ) : (
            <PaidPlan />
          )}
        </div>
      </div>
    </div>
  );
};
Profile.Layout = MainLayout;
export default Profile;
