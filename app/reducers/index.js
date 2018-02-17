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
  currentViewFont: {
    id: 1,
    nameKo: "노토 산스 KR",
    nameEn: "Noto Sans KR",
    fontName: "Noto Sans KR",
    fontUrl : "./public/fonts/NotoSansCJKkr-Regular-2350.woff",
    cssUrl : "./public/fonts/notosans.css",
    weights: [
      {
        fontWeight: 400,
        weightName: "Regular"
      },
      {
        fontWeight: 600,
        weightName: "Medium"
      }
    ],
    foundryKo: "산돌커뮤니케이션",
    foundryEn: "Sandoll Communication",
    descriptionKo: "네이버는 2008년부터 매년 새로운 글꼴을 만들어 무료로 배포하고 있습니다. 나눔고딕은 문서의 본문에도 잘 쓸 수 있는 고딕 글꼴입니다. 글자 끝의 날카로운 부분을 둥글게 처리해 친근하고 부드러운 느낌입니다.",
    descriptionEn: "Since 2008, Naver has created new fonts for free every year. Sharing Gothic is a Gothic font that can be used well in the body of a document. It is a friendly and soft feeling by rounding the sharp part of the end of the letter.",
    category: 1
  },
  currentScriptViewFont: null,
  currentDescFontSelected: "all", // all, title, paragraph
  currentDescFont: {
    title: 1,
    paragraph: 1
  }, 
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