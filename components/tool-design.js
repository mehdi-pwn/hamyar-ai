import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isLoggedIn } from "@utils/isLoggedIn";
import Swal from "sweetalert2";

export const Page = ({ children }) => {
  return <div className="text-white text-center py-8 px-20">{children}</div>;
};

export const Title = ({ children }) => {
  return (
    <h1 className="text-4xl">
      <strong>{children}</strong>
    </h1>
  );
};
export const Description = ({ children }) => {
  return <p className="mt-4 text-sm">{children}</p>;
};
export const Form = ({ children }) => {
  return <div className="mt-6 text-white">{children}</div>;
};
export const KeywordInput = ({
  label = "عنوان / کلمه کلیدی",
  placeholder,
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
        <MenuItem value="arabic">عربی</MenuItem>
        <MenuItem value="english">انگلیسی</MenuItem>
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
export const GenerateButton = ({ onClick }) => {
  const isLogged = true; //isLoggedIn();
  return (
    <>
      {!isLogged ? (
        <Link href={"/register"}>
          <FormControl fullWidth>
            <Button variant="contained" color="warning">
              ثبت نام رایگان
            </Button>
          </FormControl>
        </Link>
      ) : (
        <FormControl fullWidth>
          <Button onClick={onClick} variant="contained">
            بساز!
          </Button>
        </FormControl>
      )}
    </>
  );
};
