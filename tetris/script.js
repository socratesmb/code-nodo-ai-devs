document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const width = 10;
    const height = 20;
    let score = 0;
    let squares = [];
    let currentPiece;
    let currentPosition;
    let currentColorClass;

    for (let i = 0; i < width * height; i++) {
        const square = document.createElement('div');
        board.appendChild(square);
        squares.push(square);
    }
    
    const PIECES = {
        'L': [[[1, width + 1], [1, width + 2], [2, 2]], ],
        'Z': [[[0, 1, width + 1, width + 2]], /* ... */],
        'T': [[[1, width, width + 1, width + 2]], /* ... */],
        'O': [[[0, 1, width, width + 1]], /* ... */],
        'I': [[[1, width + 1, width * 2 + 1, width * 3 + 1]], /* ... */],
        'S': [[[width, width + 1, 1, 2]], /* ... */],
        'J': [[[1, width + 1, width * 2 + 1, 2]], /* ... */]
    };
    

    const pieceL = [[[1, width + 1, width * 2 + 1], [width, width + 1, width + 2]]];
    const pieceI = [[[1, width+1, width*2+1, width*3+1], [width, width+1, width+2, width+3]]];
    
    const iPiece = [[1, width + 1, width * 2 + 1, width * 3 + 1]];
    const lPiece = [[0, 1, width + 1, width * 2 + 1]];
    const tPiece = [[1, width, width + 1, width + 2]];
    const oPiece = [[0, 1, width, width + 1]];
    const sPiece = [[0, width, width + 1, width*2 + 1]];
    const zPiece = [[1, width, width + 1, width*2]];
    const jPiece = [[1, width + 1, width*2, width * 2 + 1]];

    const thePieces = [iPiece, lPiece, tPiece, oPiece, sPiece, zPiece, jPiece];
    const pieceClasses = ['I', 'L', 'T', 'O', 'S', 'Z', 'J'];
    let rotation = 0;

    function startGame() {
        squares.forEach(sq => sq.classList.remove(...pieceClasses));
        selectNewPiece();
        draw();
        setInterval(moveDown, 1000);
    }

    function selectNewPiece() {
        const randomIndex = Math.floor(Math.random() * thePieces.length);
        currentPiece = thePieces[randomIndex][rotation];
        currentColorClass = pieceClasses[randomIndex];
        currentPosition = 4;
    }
    
    function draw() {
        currentPiece.forEach(index => {
            squares[currentPosition + index].classList.add(currentColorClass);
        });
    }

    function undraw() {
        currentPiece.forEach(index => {
            squares[currentPosition + index].classList.remove(currentColorClass);
        });
    }

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        } else if (e.key === 'ArrowDown') {
            moveDown();
        } else if (e.key === 'ArrowUp') {
        }
    });
    
    function moveLeft() {
        undraw();
        const isAtLeftEdge = currentPiece.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        draw();
    }
    
    function moveRight() {
        undraw();
        const isAtRightEdge = currentPiece.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        draw();
    }
    
    function freeze() {
        if (currentPiece.some(index => currentPosition + index + width >= width*height || squares[currentPosition + index + width].classList.contains('taken'))) {
            currentPiece.forEach(index => squares[currentPosition + index].classList.add('taken'));
            checkRowsForClear();
            selectNewPiece();
        }
    }

    function checkRowsForClear() {
        for (let i = 0; i < (width*height) -1; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
            
            if (row.every(index => squares[index].classList.contains('taken'))) {
                
                scoreDisplay.innerHTML = score;

                const squaresRemoved = row.map(index => squares[index]);
                squaresRemoved.forEach(sq => {
                  sq.className = '';
                });
                
            }
        }
    }

    startGame();
});