let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector("#rest-btn");
let newGamebtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // plyerX palyerO
let count = 0;
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const restGame = () => {
  turnO = true;
  count = 0;
  enable();
  msgContainer.classList.add("hide");
}


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    //    console.log("box click");
    //    box.innerText = "abcd";
    if (turnO) {
      // playerO
      box.innerText = "O";
      turnO = false;
      // box.classList.add("O");
      box.style.color = "aqua";

    } else {
      // playerX
      box.innerText = "X";
      turnO = true;
      // box.classList.add("X");
      box.style.color = "red";

    }

    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameOver();
    }



    checkWinner();
  });
});

const gameOver = () => {
  msg.innerText = `Game is Over`;
  msgContainer.classList.remove("hide");
  disble();
};
//winner is comming then disbled btn
const disble = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enable = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const showWinner = (winner) => {

  msg.innerText = `Congratulations Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disble();
}





//checkwinner function to check who is win
const checkWinner = () => {
  for (let pattern of winPattern) {

    // console.log(box[pattern[0]].innerText,box[pattern[1]].innerText,box[pattern[2]].innerText);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;



    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val)
        showWinner(pos1Val);
      }
    }
  }
}


newGamebtn.addEventListener("click", restGame);
restbtn.addEventListener("click", restGame);