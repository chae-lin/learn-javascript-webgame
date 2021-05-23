var imgCoordinate = 0;
var RSP = {
  // 1:1로 매칭되는 사전식을 표현할 때 객체를 사용가능.
  rock: "0",
  scissor: "-142px",
  paper: "-284px",
};

function computerChoice(imgCoordinate) {
  // object.entries(객체)로 객체를 배열로 바꿀 수 있다.
  // 배열.find는 반복문이지만 원하는 것을 찾으면 return이 멈춘다.
  // 1차원 배열: indexOf, 2차원배열: find, findIndex

  return Object.entries(RSP).find(function (v) {
    return v[1] === imgCoordinate;
  })[0];
}

var interval;
function intervalMaker() {
  // setInterval: setTimeOut과 달리 아래숫자를 기준으로 계속해서 실행됨
  interval = setInterval(function () {
    if (imgCoordinate === RSP.rock) {
      imgCoordinate = RSP.scissor;
    } else if (imgCoordinate === RSP.scissor) {
      imgCoordinate = RSP.paper;
    } else {
      imgCoordinate = RSP.rock;
    }
    document.querySelector("#computer").style.background =
      "url(https://en.pimg.jp/023/182/267/1/23182267.jpg)" +
      imgCoordinate +
      " 0";
  }, 100);
}
intervalMaker();

var score = {
  // 여러개의 딕셔너리 자료 구조가 비슷하면 하나로 합쳐주는 것이 좋다.
  rock: 1,
  scissor: 0,
  paper: -1,
};

document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    // querySelector는 처음에 발견되는 하나만을 선택한다.
    // 때문에 querySelectorAll을 사용하여 전부 선택.
    // querySelectorAll을 사용시 addEventListener를 바로 사용할 수 없고 forEach을 사용해 addEventListener를 연결해줘야한다.

    // 객체안에 접근하거나 함수를 호출하는 결과들은 변수안에 저장해두는 것이 좋다.
    // getAttribute 값을 얻어오다.
    var myChoice = this.getAttribute("id");
    var myScore = score[myChoice];
    var computerScore = score[computerChoice(imgCoordinate)];
    var ScoreDifference = myScore - computerScore;

    // clearInterval 로 setInterval을 멈춘다.
    clearInterval(interval);
    setTimeout(function () {
      intervalMaker();
    }, 1000);

    if (ScoreDifference === 0) {
      console.log("비겼습니다.");
    } else if ([-1, 2].includes(ScoreDifference)) {
      // 배열.includes로 || 관계를 줄일 수 있다.
      console.log("졌습니다.");
    } else {
      console.log("이겼습니다.");
    }
  });
});
