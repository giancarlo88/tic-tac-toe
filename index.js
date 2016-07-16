var playerColumns = [];
var playerRows = [];
var compColumns = [];
var compRows = [];
var board = [       [-1, -1, -1]
                ,   [-1, -1, -1]
                ,   [-1, -1, -1]]
var turns = 0



function coordinates (X , Y){
    this.X = X;
    this.Y = Y;
}


function placeOnBoard (X,Y,marker) {
            board[Y].splice(X, 1, marker)
            board.splice(Y, 1, board[Y])
            turns += 1
            console.log(turns)
            //checkForWin();
        }



function checkForWin() {
    
    function isWinningLine(coord1, coord2, coord3) { 
        
        if (board[coord1.X][coord1.Y] === board[coord2.X][coord2.Y] &&
            board[coord1.X][coord1.Y] === board[coord3.X][coord3.Y] &&
            board[coord1.X][coord1.Y] !== -1) {
            return true
        }
    }
    if (isWinningLine()){
        console.log("win")
    }
        
        var columns = []
            , rows = []
            , i
            //    for (i = 0; i < 3; i++){
            //        var j
            //         for (j = 0; j < 3; j++){
            //             
            //             var coords = "tr:eq("+i+") td:eq("+j+")";
            //             
            //             if ($(coords).html() == "X")
            //             { columns.push(i);
            //                rows.push(j);
            //                 alert("X at"+i+", "+j )
            //             }
            //         }
            //            }
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
    console.log(board)        
    return;
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
            console.log(coords)
            placeOnBoard(coords.X, coords.Y, "X")
            setTimeout(computerTurn, 200);
        }
    })
    /*$(document).ready(function(){
      $('tr:eq(2) td:eq(0)').html("X")
      
    })*/