import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CssBaseline />
      <Component {...pageProps} />
    </SessionProvider>
  );
}