import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "@context/ContextProvider";
import { useEffect, useState } from "react";
import { verifyToken } from "@utils/verifyToken";
import {
  DarkModeToggle,
  SigninButton,
  ProfileButton,
  ProfileNotification,
} from "@layout/shared";

/*
input_C REF = 0.0005
output_C REF = 0.0015

C = model_c / Ref
*/
const AIs = [
  {
    id: 1,
    name: "GPT-3.5-turbo",
    input_C: 1,
    output_C: 1,
  },
  {
    id: 2,
    name: "GPT-4",
    input_C: 6,
    output_C: 40,
  },
];

const AIsSelection = () => {
  const [ai, setAi] = useState(null);
  const [userData, setUserData] = useState({});
  const [saveProcessing, setsaveProcessing] = useState(false);

  useEffect(() => {
    async function getAiModel() {
      const decoded = await verifyToken();

      if (!decoded) router.push("/signin");
      else if (decoded) setUserData(decoded.user);

      try {
        const getAiModel = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "get-ai-model",
            userId: userData.id,
          }),
        });
        const gotAi = await getName.json();

        if (gotAi.status === "success") {
          setAi(gotAi.id);
        } else Swal.fire("خطایی رخ داد");
      } catch (error) {
        console.log(error);
        Swal.fire("خطایی رخ داد");
      }
    }
    getAiModel();
  }, []);

  const handleChange = async (e) => {
    try {
      setAi(e.target.value);
      setsaveProcessing(true);
      const update = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "set-ai-model",
          ai_id: ai,
          userId: userData.id,
        }),
      });
      setsaveProcessing(false);
      const updated = await update.json();
      if (updated.status === "success") {
      } else if (updated.error === "plan") {
        return Swal.fire(
          "فقط کاربران حرفه ای میتونن مدل هوش مصنوعی رو تغییر بدن"
        );
      } else return Swal.fire("خطایی رخ داد");
    } catch (error) {
      console.log(error);
      setsaveProcessing(false);
      return Swal.fire("خطایی رخ داد");
    }
  };
  return (
    <FormControl diabled={saveProcessing}>
      <Select
        value={ai}
        label="مدل هوش مصنوعی"
        onChange={handleChange}
        size="small"
        disabl
      >
        {AIs.map((AI) => (
          <MenuItem value={AI.id}>
            {AI.name} (ضریب ورودی: {AI.input_C} | ضریب خروجی: {AI.output_C})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Header = () => {
  const { setSidebarActive, profileBarActive, profileBarRef } =
    useStateContext();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkVerified() {
      const verify = await verifyToken();
      if (verify) setIsLogged(true);
    }
    checkVerified();
  }, []);

  return (
    <header className="w-full static h-16 flex flex-col justify-center border-b border-gray-400 dark:border-gray-800">
      <div className="flex justify-between text-white p-2 relative">
        <div className="flex items-center">
          <button
            onClick={() =>
              setSidebarActive((prevSidebarActive) => !prevSidebarActive)
            }
            type="button"
            className="p-2 rounded-full text-xl text-black dark:text-white"
          >
            {<AiOutlineMenu />}
          </button>
        </div>
        <div className="flex gap-2">
          {isLogged && <></>}
          <DarkModeToggle />

          {!isLogged ? <SigninButton /> : <ProfileButton />}
        </div>
        {profileBarActive && isLogged && (
          <ProfileNotification profileBarRef={profileBarRef} />
        )}
      </div>
    </header>
  );
};

export default Header;
