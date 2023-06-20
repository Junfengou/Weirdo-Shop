import "../styles/globals.css";
import React, { useEffect} from "react"
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { RecoilRoot } from "recoil";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.remove();
    }
  }, []);
  return (
    <RecoilRoot>
      <Layout>
      <div id="globalLoader">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
      </div>
        <Component {...pageProps} />;
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
