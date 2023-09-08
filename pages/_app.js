import Layout from "@components/layout";
import "@styles/global.css";
import { ContextProvider } from "@context/ContextProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
