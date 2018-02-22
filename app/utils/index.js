import { FONTS } from '../constants/defaults';

export const numberWithDelimiter = (number, delimiter, separator) => {
  try {
    var delimiter = delimiter || ",";
    var separator = separator || ".";
    
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter);
    return parts.join(separator);
  } catch(e) {
    return number
  }
};

export const convertBgMode = (bgMode, fgOrBg) => {
  if (bgMode == "black"){
    return fgOrBg == "f" ? "white" : "black";
  } else {
    return fgOrBg == "f" ? "black" : "white";  
  }
}

export const getCurrentDescFont = (currentDescFont, mode) => {
    
  if (mode === "all") {
    if (currentDescFont["title"] == currentDescFont["paragraph"]) {
      return _.find(FONTS, fontData => { return currentDescFont["title"] == fontData.id });
    } else {
      return {
        id: -1,
        nameKo: "-",
        nameEn: "-"
      };
    }
    
  } else {
    return _.find(FONTS, fontData => { return currentDescFont[mode] == fontData.id });
  }
}

export const isTouchDevice = () => {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};