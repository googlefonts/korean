import { FONTS } from "../constants/defaults";

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  headerMode: "full",
  interactionIdx: 0,
  currentViewFont: null,
  currentDescFont: "Noto Sans CJK KR", 
  currentCategory: "고딕체",
  newsFeeds: [],
  backgroundMode: "black",
  locale: "ko"
};

var reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'WINDOW_RESIZE':
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
        screenHeight: action.payload.screenHeight
      };
    case 'CHANGE_BACKGROUND_MODE':
      return {
        ...state,
        backgroundMode: action.payload.backgroundMode
      }
    default:
      return state;
  }
};

export default reducer;