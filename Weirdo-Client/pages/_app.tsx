import "../styles/globals.css";
import React, { useEffect} from "react"
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { Spinner } from "@material-tailwind/react";
import { RecoilRoot } from "recoil";
import localFont from "@next/font/local"

const frenchFries = localFont({ src: '../public/fonts/frenchfries.woff'})

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
      {/* <main className={frenchFries.className}> */}
      <main>
        <Layout>
        <div id="globalLoader">
          <Spinner className="h-12 w-12" />
        </div>
        <Component {...pageProps} />;
        </Layout>
      </main>
    </RecoilRoot>
  );
}

export default MyApp;
