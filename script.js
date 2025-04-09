let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");
let start = document.querySelector(".Start");

let turnO = true;//playerX,playerY

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [2,5,8],
];

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        
        let check = checkdrawgame()
        if(check){
            msg.innerText = `game draw`;
            msgContainer.classList.remove("hide");
            container.classList.add("hide");
            resetBtn.classList.add("hide");
            disableBoxes();
        }
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};



const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    container.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
  

};

const checkWinner = () => {
    for(let pattern of winPatterns){
           let pos1val = boxes[pattern[0]].innerText;
           let pos2val = boxes[pattern[1]].innerText;
           let pos3val = boxes[pattern[2]].innerText;

           if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val) {
                console.log("winner" ,pos1val);
                showWinner(pos1val);
            }
           }
       }
};

const checkdrawgame = () => {
    let draw = true;
    for(box of boxes){
        if(box.innerText == ""){
         draw = false;
        } 
    }
    return draw
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
start.addEventListener("click", ()=>{
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    start.classList.add("hide");
})
