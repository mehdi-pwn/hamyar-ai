const {
  Page,
  Title,
  Description,
  Form,
  KeywordInput,
  ToneAndLang,
  GenerateButton,
} = require("@components/tool-design");

import Grid from "@mui/material/Grid";
import { useState } from "react";

const ArticleContent = () => {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("s1");
  const [lang, setLang] = useState("persian");

  console.log(keyword);
  console.log(tone);
  console.log(lang);

  return (
    <>
      <Page>
        <Title>مقاله نویس</Title>
        <Description>نوشتن مقاله کامل با استفاده از کلمه کلیدی</Description>
        <Form>
          <Grid container spacing={2}>
            <KeywordInput
              placeholder="مثلا: چگونه یک وبلاگ بسازیم"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <ToneAndLang
              toneVal={tone}
              toneChange={(e) => setTone(e.target.value)}
              lang={lang}
              langChange={(e) => setLang(e.target.value)}
            />
            <Grid item xs={12} md={12}>
              <GenerateButton onClick={() => alert("hoora!")} />
            </Grid>
          </Grid>
        </Form>
      </Page>
    </>
  );
};

export default ArticleContent; //next: get ai response utils and api, and in api handle user plan
