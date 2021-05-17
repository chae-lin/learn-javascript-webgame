// 배열이나 객체는 데이터를 표현할 때 주로 사용.
var body = document.body;
var table = document.createElement("table");
var tableRowWrap = [];
var tableCellWrap = [];
var turn = "X";
var result = document.createElement("div");

var 비동기콜백 = function (e) {
  // e.target === 클릭된 애
  // e.target.parentNode === 부모 태그
  // e.target.parentNode.parentNode === 부모의 부모 태그
  // e.target.children === 자식 태그

  var rowNumber = tableRowWrap.indexOf(e.target.parentNode); //몇번째 줄인지
  var cellNumber = tableCellWrap[rowNumber].indexOf(e.target); //몇번째 칸인지
  console.log("몇줄", rowNumber, "몇칸", cellNumber);

  if (tableCellWrap[rowNumber][cellNumber].textContent !== "") {
    //칸이 이미 채워져 있는가?
    console.log("빈칸아닙니다.");
  } else {
    // tableCellWrap[rowNumber][cellNumber].textContent = turn;
    e.target.textContent = turn;

    //세칸이 다 채워졌나?
    var allTrue = false;
    //가로줄 검사
    if (
      tableCellWrap[rowNumber][0].textContent === turn &&
      tableCellWrap[rowNumber][1].textContent === turn &&
      tableCellWrap[rowNumber][2].textContent === turn
    ) {
      allTrue = true;
    }
    //세로줄 검사
    if (
      tableCellWrap[0][cellNumber].textContent === turn &&
      tableCellWrap[1][cellNumber].textContent === turn &&
      tableCellWrap[2][cellNumber].textContent === turn
    ) {
      allTrue = true;
    }
    //대각선 검사
    if (rowNumber - cellNumber === 0) {
      if (
        tableCellWrap[0][0].textContent === turn &&
        tableCellWrap[1][1].textContent === turn &&
        tableCellWrap[2][2].textContent === turn
      ) {
        allTrue = true;
      }
    }
    if (Math.abs(rowNumber - cellNumber) === 2) {
      if (
        tableCellWrap[0][2].textContent === turn &&
        tableCellWrap[1][1].textContent === turn &&
        tableCellWrap[2][0].textContent === turn
      ) {
        allTrue = true;
      }
    }

    //다 찼으면
    if (allTrue) {
      result.textContent = turn + "님이 승리";
      //초기화
      turn = "X";
      tableCellWrap.forEach(function (tableRow) {
        tableRow.forEach(function (tableCell) {
          tableCell.textContent = "";
        });
      });
    } else {
      // 다 안찼으면
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  }
};

body.append(table, result);

for (var i = 0; i < 3; i++) {
  var tableRow = document.createElement("tr");
  tableRowWrap.push(tableRow);
  tableCellWrap.push([]);
  for (var j = 0; j < 3; j++) {
    var tableCell = document.createElement("td");
    tableCell.addEventListener("click", 비동기콜백);
    tableCellWrap[i].push(tableCell);
    tableRow.appendChild(tableCell);
  }
  table.appendChild(tableRow);
}

console.log("줄들", tableRowWrap, "칸들", tableCellWrap);
//배열안에 배열이 들어 있는 것을 이차원 배열이라고 한다.
