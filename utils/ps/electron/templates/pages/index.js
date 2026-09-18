import React from "react";
import AppsList from "../components/baseComponents/gui/appsList/AppsList";

export default function Index({apps, title}) {
  return <AppsList apps={apps} title={title} />;
}

export async function getStaticProps() {
  const {name} = require("../electron/package");
  const {apps, getDocs} = require("../utils/data-parser/apps");

  return {
    props: {
      data: false,
      title: name,
      apps: apps.map(app => ({
        app,
        content: app.doc ? getDocs(app.doc)[0] : false,
      })),
    },
  };
}
