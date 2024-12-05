
const checkingStringLength = (string, stringLength) => string.length <= stringLength;
checkingStringLength('Мама мыла милу', 10);

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
polydromeCheck('ДовО д');

function extractNumbers (text) {
  let allNumbers = '';
  toString(text);
  text = text.replaceAll(' ', '');
  for (let i = 0; i < text.length; i++) {
    if (!isNaN(Number(text[i]))) {
      allNumbers += text[i];
    }
  }
  return allNumbers;
}
extractNumbers('gssee45 2983f2');
