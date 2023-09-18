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

const ArticleContent = () => {
  return (
    <>
      <Page>
        <Title>مقاله نویس</Title>
        <Description>نوشتن مقاله کامل با استفاده از کلمه کلیدی</Description>
        <Form>
          <Grid container spacing={2}>
            <KeywordInput placeholder="مثلا: چگونه یک وبلاگ بسازیم" />
            <ToneAndLang />
            <Grid item xs={12} md={12}>
              <GenerateButton />
            </Grid>
          </Grid>
        </Form>
      </Page>
    </>
  );
};

export default ArticleContent;
