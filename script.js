const boardSize = 8;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

function solveNQueens() {                                                                                                                                                                                                               
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));                                                                                                                                                 
    const queens = [];                                                                                                                                                                                                                  
                                                                                                                                                                                                                                        
    function isSafe(row, col) {                                                                                                                                                                                                         
        for (let i = 0; i < row; i++) {                                                                                                                                                                                                 
            if (board[i][col] === 'Q') return false;                                                                                                                                                                                    
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;                                                                                                                                                
            if (col + (row - i) < boardSize && board[i][col + (row - i)] === 'Q') return false;                                                                                                                                         
        }                                                                                                                                                                                                                               
        return true;                                                                                                                                                                                                                    
    }                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                        
    function placeQueens(row) {                                                                                                                                                                                                         
        if (row === boardSize) return true;                                                                                                                                                                                             
                                                                                                                                                                                                                                        
        // Create a shuffled array of column indices                                                                                                                                                                                    
        const columns = Array.from({ length: boardSize }, (_, i) => i);                                                                                                                                                                 
        for (let i = columns.length - 1; i > 0; i--) {                                                                                                                                                                                  
            const j = Math.floor(Math.random() * (i + 1));                                                                                                                                                                              
            [columns[i], columns[j]] = [columns[j], columns[i]];                                                                                                                                                                        
        }                                                                                                                                                                                                                               
                                                                                                                                                                                                                                        
        for (const col of columns) {                                                                                                                                                                                                    
            if (isSafe(row, col)) {                                                                                                                                                                                                     
                board[row][col] = 'Q';                                                                                                                                                                                                  
                queens.push([row, col]);                                                                                                                                                                                                
                if (placeQueens(row + 1)) return true;                                                                                                                                                                                  
                board[row][col] = null;                                                                                                                                                                                                 
                queens.pop();                                                                                                                                                                                                           
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
        return false;                                                                                                                                                                                                                   
    }                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                        
    placeQueens(0);                                                                                                                                                                                                                     
    return queens;                                                                                                                                                                                                                      
}                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                        
function createRandomSegments(queens) {                                                                                                                                                                                                       
    const segments = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));                                                                                                                                              
    const segmentColors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0', '#FF9CEE', '#FFCCF9'];                                                                                                                     
                                                                                                                                                                                                                                        
    // Use queen positions as starting points                                                                                                                                                                                           
    queens.forEach(([row, col], index) => {                                                                                                                                                                                             
        segments[row][col] = segmentColors[index % segmentColors.length];                                                                                                                                                               
    });                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                        
    // Expand from each queen's position                                                                                                                                                                                                
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];                                                                                                                                                                              
    while (segments.flat().includes(null)) {                                                                                                                                                                                            
        const [row, col] = queens[Math.floor(Math.random() * queens.length)];                                                                                                                                                           
        const color = segments[row][col];                                                                                                                                                                                               
        const shuffledDirections = directions.sort(() => Math.random() - 0.5);                                                                                                                                                          
                                                                                                                                                                                                                                        
        for (const [dr, dc] of shuffledDirections) {                                                                                                                                                                                    
            const newRow = row + dr;                                                                                                                                                                                                    
            const newCol = col + dc;                                                                                                                                                                                                    
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && !segments[newRow][newCol]) {                                                                                                                  
                segments[newRow][newCol] = color;                                                                                                                                                                                       
                queens.push([newRow, newCol]);                                                                                                                                                                                          
                break;                                                                                                                                                                                                                  
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
    }                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                        
    return segments;                                                                                                                                                                                                                    
}                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        
function renderBoardWithSegments(segments) {                                                                                                                                                                                            
    const cells = document.querySelectorAll('.cell');                                                                                                                                                                                   
    cells.forEach((cell, index) => {                                                                                                                                                                                                    
        const row = Math.floor(index / boardSize);                                                                                                                                                                                      
        const col = index % boardSize;                                                                                                                                                                                                  
        cell.style.backgroundColor = segments[row][col];                                                                                                                                                                                
        if (board[row][col] === 'Q') {                                                                                                                                                                                                  
            cell.textContent = '♛'; // Display a queen                                                                                                                                                                                  
        } else {                                                                                                                                                                                                                        
            cell.textContent = '';                                                                                                                                                                                                      
        }                                                                                                                                                                                                                               
    });                                                                                                                                                                                                                                 
}                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        
function createBoard(segments) {                                                                                                                                                                                                                
    const chessboard = document.getElementById('chessboard');                                                                                                                                                                           
    chessboard.innerHTML = '';                                                                                                                                                                                                          
    for (let row = 0; row < boardSize; row++) {                                                                                                                                                                                         
        for (let col = 0; col < boardSize; col++) {                                                                                                                                                                                     
            const cell = document.createElement('div');                                                                                                                                                                                 
            cell.classList.add('cell');                                                                                                                                                                                                 
            cell.addEventListener('click', () => placeQueen(row, col, segments));                                                                                                                                                                 
            chessboard.appendChild(cell);                                                                                                                                                                                               
        }                                                                                                                                                                                                                               
    }                                                                                                                                                                                                                                   
}  
function placeQueen(row, col, segments) {                                                                                                                                                                                                         
    if (board[row][col] === 'Q') {                                                                                                                                                                                                      
        // Remove the queen if it's already there                                                                                                                                                                                       
        board[row][col] = null;                                                                                                                                                                                                         
    } else {                                                                                                                                                                                                                            
        // Place the queen regardless of validity                                                                                                                                                                                       
        board[row][col] = 'Q';                                                                                                                                                                                                          
    }                                                                                                                                                                                                                                   
    markInvalidMove(segments); // Highlight invalid placements                                                                                                                                                                                  
    renderBoard();                                                                                                                                                                                                                      
}                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                        
function markInvalidMove(segments) {                                                                                                                                                                                                    
    unmarkInvalidMove(); // Clear previous invalid markings                                                                                                                                                                             
                                                                                                                                                                                                                                        
    const cells = document.querySelectorAll('.cell');                                                                                                                                                                                   
    const segmentQueenCount = {};                                                                                                                                                                                                       
                                                                                                                                                                                                                                        
    // Check each row for multiple queens                                                                                                                                                                                               
    for (let row = 0; row < boardSize; row++) {                                                                                                                                                                                         
        let queenCount = 0;                                                                                                                                                                                                             
        for (let col = 0; col < boardSize; col++) {                                                                                                                                                                                     
            if (board[row][col] === 'Q') {                                                                                                                                                                                              
                queenCount++;                                                                                                                                                                                                           
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
        // If more than one queen is found in the row, mark the entire row                                                                                                                                                              
        if (queenCount > 1) {                                                                                                                                                                                                           
            for (let col = 0; col < boardSize; col++) {                                                                                                                                                                                 
                const index = row * boardSize + col;                                                                                                                                                                                    
                cells[index].classList.add('invalid');                                                                                                                                                                                  
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
    }                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                        
    // Check each column for multiple queens                                                                                                                                                                                            
    for (let col = 0; col < boardSize; col++) {                                                                                                                                                                                         
        let queenCount = 0;                                                                                                                                                                                                             
        for (let row = 0; row < boardSize; row++) {                                                                                                                                                                                     
            if (board[row][col] === 'Q') {                                                                                                                                                                                              
                queenCount++;                                                                                                                                                                                                           
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
        // If more than one queen is found in the column, mark the entire column                                                                                                                                                        
        if (queenCount > 1) {                                                                                                                                                                                                           
            for (let row = 0; row < boardSize; row++) {                                                                                                                                                                                 
                const index = row * boardSize + col;                                                                                                                                                                                    
                cells[index].classList.add('invalid');                                                                                                                                                                                  
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
    }                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                        
    // Check each segment for multiple queens                                                                                                                                                                                           
    for (let row = 0; row < boardSize; row++) {                                                                                                                                                                                         
        for (let col = 0; col < boardSize; col++) {                                                                                                                                                                                     
            if (board[row][col] === 'Q') {                                                                                                                                                                                              
                const segmentColor = segments[row][col];                                                                                                                                                                                
                if (!segmentQueenCount[segmentColor]) {                                                                                                                                                                                 
                    segmentQueenCount[segmentColor] = 0;                                                                                                                                                                                
                }                                                                                                                                                                                                                       
                segmentQueenCount[segmentColor]++;                                                                                                                                                                                      
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
    }                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                        
    // Mark entire segments with more than one queen                                                                                                                                                                                    
    for (let row = 0; row < boardSize; row++) {                                                                                                                                                                                         
        for (let col = 0; col < boardSize; col++) {                                                                                                                                                                                     
            const segmentColor = segments[row][col];                                                                                                                                                                                    
            if (segmentQueenCount[segmentColor] > 1) {                                                                                                                                                                                  
                const index = row * boardSize + col;                                                                                                                                                                                    
                cells[index].classList.add('invalid');                                                                                                                                                                                  
            }                                                                                                                                                                                                                           
        }                                                                                                                                                                                                                               
    }                                                                                                                                                                                                                                   
}                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                        
function unmarkInvalidMove() {                                                                                                                                                                                                          
    const cells = document.querySelectorAll('.cell');                                                                                                                                                                                   
    cells.forEach(cell => cell.classList.remove('invalid'));                                                                                                                                                                            
}                                                                                                                                                                                                                                                            
   

function isValidMove(row, col) {
    for (let i = 0; i < boardSize; i++) {
        if (board[row][i] === 'Q' || board[i][col] === 'Q') return false;
    }
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (const [dx, dy] of directions) {
        let x = row + dx, y = col + dy;
        if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === 'Q') return false;
    }
    return true;
}


function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        if (board[row][col] === 'Q') {
            cell.textContent = '♛';
        } else if (board[row][col] === 'X') {
            cell.textContent = 'X';
        } else {
            cell.textContent = '';
        }
    });
}

function resetGame() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    renderBoard();
}



                                                                                                                                                                                                                                      
// Initialize the board with random segments and place queens                                                                                                                                                                           
document.addEventListener('DOMContentLoaded', () => {                                                                                                                                                                                   
    const queens = solveNQueens();
    // console.log('queens', queens);
    const segments = createRandomSegments(queens);
    createBoard(segments);
    // place the first 8 queens on the board
    // for (let i = 0; i < 8; i++) {
        // const [row, col] = queens[i];
        // board[row][col] = 'Q';
    // }
    renderBoardWithSegments(segments);
});       
