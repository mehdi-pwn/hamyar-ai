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

const WebsiteTitle = () => {
  const [processing, setProcessing] = useState(false);
  const [description, setDescription] = useState("");
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
    description,
    tone,
    lang,
  };

  return (
    <>
      <Page>
        <Title>عنوان وبسایت</Title>
        <Description>پیشنهاد عنوان وبسایت</Description>
        <Form>
          <Grid container spacing={2}>
            <KeywordInput
              label="توضیح وبسایت"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default WebsiteTitle;
