import {useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import ModalProvider from "@/components/baseComponents/controllers/modalController/ModalProvider";
import Preloader from "@/components/baseComponents/gui/preloader/Preloader";
import {provider, ProviderComposer} from "@/providers/ProviderCompose";
import {fetchData, search, setNoData, useData} from "../../redux/reducer/data";
import {node} from "prop-types";
import ErrorBoundary from "../baseComponents/ErrorBoundary";

const Content = ({Page, props}) => {
  const dispatch = useDispatch();
  const {isData, isLoaded, error} = useData();
  const app = search.app || search.data || Page.data;

  useEffect(() => {
    dispatch(app ? fetchData(app) : setNoData());
  }, [app]);

  if (error) return JSON.stringify(error.message);
  if (!(isData === false || isLoaded)) return "Загрузка";

  const {Wrapper} = Page;

  if (!Wrapper) return <Page {...props} />;

  return <Wrapper Page={Page} props={props} />;
};

const MainLayout = props => {
  return (
    <ErrorBoundary>
      <ProviderComposer providers={useMemo(() => [provider(ModalProvider, {aliases: {}})], [])}>
        <Preloader />
        <Content {...props} />
      </ProviderComposer>
    </ErrorBoundary>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: node,
};
