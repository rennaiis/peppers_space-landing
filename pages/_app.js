import React, {useEffect} from "react";
import Head from "next/head";
import {Provider} from "react-redux";
import store from "@/redux/store";
import MainLayout from "@/components/layouts/MainLayout";
import PropTypes from "prop-types";
import "@/styles/main.scss";
import PageDescription from "@/components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "@/constants/page-description";
import {onResize} from "@/constants/adaptive-settings";
import {useErudaParam} from "@PS/frontend";

const MyApp = ({Component, pageProps}) => {
  useErudaParam();

  useEffect(() => {
    global.addEventListener("resize", onResize);
    onResize();
    return () => global.removeEventListener("resize", onResize);
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, target-densitydpi=medium-dpi"
        />
      </Head>
      <PageDescription {...defaultPage} />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
