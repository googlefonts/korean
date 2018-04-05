import { FONTS, BODY_480 } from '../constants/defaults';
import { scaleLinear } from 'd3';
import _ from 'lodash';
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
  // debugger;
  if (mode === "all") {
    if (currentDescFont["title"] == currentDescFont["paragraph"]) {
      var resultFont = _.find(FONTS, fontData => { return currentDescFont["title"] == fontData.id });
      return _.isUndefined(resultFont) ? {
        id: -1,
        nameKo: "폰트 선택",
        nameEn: "Select Font"
      } : resultFont;
    } else {
      return {
        id: -1,
        nameKo: "폰트 선택",
        nameEn: "Select Font"
      };
    }
    
  } else {

    var resultFont = _.find(FONTS, fontData => { return currentDescFont[mode] == fontData.id });
    return _.isUndefined(resultFont) ? {
        id: -1,
        nameKo: "폰트 선택",
        nameEn: "Select Font"
      } : resultFont;

  }
}

export const isTouchDevice = () => {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

export const cutString = (screenWidth) => {
  // var scale = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 4.9]);
  if (screenWidth < 768) {
    return 1;
  } else if (screenWidth >= 768 && screenWidth < 1200) {
    return 2;
  } else if (screenWidth >= 1200 && screenWidth < 1800) {
    return 3;
  } else {
    return 4;
  } 
}


export const cutStringScript = (screenWidth) => {
  // var scale = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 4.9]);
  if (screenWidth < 768) {
    return 1;
  } else if (screenWidth >= 768 && screenWidth < 1200) {
    return 2;
  } else if (screenWidth >= 1200 && screenWidth < 1800) {
    return 3;
  } else {
    return 4;
  } 
}