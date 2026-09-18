import React, {useCallback, useReducer} from "react";
import * as styles from "./AppsListInstructions.module.scss";
import AppsListSection from "./AppsListSection";
import instructionsContent from "./content";

const {sections} = instructionsContent;

function reducer(state, [action, ...payload]) {
  const reducers = {
    toggleItemIndex(index, i) {
      if (state.subsection === i) {
        return {section: -1, subsection: -1};
      } else {
        return {section: index, subsection: i};
      }
    },
    toggleSection(index) {
      return {section: state.section === index ? -1 : index, subsection: -1};
    },
  };
  return {...state, ...reducers[action](...payload)};
}

function initReducer() {
  return {section: -1, subsection: -1};
}

export default function AppsListInstructions() {
  const [{section: activeSectionIndex, subsection: activeItemIndex}, dispatch] = useReducer(reducer, {}, initReducer);

  const toggleSection = useCallback(index => {
    dispatch(["toggleSection", index]);
  }, []);
  const toggleItemIndex = useCallback((index, i) => {
    dispatch(["toggleItemIndex", index, i]);
  }, []);

  function sectionsItems({title, content, faq, info}, index) {
    return (
      <AppsListSection
        key={index}
        title={title}
        content={content}
        faq={faq}
        info={info}
        isActiveSection={index === activeSectionIndex}
        activeItemIndex={activeItemIndex}
        toggleSection={() => toggleSection(index)}
        toggleActiveItemIndex={i => toggleItemIndex(index, i)}
      />
    );
  }

  return (
    <section className={styles["apps-list__instructions"]}>
      <div className={styles["apps-list__instructions-block"]}>{sections.map(sectionsItems)}</div>
    </section>
  );
}
