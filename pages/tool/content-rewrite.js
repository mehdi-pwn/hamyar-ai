import {
  Page,
  Title,
  Description,
  Form,
  ToneAndLang,
  GenerateButton,
  ContentInput,
  TextInput,
  SingleOutputWords,
} from "@components/tool-design";
import Grid from "@mui/material/Grid";
import { getAiResponse } from "@utils/getAiResponse";
import { getToolName } from "@utils/getToolName";
import { showResponse } from "@utils/showResponse";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const ContentRewrite = () => {
  const [processing, setProcessing] = useState(false);
  const [content, setContent] = useState("");
  const [words, setWords] = useState("second");
  const [pov, setPov] = useState("");
  const [writer, setWriter] = useState("");
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
    pov,
    lang,
    words,

    writer,
  };

  return (
    <>
      <Page>
        <Title>بازنویسی مقاله</Title>
        <Description>بازنویسی مقاله با استفاده از مقاله کامل</Description>
        <Form>
          <Grid container spacing={2}>
            <ContentInput
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <TextInput
              label="زاویه دید"
              placeholder="مثلا اول شخص"
              value={pov}
              onChange={(e) => setPov(e.target.value)}
            />
            <TextInput
              label="استایل نویسنده"
              placeholder="مثلا احمد شاملو"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
            <SingleOutputWords
              value={words}
              onChange={(e) => setWords(e.target.value)}
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

export default ContentRewrite;
