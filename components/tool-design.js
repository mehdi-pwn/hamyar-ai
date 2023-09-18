import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
export const KeywordInput = ({ label = "عنوان / کلمه کلیدی", placeholder }) => {
  return (
    <Grid item xs={12} md={12}>
      <FormControl fullWidth>
        <TextField label={label} placeholder={placeholder} variant="filled" />
      </FormControl>
    </Grid>
  );
};
export const ToneSelect = () => {
  return (
    <FormControl fullWidth style={{ marginTop: "13px" }}>
      <InputLabel style={{ fontSize: "20px" }}>استایل متن</InputLabel>
      <Select fullWidth defaultValue="s1" style={{ marginTop: "17px" }}>
        <MenuItem value="s1">رسمی</MenuItem>
        <MenuItem value="s2">شوخ</MenuItem>
      </Select>
    </FormControl>
  );
};
export const LanguageSelect = () => {
  return (
    <FormControl fullWidth style={{ marginTop: "13px" }}>
      <InputLabel style={{ fontSize: "20px" }}>زبان</InputLabel>
      <Select fullWidth defaultValue="persian" style={{ marginTop: "17px" }}>
        <MenuItem value="persian">فارسی</MenuItem>
        <MenuItem value="arabic">عربی</MenuItem>
        <MenuItem value="english">انگلیسی</MenuItem>
      </Select>
    </FormControl>
  );
};
export const ToneAndLang = () => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <LanguageSelect />
      </Grid>
      <Grid item xs={12} md={6}>
        <ToneSelect />
      </Grid>
    </>
  );
};
export const GenerateButton = () => {
  return (
    <FormControl fullWidth>
      <Button variant="contained">بساز!</Button>
    </FormControl>
  );
};
