import Swal from "sweetalert2";

export const logoutUser = async () => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const logout = await res.json();

    if (logout.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return Swal.fire("خطا در خروج از حساب کاربری");
  }
};
