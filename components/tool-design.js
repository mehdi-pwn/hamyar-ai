import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import { verifyToken } from "@utils/verifyToken";
import { useEffect, useState } from "react";

export const Page = ({ children }) => {
  return (
    <div className="text-white text-center py-8 p-5 lg:px-20">{children}</div>
  );
};

export const Title = ({ children }) => {
  return (
    <Typography variant="h3">
      <strong className="text-black dark:text-white">{children}</strong>
    </Typography>
  );
};
export const Description = ({ children }) => {
  return (
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{children}</p>
  );
};
export const Form = ({ children }) => {
  return <div className="mt-6 text-white">{children}</div>;
};
export const KeywordInput = ({
  label = "عنوان / کلمه کلیدی",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <Grid item xs={12} md={12}>
      <FormControl fullWidth>
        <TextField
          label={label}
          placeholder={placeholder}
          variant="filled"
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </Grid>
  );
};
export const ContentInput = ({
  label = "متن مقاله",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <Grid item xs={12} md={12}>
      <FormControl fullWidth>
        <TextField
          label={label}
          placeholder={placeholder}
          variant="filled"
          multiline
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </Grid>
  );
};
export const ToneSelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth style={{ marginTop: "13px" }}>
      <InputLabel style={{ fontSize: "20px" }}>استایل متن</InputLabel>
      <Select
        fullWidth
        defaultValue="s1"
        value={value}
        onChange={onChange}
        style={{ marginTop: "17px" }}
      >
        <MenuItem value="s1">رسمی</MenuItem>
        <MenuItem value="s2">شوخ</MenuItem>
      </Select>
    </FormControl>
  );
};
export const LanguageSelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth style={{ marginTop: "13px" }}>
      <InputLabel style={{ fontSize: "20px" }}>زبان</InputLabel>
      <Select
        fullWidth
        defaultValue="persian"
        value={value}
        onChange={onChange}
        style={{ marginTop: "17px" }}
      >
        <MenuItem value="persian">فارسی</MenuItem>
      </Select>
    </FormControl>
  );
};
export const ToneAndLang = ({ toneVal, toneChange, langVal, langChange }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <LanguageSelect value={langVal} onChange={langChange} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ToneSelect value={toneVal} onChange={toneChange} />
      </Grid>
    </>
  );
};
export const GenerateButton = ({ processing, onClick }) => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    async function getToken() {
      const verify = await verifyToken();
      if (!verify) setIsLogged(false);
      else if (verify) setIsLogged(true);
    }
    getToken();
  }, []);

  return (
    <>
      {!isLogged ? (
        <Grid item xs={12} md={12}>
          <Link href={"/signin"}>
            <FormControl fullWidth>
              <Button colors={`bg-amber-500 border-amber-500`}>
                ثبت نام رایگان
              </Button>
            </FormControl>
          </Link>
        </Grid>
      ) : (
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <Button
              disabled={processing}
              onClick={onClick}
              colors={`bg-primary border-primary ${
                processing
                  ? "bg-opacity-50 cursor-not-allowed flex justify-center items-center border-none"
                  : ""
              }`}
            >
              {processing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M22 12c0-5.523-4.477-10-10-10" stroke="black">
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      dur="1s"
                      from="0 12 12"
                      to="360 12 12"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              ) : (
                "بساز!"
              )}
            </Button>
          </FormControl>
        </Grid>
      )}
    </>
  );
};
const Button = ({ children, colors, onClick }) => {
  const c = "rounded-lg py-2 px-4 border " + colors;
  return (
    <button onClick={onClick} className={c}>
      {children}
    </button>
  );
};
