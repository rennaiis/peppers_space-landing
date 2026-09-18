import React, {useMemo} from "react";
import {node} from "prop-types";
import ModalProvider from "@/components/baseComponents/controllers/modalController/ModalProvider";
import Preloader from "@/components/baseComponents/gui/preloader/Preloader";
import {useIOSGestureHack} from "@/hooks/useIOSGestureHack";
import {provider, ProviderComposer} from "@/providers/ProviderCompose";
import {useEventActions} from "@/hooks/useEventActions";
import NodeProvider from "@/providers/NodeProvider";
import styles from "./MainLayout.module.scss";
import CustomHeader from "../baseComponents/gui/customHeader/CustomHeader";
import { header } from "@/constants/copyright";

import VideoModal from "@/components/videoModal/VideoModal";

export default function MainLayout({children}) {
  useIOSGestureHack();
  useEventActions();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <ProviderComposer
          providers={useMemo(
            () => [
              provider(NodeProvider),
              provider(ModalProvider, {
                aliases: {
                  videoModal:{Modal:VideoModal}
                },
              }),
            ],
            [],
          )}
        >
          <Preloader />
          <CustomHeader {...header} />
          {children}
        </ProviderComposer>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: node,
};
