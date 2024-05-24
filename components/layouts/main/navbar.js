import { useStateContext } from "@context/ContextProvider";
import { logoutUser } from "@utils/logoutUser";
import { verifyToken } from "@utils/verifyToken";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Nav = ({ path, text }) => {
  const { setNavbarActive } = useStateContext();
  return (
    <Link
      onClick={() => {
        setNavbarActive(false);
      }}
      href={path}
    >
      {text}
    </Link>
  );
};
const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkLogged() {
      const verify = await verifyToken();
      if (verify) setIsLogged(true);
    }
    checkLogged();
  }, []);

  return (
    <div className="h-fit w-screen bg-primary bg-opacity-10 backdrop-filter backdrop-blur-lg z-[9999999999] fixed top-0 left-0 mt-16">
      <div className="flex flex-col justify-center items-center py-5 gap-4">
        <Nav path="/features" text="قابلیت ها" />
        <Nav path="/tools" text="ابزار ها" />
        <Nav path="/price" text="خرید اشتراک" />
        {!isLogged ? (
          <Nav path="/signin" text="ورود به حساب کاربری" />
        ) : (
          <>
            <Nav path="/profile" text="مشاهده پروفایل" />
            <button
              onClick={async () => {
                const logout = await logoutUser();
                if (logout) {
                  if (router.pathname === "/") window.location.reload();
                  else router.push("/");
                } else
                  return Swal.fire({
                    icon: "error",
                    title: "خطا در خروج از حساب کاربری",
                  });
              }}
            ></button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
