import { FONTS } from "../constants/defaults";

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  headerMode: "full",
  interactionIdx: 0,
  currentViewFont: null,
  currentDescFont: "Noto Sans KR", 
  currentCategory: null,
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
    case 'CHANGE_LOCALE':
      return {
        ...state,
        locale: action.payload.locale
      }
    case 'CHANGE_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: action.payload.currentCategory
      }
    case 'CHANGE_CURRENT_DESC_FONT': 
      return {
        ...state,
        currentDescFont: action.payload.currentDescFont
      }
    default:
      return state;
  }
};

export default reducer;