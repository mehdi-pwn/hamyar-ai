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
import { showResponse } from "@utils/showResponse";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const ArticleContent = () => {
  const router = useRouter();
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
                onClick={async () => {
                  const response = await getAiResponse(data);
                  console.log(JSON.stringify(response));
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
