import { FONTS } from "../constants/defaults";

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  headerMode: "full",
  interactionIdx: 0,
  currentViewFont: null,
  currentDescFont: null, 
  currentCategory: "고딕체",
  newsFeeds: [],
  background: "#000",
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
    default:
      return state;
  }
};

export default reducer;