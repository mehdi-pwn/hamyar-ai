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

const ArticleIdeas = () => {
  const [processing, setProcessing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("s1");
  const [lang, setLang] = useState("persian");

  const handleClick = async () => {
    setProcessing(true);
    const response = await getAiResponse(data);
    setProcessing(false);
    await showResponse(response);
  };

  const data = {
    tool: useRouter().pathname,
    keyword,
    tone,
    lang,
  };

  return (
    <>
      <Page>
        <Title>ایده ساز مقاله</Title>
        <Description>پیدا کردن ایده برای مقاله</Description>
        <Form>
          <Grid container spacing={2}>
            <KeywordInput
              placeholder="مثلا: صبحانه"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <ToneAndLang
              toneVal={tone}
              toneChange={(e) => setTone(e.target.value)}
              lang={lang}
              langChange={(e) => setLang(e.target.value)}
            />

            <GenerateButton processing={processing} onClick={handleClick} />
          </Grid>
        </Form>
      </Page>
    </>
  );
};

export default ArticleIdeas;
