
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

// Функция проверяет, укладывается ли встреча в рамки рабочего дня
function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, meetingDuration) {
  // Вспомогательная функция: преобразует строку времени в количество минут с начала суток
  function parseTime(timeStr) {
    // Разделяет строку времени на часы и минуты и преобразует их в числовые значения
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMinutes = parseTime(workStart); // Начало рабочего дня в минутах
  const workEndMinutes = parseTime(workEnd); // Конец рабочего дня в минутах
  const meetingStartMinutes = parseTime(meetingStart); // Начало встречи в минутах
  const meetingEndMinutes = meetingStartMinutes + meetingDuration; // Конец встречи в минутах

  // Проверяет, начинается ли встреча после начала рабочего дня и заканчивается ли до его завершения
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

// Примеры использования
isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900);

