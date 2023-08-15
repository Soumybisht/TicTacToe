let turn = "X";
let clap= new Audio("clap.mp3");
let tick= new Audio("tick.mp3");
let aww= new Audio("aww.mp3");
let changeTurn=()=>{
    return turn==="X"?"O":"X";
}
let gameover=false;
let end=false;
// Win conditon
let winCondition=()=>{
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [2,5,8],
        [1,4,7],
    ];
    wins.forEach((e)=>{
        if((boxes[e[0]].textContent===boxes[e[1]].textContent)&&(boxes[e[2]].textContent===boxes[e[0]].textContent)&& (boxes[e[0]].textContent!="")){
                document.getElementById("whoseTurn").textContent = boxes[e[0]].textContent+" Wins";
                clap.play();
                gameover=true;
                end=true;
                boxes.forEach(x=>{
                    x.removeEventListener("click",boxes);
                })
        }
        
    }
    )
    
}
const checkDrawCondition = (boxes) => {
    for (const box of boxes) {
        if (box.textContent === "") {
            return false; // There is an empty box, game is not a draw
        }
    }
    return true; // All boxes are filled, game is a draw
};

//game logic

let boxes=document.querySelectorAll(".box");
Array.from(boxes).forEach((element)=>{
    element.addEventListener("click",()=>{
      if(element.textContent===""&& !gameover){
        element.textContent=turn;
        tick.play();
       turn=changeTurn();
       if(!end) winCondition();
       if(!end){
        if (checkDrawCondition(boxes)) {
            document.getElementById("whoseTurn").textContent = "It's a Draw!";
            aww.play();
            gameover = true;
            end = true;
        }
       }
       if(!gameover)
       document.getElementById("whoseTurn").textContent=turn+"'s Turn";
      } 

    })
})

//restart
document.getElementById("reset").addEventListener("click",()=>{
    boxes.forEach(x=>{
        x.textContent="";
    })
document.getElementById("whoseTurn").textContent = turn+"'s "+"Turn";
gameover=false;
end=false;   
})