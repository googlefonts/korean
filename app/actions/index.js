export const windowResize = (width, height) => {
  return {
    type: 'WINDOW_RESIZE',
    payload: {
      screenWidth: width,
      screenHeight: height  
    }
  }
};

export const changeHeaderHeight = (headerHeight) => {
  return {
    type: 'CHANGE_HEADER_HEIGHT',
    payload: {
      headerHeight: headerHeight
    }
  }
}

export const changeBackgroundMode = (mode) => {
  return {
    type: 'CHANGE_BACKGROUND_MODE',
    payload: {
      backgroundMode: mode
    }
  }
};

export const changeLocale = (locale) => {
  return {
    type: 'CHANGE_LOCALE',
    payload: {
      locale: locale
    }
  }
};

export const changeCurrentCategory = (currentCategory) => {
  return {
    type: 'CHANGE_CURRENT_CATEGORY',
    payload: {
      currentCategory: currentCategory
    }
  }
}

export const changeCurrentDescFont = (currentDescFont) => {
  return {
    type: 'CHANGE_CURRENT_DESC_FONT',
    payload: {
      currentDescFont: currentDescFont
    }
  }
}

export const changeCurrentViewFont = (currentViewFont) => {
  return {
    type: 'CHANGE_CURRENT_VIEW_FONT',
    payload: {
      currentViewFont: currentViewFont
    }
  }
}