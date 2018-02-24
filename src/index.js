module.exports = function solveSudoku(matrix) {
  // check is board has empty cells
  function isFull(board){
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++)
            if(board[i][j] == 0) return false;
    }
    return true;
  }

  // find possible moves for particular cell
  function possibleValues(board, i, j){
    var possibilityArray = {};

    for(var x = 1; x < 10; x++){
        possibilityArray[x] = 0;
    }

    for(var y = 0; y < 9; y++){
        if(!(board[i][y] == 0))
            possibilityArray[board[i][y]] = 1;
    }

    for(var x = 0; x < 9; x++){
        if(!(board[x][j] == 0))
            possibilityArray[board[x][j]] = 1;
    }

    var k = Math.floor(i / 3) * 3;
    var l = Math.floor(j / 3) * 3;

    for(var x = k; x < k + 3; x++){
        for(var y = l; y < l + 3; y++)
            if(!(board[x][y] == 0))
                possibilityArray[board[x][y]] = 1;
    }

    for(var x = 1; x < 10; x++){
        if(possibilityArray[x] == 0)
            possibilityArray[x] = x;
        else
            possibilityArray[x] = 0;
    }

    return possibilityArray;

  }

  // main solving function
  function sudokuSolver(board){
    var i = 0;
    var j = 0;

    var possibilities = {};

    if(isFull(board)){
        // basic case
        return board;
    } else {
        // searching for first empty spot
        for(var x = 8; x >= 0; --x)
            for(var y = 8; y >= 0; --y)
                if(board[x][y] == 0){
                    i = x;
                    j = y;
                }
        // getting possible values for this spot
        possibilities = possibleValues(board, i, j);
        for(var x = 1; x < 10; x++){
            if(!(possibilities[x] == 0)){
                board[i][j] = possibilities[x];
                // recurcive call of main solver function
                sudokuSolver(board);
                if(isFull(board))
                    return board;
            }
        }

        //backtraking if none of possible values are correct
        board[i][j] = 0;
    }
  }

  return sudokuSolver(matrix);
}
