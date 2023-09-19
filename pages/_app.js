import RTL from "@layout/rtl";
import { SessionProvider } from "next-auth/react";
import DashboardLayout from "@layout/dashboard/dashboardLayout";
import "@styles/global.css";
import { ContextProvider } from "@context/ContextProvider";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const Layout = Component.Layout || DashboardLayout;

  return (
    <ContextProvider>
      <SessionProvider session={session}>
        <RTL>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RTL>
      </SessionProvider>
    </ContextProvider>
  );
}
