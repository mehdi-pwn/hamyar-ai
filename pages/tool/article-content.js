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
import { getAiResponse } from "@utils/getAiResponse";
import { getToolName } from "@utils/getToolName";
import { useState } from "react";

const ArticleContent = () => {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("s1");
  const [lang, setLang] = useState("persian");

  const data = {
    tool: getToolName(),
    keyword,
    tone,
    lang,
  };

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
              <GenerateButton
                onClick={() => {
                  const response = getAiResponse(data);
                  response.then((result) => {
                    console.log(result.response);
                  });
                }}
              />
            </Grid>
          </Grid>
        </Form>
      </Page>
    </>
  );
};

export default ArticleContent; //next: get ai response utils and api, and in api handle user plan
