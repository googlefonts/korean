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