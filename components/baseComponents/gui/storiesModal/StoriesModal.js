import React from "react";
import * as PropTypes from "prop-types";
import StoriesModalPage from "./StoriesModalPage";
import Stories from "react-insta-stories";
import styles from "./StoriesModal.module.scss";
import classNames from "classnames";

export default function StoriesModal(props) {
  // const dispatch = useDispatch();
  // TODO: activeStoryId - id текущего блока, хранить в redux!
  // TODO: allList = колличество общих блоков, list = массив из отдельных сторисов в блоке
  // TODO: list = allList[activeStoryId]
  // const {list, allList} = props;

  // TODO: это тестовый список
  const list = [
    {
      image:
        "https://images.unsplash.com/photo-1684704882953-01cf452c46f2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1684704882598-89629c3bcd3d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1684704882890-2fd5a8648e9d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1684704882699-36d82ff7fdc9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1684704882119-08fd0997f07f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const newList = list?.map((item, index) => {
    return {
      content: () => {
        return <StoriesModalPage {...item} key={`item-${index}`} />;
      },
    };
  });

  /// TODO: обернуть в кастомный фуллскриновый модальник

  return (
    <div className={classNames("stories-modal", styles.storiesModal)}>
      <div className={classNames("stories-modal__bg", styles.storiesModal__bg)} />
      <div className={classNames("stories-modal__content", styles.storiesModal__content)}>
        <Stories
          stories={newList}
          width={"100%"}
          height={"100%"}
          defaultInterval={15000}
          progressWrapperStyles={{
            borderRadius: "3px",
            height: "3px",
            background: `rgba(33, 33, 33, 0.56)`,
          }}
          progressStyles={{
            borderRadius: "3px",
            height: "3px",
            background: "#ffffff",
          }}
          keyboardNavigation={true}
          onAllStoriesEnd={() => {
            // TODO: тут описана логика для переключения между общими блоками, значения которых сохранили в redux
            // if (activeStoryId === allList - 1) {
            //   dispatch(changeActiveStoryId(0))
            // } else {
            //   dispatch(changeActiveStoryId(activeStoryId + 1))
            // }
            // closeModal({type:"all"});
          }}
        />
      </div>
    </div>
  );
}
StoriesModal.propTypes = {
  children: PropTypes.node,
};
