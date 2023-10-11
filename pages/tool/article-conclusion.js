const {
  Page,
  Title,
  Description,
  Form,
  KeywordInput,
  ToneAndLang,
  GenerateButton,
  ContentInput,
} = require("@components/tool-design");

import Grid from "@mui/material/Grid";
import { getAiResponse } from "@utils/getAiResponse";
import { getToolName } from "@utils/getToolName";
import { showResponse } from "@utils/showResponse";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const ArticleConclusion = () => {
  const [processing, setProcessing] = useState(false);
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("s1");
  const [lang, setLang] = useState("persian");

  const handleClick = async () => {
    setProcessing(true);
    const response = await getAiResponse(data);
    setProcessing(false);
    await showResponse(response);
  };

  const data = {
    tool: useRouter().pathname.split("/").pop(),
    content,
    tone,
    lang,
  };

  return (
    <>
      <Page>
        <Title>بخش نتیجه گیری مقاله</Title>
        <Description>نوشتن بخش نتیجه گیری با استفاده از مقاله کامل</Description>
        <Form>
          <Grid container spacing={2}>
            <ContentInput
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

export default ArticleConclusion;
