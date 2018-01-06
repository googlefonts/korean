export const windowResize = (width, height) => {
  return {
    type: 'WINDOW_RESIZE',
    payload: {
      screenWidth: width,
      screenHeight: height  
    }
  }
};

export const changeBackgroundMode = (mode) => {
  return {
    type: 'CHANGE_BACKGROUND_MODE',
    payload: {
      backgroundMode: mode
    }
  }
};
