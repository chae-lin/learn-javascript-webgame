// 위에서부터 차례대로 실행되는 것을 동기라고 함.
// form.addEventListener는 비동기 함수 (언제 실행될지 모름)
var body = document.body;

//1.숫자를 뽑음
var numberCandidate;
var numberArray;

function numberFun() {
  numberCandidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numberArray = [];

  for (var i = 0; i < 4; i++) {
    // 배열.pop : 마지막 것 추출
    //     .push : 마지막 것 추가
    //     .shift : 처음 것 추출
    //      .unshift : 처음 것 추가
    var choice = numberCandidate.splice(
      Math.floor(Math.random() * (9 - i)),
      1
    )[0]; // splice는 특성상 배열을 반환하기 때문에 [0] 첫번째 숫자를 추출하는 식으로 표현
    // 추출된 숫자는 numberCandidate에서 삭제 됨.
    numberArray.push(choice);
  }
}
numberFun();

//2.화면을 그림
var result = document.createElement("h1");
var form = document.createElement("form");
var input = document.createElement("input");
input.type = "text";
input.maxLength = 4; // 4자리 이상 입력할 수 없도록 (number type에서는 사용 불가)
var button = document.createElement("button");
button.textContent = "입력";
var wrongNumberText = document.createElement("div");

body.append(result, form, wrongNumberText, resetButton);
form.append(input, button);

//3.틀린 횟수
var wrongNumber = 0;

//4.버튼 클릭 시 동작
form.addEventListener("submit", function callBackFn(e) {
  // 엔터 쳤을 때 실행
  // form에서 엔터를 칠 경우 새로고침 되는 것은 submit의 기본동작이기 때문에 해당 부분을 제거하기 위해 아래 코드 사용
  e.preventDefault();
  var value = input.value;

  if (numberArray.join("") === value) {
    // 배열.join : 배열을 문자로 변환
    result.textContent = "홈런";

    numberFun();

    wrongNumber = 0;
  } else {
    // 배열.split : 문자를 배열로 변환
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
          // 배열.indexOf(값) : 값의 위치를 알 수 있다. 없으면 -1
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

  console.log(numberArray);
});
