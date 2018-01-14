import { FONTS } from "../constants/defaults";

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  headerMode: "expanded",
  interactionIdx: 0,
  currentViewFont: null,
  currentDescFont: 1, 
  currentCategory: 1,
  newsFeeds: [],
  backgroundMode: "black",
  locale: "ko",
  headerHeight: 140
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
    case 'CHANGE_CURRENT_VIEW_FONT':
      return {
        ...state, 
        currentViewFont: action.payload.currentViewFont
      }
    case 'CHANGE_HEADER_HEIGHT':
      return {
        ...state,
        headerHeight: action.payload.headerHeight
      }
    case 'CHANGE_HEADER_MODE': 
      return {
        ...state,
        headerMode: action.payload.headerMode
      }
    default:
      return state;
  }
};

export default reducer;