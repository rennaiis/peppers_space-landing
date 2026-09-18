import useLicense from "../hooks/useLicense";
import useDevTools from "../hooks/useDevTools";
// import useEruda from "../hooks/useEruda";
import LangProvider from "../redux/reducer/language";
import PageDescription from "@/components/baseComponents/head/pageDescription/PageDescription";
import MainLayout from "../components/layouts/MainLayout";
import Version from "../components/version/Version";
import {DebugProvider} from "../hooks/useDebug";
import {Provider} from "react-redux";
import defaultPage from "@/constants/page-description";
import store from "@/redux/store";
import PropTypes from "prop-types";

const MyApp = ({Component, pageProps}) => {
  // useEruda();
  useLicense(Component.license);
  useDevTools();

  const Layout = Component.Layout || MainLayout;

  return (
    <Provider store={store}>
      <PageDescription {...defaultPage} />
      <DebugProvider>
        <LangProvider>
          <Layout Page={Component} props={pageProps} />
        </LangProvider>
      </DebugProvider>
      <Version />
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
