import {useDispatch} from "react-redux";
import {useMemo} from "react";
import requests from "../redux/reducer/requests";
import content from "../redux/reducer/content";
// import elf from "../redux/reducer/elf";
// import user from "../redux/reducer/user";

export default function useApplicationCallbacks() {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getServiceData: () => dispatch(requests.thunks.getServiceData()),
      // shop
      getShopItems: () => dispatch(requests.thunks.shopItems()),
      buyItem: id => dispatch(requests.thunks.buyItem(id)),
      equipItem: id => dispatch(requests.thunks.equipItem(id)),
      getLootBoxesList: () => dispatch(requests.thunks.getLootBoxesList()),
      buyLootBoxById: id => dispatch(requests.thunks.buyLootBoxById(id)),
      setActiveLootBoxPrize: lootBox => dispatch(content.actions.setActiveLootBoxPrize(lootBox)),
      setInteractiveShopBackground: backgroundUrl =>
        dispatch(content.actions.setInteractiveShopBackground(backgroundUrl)),
      // favorites
      getFavorites: pageData => dispatch(requests.thunks.getFavorites(pageData)),
      addFriend: id => dispatch(requests.thunks.addFriend(id)),
      resetFriends: () => dispatch(user.actions.resetFriends()),
      getFriend: id => dispatch(requests.thunks.getFriend(id)),
      getUserData: id => dispatch(requests.thunks.getUserData(id)),
      setLike: ({uid, type}) => dispatch(requests.thunks.setLike({uid, type})),
      setDislike: ({uid}) => dispatch(requests.thunks.setDislike({uid})),
      // quiz
      getCurrentQuiz: () => dispatch(requests.thunks.getCurrentQuiz()),
      submitCurrentQuizResult: data => dispatch(requests.thunks.submitCurrentQuizResult(data)),
      getQuizQuests: () => dispatch(requests.thunks.getQuizQuests()),
      submitQuizQuest: data => dispatch(requests.thunks.submitQuizQuest(data)),
      buyQuiz: () => dispatch(requests.thunks.buyQuiz()),
      setActiveQuizQuests: uid => dispatch(content.actions.setActiveQuizQuests(uid)),
      setActiveQuizQuest: quest => dispatch(content.actions.setActiveQuizQuest(quest)),
      setActiveWinners: data => dispatch(content.actions.setActiveWinners(data)),
      // rating
      getGeneralRating: () => {
        dispatch(requests.thunks.getRating({}));
        dispatch(requests.thunks.getWeekRating({}));
        dispatch(requests.thunks.getUserRating({}));
        dispatch(requests.thunks.getUserWeekRating({}));
      },
      getMayRating: () => {
        dispatch(
          requests.thunks.getRating({
            params: {
              "RatingSearch[updated_at]": "01.05.2025-01.06.2025",
            },
          }),
        );
        dispatch(
          requests.thunks.getWeekRating({
            params: {
              "RatingSearch[updated_at]": "01.05.2025-01.06.2025",
            },
          }),
        );
        dispatch(
          requests.thunks.getUserRating({
            params: {
              "WeekRatingSearch[updated_at]": "01.05.2025-01.06.2025",
            },
          }),
        );
        dispatch(
          requests.thunks.getUserWeekRating({
            params: {
              "WeekRatingSearch[updated_at]": "01.05.2025-01.06.2025",
            },
          }),
        );
      },
      getGameRating: (type, {isSendGameRating = true, isSendUserGameRating = true} = {}) => {
        isSendGameRating && dispatch(requests.thunks.getGameRating({type}));
        isSendUserGameRating && dispatch(requests.thunks.getUserGameRating({type}));
      },
      getOldGameRating: (type, updatedAt, {isSendGameRating = true, isSendUserGameRating = true} = {}) => {
        isSendGameRating && dispatch(requests.thunks.getGameRating({type, updatedAt}));
        isSendUserGameRating && dispatch(requests.thunks.getUserGameRating({type, updatedAt}));
      },
      getOldWeekRating: () => {
        dispatch(requests.thunks.getOldWeekRating());
      },
      getWinners: data => dispatch(requests.thunks.getWinners(data)),
      // quests
      getQuests: () => dispatch(requests.thunks.getQuests()),
      collectQuest: id => dispatch(requests.thunks.collectQuest(id)),
      completeQuest: data => dispatch(requests.thunks.completeQuest(data)),
      // user
      savePersonData: data => dispatch(requests.actions.savePersonData(data)),
      getAccessToken: data => {
        dispatch(requests.actions.savePhone(data));
        dispatch(requests.actions.savePersonData(data));
        dispatch(requests.thunks.getAccessToken(data?.phone));
      },
      setCompletedUserData: data => dispatch(user.actions.setCompletedUserData(data)),
      auth: () => dispatch(requests.thunks.auth()),
      generateName: () => dispatch(requests.thunks.generateName()),
      userUpdate: data => dispatch(requests.thunks.userUpdate(data)),
      userChange: data => dispatch(user.actions.change(data)),
      changeProfile: data => dispatch(user.actions.changeProfile(data)),
      setShareQuestId: id => dispatch(content.actions.setShareQuestId(id)),
      getModals: () => dispatch(requests.thunks.getModals()),
      clearDisposableModals: () => dispatch(content.actions.clearDisposableModals()),
      fromGachaToAttempts: num => dispatch(requests.thunks.fromGachaToAttempts(num)),
      getTexts: () => dispatch(requests.thunks.getTexts()),
      openCustomModal: id => dispatch(requests.thunks.openCustomModal(id)),
      // game
      gameStart: type => dispatch(requests.thunks.gameStart(type)),
      gameEnd: gameData => dispatch(requests.thunks.gameEnd(gameData)),
      gamePause: () => dispatch(requests.thunks.gamePause()),
      getGameSettings: () => dispatch(requests.thunks.getGameSettings()),
      returnAttempts: attempts => dispatch(requests.thunks.returnAttempts(attempts)),
      sendGameProgress: data => dispatch(requests.thunks.sendGameProgress(data)),
      setGameDataProgress: data => dispatch(content.actions.setGameDataProgress(data)),
      setActiveGameRatingName: type => dispatch(content.actions.setActiveGameRatingName(type)),
      setActiveGameSection: section => dispatch(content.actions.setActiveGameSection(section)),
      setActiveTasksSection: section => dispatch(content.actions.setActiveTasksSection(section)),
      // beauty
      beautyProcedure: id => dispatch(requests.thunks.beautyProcedure(id)),
      setIsBath: isBath => dispatch(content.actions.setIsBath(isBath)),
      getBeautyRoutine: () => dispatch(requests.thunks.getBeautyRoutine()),
      endBeautyRoutine: data => dispatch(requests.thunks.endBeautyRoutine(data)),
      // Elf and room callbacks
      setActiveRoom: activeRoom => dispatch(requests.thunks.setActiveRoom(activeRoom)),
      addAnimations: animations => dispatch(elf.actions.addAnimations(animations)),
      resetAnimation: animations => dispatch(elf.actions.resetAnimation(animations)),
      setIsDressed: isDressed => dispatch(elf.actions.setIsDressed(isDressed)),
      addOutsideAnimations: animations => dispatch(elf.actions.addOutsideAnimations(animations)),
      resetOutsideAnimations: animations => dispatch(elf.actions.resetOutsideAnimations(animations)),
      setIsVisibleRoom: isVisible => dispatch(elf.actions.setIsVisibleRoom(isVisible)),
      setIsVisible: isVisible => dispatch(elf.actions.setIsVisible(isVisible)),
      setIsAnimation: isAnimation => dispatch(elf.actions.setIsAnimation(isAnimation)),
      // others
      getIndex: () => dispatch(requests.thunks.getIndex()),
      getParams: () => dispatch(requests.thunks.getParams()),
      buyPrize: id => dispatch(requests.thunks.buyPrize(id)),
      setIsShowResourceModals: obj => dispatch(content.actions.setIsShowResourceModals(obj)),
      setShowLevelPrizes: data => dispatch(content.actions.setShowLevelPrizes(data)),
      // grades
      getGrades: () => dispatch(requests.thunks.getGrades()),
      // products
      getBuyProducts: () => dispatch(requests.thunks.getBuyProducts()),
      useBuyProduct: id => dispatch(requests.thunks.useBuyProduct(id)),
      getFavoritesProducts: () => dispatch(requests.thunks.getFavoritesProducts()),
      productToFavorites: sku => dispatch(requests.thunks.productToFavorites(sku)),
      // tg
      getTgBonuses: () => dispatch(requests.thunks.getTgBonuses()),
      getTgEnergy: () => dispatch(requests.thunks.getTgEnergy()),
      getTgMoney: () => dispatch(requests.thunks.getTgMoney()),
      getTgTickets: () => dispatch(requests.thunks.getTgTickets()),
      getTgGifts: () => dispatch(requests.thunks.getTgGifts()),
      //wish
      sendWish: wishData => dispatch(requests.thunks.sendWish(wishData)),
      getWishes: () => dispatch(requests.thunks.getWishes()),
      getWishUserItems: uid => dispatch(requests.thunks.getWishUserItems(uid)),
      buyWishGift: giftData => dispatch(requests.thunks.buyWishGift(giftData)),
      getWishUserData: uid => dispatch(requests.thunks.getWishUserData(uid)),
      // premium
      buyPremium: id => dispatch(requests.thunks.buyPremium(id)),
      setPremiumIcon: iconData => dispatch(requests.thunks.setPremiumIcon(iconData)),
    }),
    [],
  );
}
