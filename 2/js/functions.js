
const checkingStringLength = (string, stringLength) => string.length <= stringLength;
checkingStringLength();

function polydromeCheck(text) {

  let testString = '';
  text = text.replaceAll(' ','');
  text = text.toLowerCase();
  for (let i = text.length - 1; i >= 0; i--) {
    testString += text[i];
  }
  if (testString === text) {
    return true;
  }
  return false;
}
polydromeCheck();

function extractNumbers (text) {
  let allNumbers = '';
  toString(text);
  for (let i = 0; i < text.length; i++) {
    if (!isNaN(Number(text[i]))) {
      allNumbers += text[i];
    }
  }
  return allNumbers;
}
extractNumbers();
