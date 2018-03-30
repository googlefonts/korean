import { FONTS } from "../constants/defaults";

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  headerCollapsedTop: 0,
  headerMode: "expanded", // expanded, collapsed, black
  animationIdx: 0,
  animationScriptIdx: 0,
  categoryDropdownOpened: false,
  descFontDropdownOpened: false,
  currentViewFont: null,
  currentScriptViewFont: null,
  currentDetailSelected: null,
  currentDescFontSelected: "all", // all, title, paragraph
  currentDescFont: {
    title: null,
    paragraph: null
  }, 
  isOnScript: false,
  currentCategory: {
    id: 1,
    type: 'scroll' // click, scroll
  }, 
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
    case 'CHANGE_CURRENT_DETAIL_SELECTED':
      return {
        ...state,
        currentDetailSelected: action.payload.currentDetailSelected
      }
    case 'CHANGE_IS_ON_SCRIPT': 
      return {
        ...state,
        isOnScript: action.payload.isOnScript
      };
    case 'CHANGE_CURRENT_SCRIPT_VIEW_FONT':
      return {
        ...state,
        currentScriptViewFont: action.payload.currentScriptViewFont
      }
    case 'CHANGE_ANIMATION_SCRIPT_IDX':
      return {
        ...state,
        animationScriptIdx: action.payload.animationScriptIdx
      };
    case 'CHANGE_ANIMATION_IDX': 
      return {
        ...state,
        animationIdx: action.payload.animationIdx
      };
    case 'CHANGE_CURRENT_DESC_FONT_SELECTED':
      return {
        ...state,
        currentDescFontSelected: action.payload.currentDescFontSelected
      };
    case 'CHANGE_HEADER_COLLAPSED_TOP':
      return {
        ...state,
        headerCollapsedTop: action.payload.headerCollapsedTop
      };
    case 'CHANGE_DESC_FONT_DROPDOWN_OPENED':
      return {
        ...state,
        descFontDropdownOpened: action.payload.descFontDropdownOpened
      };
    case 'CHANGE_CATEGORY_DROPDOWN_OPENED':
      return {
        ...state,
        categoryDropdownOpened: action.payload.categoryDropdownOpened
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