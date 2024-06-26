import {
  Page,
  Title,
  Description,
  Form,
  KeywordInput,
  ToneAndLang,
  GenerateButton,
  AdvancedOptions,
} from "@components/tool-design";

import Grid from "@mui/material/Grid";
import { getAiResponse } from "@utils/getAiResponse";
import { showResponse } from "@utils/showResponse";
import { useRouter } from "next/router";
import { useState } from "react";

const ArticleContent = () => {
  const [processing, setProcessing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [minWords, setMinWords] = useState("");
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
    keyword,
    tone,
    lang,
    minWords,
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
            <SingleOutputWords
              label="حداقل کلمات مقاله"
              value={minWords}
              onChange={(e) => setMinWords(e.target.value)}
            />
            <ToneAndLang
              toneVal={tone}
              toneChange={(e) => setTone(e.target.value)}
              lang={lang}
              langChange={(e) => setLang(e.target.value)}
            />
            <AdvancedOptions>POV + article LENGTH</AdvancedOptions>
            <GenerateButton processing={processing} onClick={handleClick} />
          </Grid>
        </Form>
      </Page>
    </>
  );
};

export default ArticleContent;
