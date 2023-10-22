import RTL from "@layout/rtl";
import DashboardLayout from "@layout/dashboard/dashboardLayout";
import { ContextProvider } from "@context/ContextProvider";
import "@styles/global.css";

export default function MyApp({ Component, ...pageProps }) {
  const Layout = Component.Layout || DashboardLayout;

  return (
    <ContextProvider>
      <RTL>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RTL>
    </ContextProvider>
  );
}
