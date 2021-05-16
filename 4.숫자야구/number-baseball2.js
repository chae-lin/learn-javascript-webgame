// 초기화 버튼 추가하기
// input 숫자만 4자리 수 까지 입력되게 하기

var body = document.body;
var numberCandidate;
var numberArray;

function numberFun() {
  numberCandidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numberArray = [];

  for (var i = 0; i < 4; i++) {
    var choice = numberCandidate.splice(
      Math.floor(Math.random() * (9 - i)),
      1
    )[0];
    numberArray.push(choice);
  }
}
numberFun();

var result = document.createElement("h1");
var form = document.createElement("form");
var input = document.createElement("input");
input.type = "number";
var button = document.createElement("button");
button.textContent = "입력";
var wrongNumberText = document.createElement("div");
var resetButton = document.createElement("button");
resetButton.textContent = "다시 시작";

body.append(result, form, wrongNumberText, resetButton);
form.append(input, button);

// input 숫자로 4자리 수 까지
input.addEventListener("input", (object) => {
  if (object.target.value.length > 4) {
    object.target.value = object.target.value.slice(0, 4);
  }
});

var wrongNumber = 0;

form.addEventListener("submit", function callBackFn(e) {
  e.preventDefault();
  var value = input.value;

  if (numberArray.join("") === value) {
    result.textContent = "홈런";
    numberFun();
    wrongNumber = 0;
  } else {
    var valueArray = value.split("");
    var strike = 0;
    var ball = 0;

    wrongNumber++;
    if (wrongNumber > 10) {
      result.textContent =
        "10번 초과하여 실패! 정답은" + numberArray.join(",") + "였습니다.";
      wrongNumber = 0;
      numberFun();
    } else {
      for (var i = 0; i <= 3; i++) {
        if (Number(valueArray[i]) === numberArray[i]) {
          strike++;
        } else if (numberArray.indexOf(Number(valueArray[i])) > -1) {
          ball++;
        }
      }
      result.textContent = strike + "스트라이크" + ball + "볼 입니다.";
      wrongNumberText.textContent = `현재까지 틀린 횟수: ${wrongNumber}, 남은 도전 가능 횟수: ${
        10 - wrongNumber
      }`;
    }
  }
  input.value = "";
  input.focus();
});

// 초기화 버튼
resetButton.addEventListener("click", () => {
  result.textContent = "";
  wrongNumberText.textContent = "";
  input.value = "";
  input.focus();
  numberFun();
});
