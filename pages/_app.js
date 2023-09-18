import RTL from "@layout/rtl";
import DashboardLayout from "@layout/dashboard/dashboardLayout";
import "@styles/global.css";
import { ContextProvider } from "@context/ContextProvider";

export default function MyApp({ Component, pageProps }) {
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
