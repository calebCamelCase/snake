// style board
const boardBorder = '#000000';
const boardBg = '#ffffff';
const snakeColor = '#f72585';
const snakeBorder = '#ffafcc';

// make the snake => array of coordinates
let snake = [
    {x: 200, y: 200}, {x: 190, y: 200}, 
    {x: 180, y: 200}, {x: 170, y: 200}, 
    {x: 160, y: 200},
];

let score = 0;

let change_direction = false;

let dx = 10;
let dy = 0;

// Make the canvas
const snakeBoard = document.getElementById('snakeBoard');
const snakeBoardCtx = snakeBoard.getContext('2d');

// draw the border around the canvas

const clearCanvas =()=> {
    snakeBoardCtx.fillStyle = boardBg;
    snakeBoardCtx.strokeStyle = boardBorder;
    snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

//Draw snake
const drawSnake =()=> {
    snake.forEach(drawSnakePart)
}

const drawSnakePart =(snakePart)=>{
    snakeBoardCtx.fillStyle = snakeColor;
    snakeBoardCtx.strokeStyle = snakeBorder;
    snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//Move snake
const moveSnake =()=>{
    const head = {x: snake[0].x + dx, y: snake[0].y + dy}
    snake.unshift(head)

    snake.pop();
}

const init =()=> {

    change_direction = false
    // add timer
    // setTimeout(callback function, time in ms)
    setTimeout(function onTick(){
        clearCanvas();
        drawSnake();
        moveSnake();

        // call init()
        init()
    }, 100)
}

const changeDirection=(e)=>{
    const LEFT = 37
    const RIGHT = 39
    const UP = 38
    const DOWN = 40

    if(change_direction) return
    change_direction = true

    const keyPressed = e.keyCode

    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingRight = dx === 10
    const goingLeft = dx === -10

    if (keyPressed === LEFT && !goingRight) {
        dx = -10
        dy = 0
    }
    
    if (keyPressed === UP && !goingDown) {
        dx = 0
        dy = -10
    }
    
    if (keyPressed === RIGHT && !goingLeft) {
        dx = 10
        dy = 0
    }

    if (keyPressed === DOWN && !goingUp) {
        dx = 0
        dy = 10
    }

}


init()

document.addEventListener('keydown', changeDirection)