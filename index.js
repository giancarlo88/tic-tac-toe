var board = [       [-1, -1, -1]
                ,   [-1, -1, -1]
                ,   [-1, -1, -1]
            ]
var turns = 0
var endOfGame


function coordinates (X , Y){
    this.X = X;
    this.Y = Y;
}

function diagonalLineCheck(token){        
    if (board[0][0] === token && 
            board[1][1] === token &&
            board[2][2] === token) {
        return gameOver(token, "diagR", 0)
        
        } else if (board[0][2] === token &&
                    board[1][1] === token &&
                    board[2][0] === token) {
                return gameOver(token, "diagL", 0)
            }
    }

function horizontalLineCheck(token){
    for (var i = 0; i < board.length; i++) {
        var indices = [];
        for (var j = 0; j < board[i].length; j++) {
            if (board[i].indexOf(token, j) === j) {
                indices.push(j)
            }
            if (indices.length === 3) { 
                return gameOver(token, "hline", i);
            } 
            }
        }
}

function verticalLineCheck(token){    
    for (var k = 0; k < 3; k ++){
        if (board[0][k] === token &&
            board[1][k] === token &&
            board[2][k] === token) {
            return gameOver(token, "vline", k);
        }
    }
}

function gameOver(player, lineType, position){
    endOfGame = true;
    switch (lineType){
        case "hline":
            $("tr:eq("+position+")").css("color", "red")
            break;
        case "vline":
            $("tbody td:nth-child("+(position+1)+")").css("color", "red")
            break; 
        case "diagL":
            $("tr:eq(0) td:eq(2)").css("color", "red");
            $("tr:eq(1) td:eq(1)").css("color", "red");
            $("tr:eq(2) td:eq(0)").css("color", "red");
            break;
        case "diagR":
            $("tr:eq(0) td:eq(0)").css("color", "red");
            $("tr:eq(1) td:eq(1)").css("color", "red");
            $("tr:eq(2) td:eq(2)").css("color", "red");
            break;
    }
    setTimeout(function(){
            alert("Game Over! " + player + " wins!")}, 300);
}

function placeOnBoard (X,Y,marker) {
            board[Y].splice(X, 1, marker)
            board.splice(Y, 1, board[Y])
            turns += 1
            //checkForWin();
        }



//function checkForWin() {
//    
//    function isWinningLine(coord1, coord2, coord3) { 
//        
//        if (board[coord1.X][coord1.Y] === board[coord2.X][coord2.Y] &&
//            board[coord1.X][coord1.Y] === board[coord3.X][coord3.Y] &&
//            board[coord1.X][coord1.Y] !== -1) {
//            return true
//        }
//    }
//    if (isWinningLine()){
//        console.log("win")
//    }
//        
//        var columns = []
//            , rows = []
//            , i
//            //    for (i = 0; i < 3; i++){
//            //        var j
//            //         for (j = 0; j < 3; j++){
//            //             
//            //             var coords = "tr:eq("+i+") td:eq("+j+")";
//            //             
//            //             if ($(coords).html() == "X")
//            //             { columns.push(i);
//            //                rows.push(j);
//            //                 alert("X at"+i+", "+j )
//            //             }
//            //         }
//            //            }
//    }

function checkForWin(token) {

verticalLineCheck(token);
horizontalLineCheck(token);
diagonalLineCheck(token);



}
    



/*var checkForWin = function(column, row){
        if (column.length > 2 || row.length > 2){
            if (column[0] === column[1] && column[1] === column[2]){
                alert("win!")
            } else if (row[0] === row[1] && row[1] === row[2]){
                alert("win!")
            } else if (column[0] + column[1] + column[2] === 3 && row[0] + row[1] + row[2] === 3)
                alert("win!")
    }
    }*/
function computerTurn(){
    if (!endOfGame){
    //Choose a row and column.
    var chosenColumn = Math.floor((Math.random() * 3));
    var chosenRow = Math.floor((Math.random() * 3))
    var compCoords = new coordinates(chosenColumn, chosenRow);
    console.log(compCoords)

    //Check if the row and column have been used already
    if (board[compCoords.Y][compCoords.X] !== -1){
        if (turns < 9){
        return computerTurn();
        } else { 
            console.log("game over")
            return "game over"}
    } else {
        
    var chosenSpot = "tr:eq(" + chosenRow + ") " + "td:eq(" + chosenColumn + ")";
   // setTimeout(function () {
            placeOnBoard(compCoords.X, compCoords.Y, "O");
            $(chosenSpot).html("O").attr("class", "played-spot");
     setTimeout(checkForWin("O"), 0);       
    return;
        }
}
}            
//checkForWin(compColumns, compRows)
//        else {
//           computerTurn();
//        }
    //}, 0)

$("td").on("click", function () {
        if ($(this).attr("class") !== "played-spot") {
            $(this).html("X").attr("class", "played-spot");
            var coords = new coordinates($(this).index(), $(this).closest("tr").index())
            placeOnBoard(coords.X, coords.Y, "X")
            setTimeout(checkForWin("X"), 0);
            setTimeout(computerTurn, 200);
            
        }
    })
    /*$(document).ready(function(){
      $('tr:eq(2) td:eq(0)').html("X")
      
    })*/