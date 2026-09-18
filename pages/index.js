import React, { useState } from "react";
import PageDescription from "@/components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "@/constants/page-description";
import CustomHeader from "@/components/baseComponents/gui/customHeader/CustomHeader";
import Footer from "@/components/baseComponents/gui/footer/Footer";
import {buy, footerContent, header} from "@/constants/copyright";
import Intro from "@/components/intro/Intro";
import Winners from "@/components/winners/Winners";
import Results from "@/components/results/Results";
import Steps from "@/components/steps/Steps";
import Buy from "@/components/buy/Buy";
import App from "@/components/app/App";
import Space from "@/components/space/Space";
import VideoModal from "@/components/videoModal/VideoModal";


export default function Home() { 
  return (
    <>
      <PageDescription {...defaultPage} />
      <Intro/>
      <Winners/>
      <Results/>
      <Steps/>
      <Buy />
      <App/>
      <Space/>
      <Footer {...footerContent} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
