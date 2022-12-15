// const startBtn = document.getElementById('startBtn');
// startBtn.addEventListener('click', ()=> {
//     // console.log('click');

//     const canvas = document.createElement('canvas');
//     canvas.setAttribute('id', 'snakeBoard');
//     canvas.width = 400;
//     canvas.height = 400;

//     document.getElementById('section').append(canvas)
// })


class Snake {
    constructor() {
        this.boardBorder = '#000';
        this.boardBg = '#fff';
        this.snakeColor = '#f72585';
        this.snakeBorder = '#ffafcc';

        this.snakeBoard = document.getElementById('snakeBoard');
        this.snakeBoardCtx = this.snakeBoard.getContext('2d');

        this.snake = [
            {x: 200, y: 200}, {x: 190, y: 200}, 
            {x: 180, y: 200}, {x: 170, y: 200}, 
            {x: 160, y: 200}
        ];

        this.score = 0
        this.speed = 100

        this.changingDirection = false

        this.gameEnded = false

        this.dx = 10
        this.dy = 0

        this.foodX = 0
        this.foodY = 0

        this.leaderboard = {
            player: 'player',
            hiScore: 0
        }

        this.current = {
            player: 'player',
            hiScore: 0
        }
    }

    init(){
        // return completes a task; all functions after return end
        if(this.hasGameEnded()) return

        this.changingDirection = false
        // add timer
        // setTimeout(callback function, time in ms)
        setTimeout(()=> {
            this.clearCanvas();
            this.drawSnake();
            this.drawFood();
            this.moveSnake();

            // call init()
            this.init();
        }, this.speed)
    }

    clearCanvas(){
        const snakeBoard = this.snakeBoard
        const snakeBoardCtx = this.snakeBoardCtx

        snakeBoardCtx.fillStyle = this.boardBg;
        snakeBoardCtx.strokeStyle = this.boardBorder;
        snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
        snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);    
    }

    drawSnake() {
        const snake = this.snake;
        const board = this.snakeBoard;
        const context = this.snakeBoardCtx;

        snake.forEach(part => {
            context.fillStyle = this.snakeColor;
            context.strokeStyle = this.snakeBorder;
            context.fillRect(part.x, part.y, 10, 10);
            context.strokeRect(part.x, part.y, 10, 10);
        })
    }

    moveSnake() {
        const snake = this.snake
        const foodX = this.foodX
        const foodY = this.foodY


        const head = {x: snake[0].x + this.dx, y: snake[0].y + this.dy}
            snake.unshift(head)

            const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY

        if(hasEatenFood) {
            this.score += 10
            const scoreDisplay = document.getElementById('score');
            scoreDisplay.innerText = this.score
            this.generateFood();
        } else {
            snake.pop();
        }
    }

    changeDirection(e) {

        const LEFT = 37
        const RIGHT = 39
        const UP = 38
        const DOWN = 40

        if(this.changingDirection) return
        this.changingDirection = true

        const keyPressed = e.keyCode

        const goingUp = this.dy === -10
        const goingDown = this.dy === 10
        const goingRight = this.dx === 10
        const goingLeft = this.dx === -10

        if (keyPressed === LEFT && !goingRight) {
            this.dx = -10
            this.dy = 0
        }
        
        if (keyPressed === UP && !goingDown) {
            this.dx = 0
            this.dy = -10
        }
        
        if (keyPressed === RIGHT && !goingLeft) {
            this.dx = 10
            this.dy = 0
        }

        if (keyPressed === DOWN && !goingUp) {
            this.dx = 0
            this.dy = 10
        }
    }

    hasGameEnded(){
        const snake = this.snake
        const snakeBoard = this.snakeBoard
        
        // snake bites itself
        for( let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                this.gameEnded = true
                return this.gameEnded
            }
        };

        // snake hits wall
        const hitLeftWall = snake[0].x < 0; //top left of object is being considered, not the whole object
        const hitRightWall = snake[0].x > snakeBoard.width - 10;
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > snakeBoard.height - 10;

        if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
            this.gameEnded = true
        }
        
        return this.gameEnded
    }

    randomFood(min, max){
        return Math.round(Math.random() * (max - min) / 10) * 10
    }

    generateFood(){
        this.foodX = this.randomFood(0, snakeBoard.width - 10);
        this.foodY = this.randomFood(0, snakeBoard.height - 10);

        this.snake.forEach(part => {
            const hasEaten = part.x == this.foodX && part.y == this.foodY;

            if(hasEaten) {
                this.generateFood()
            }
        });
    }

    drawFood(){
        const snakeBoardCtx = this.snakeBoardCtx

        snakeBoardCtx.fillStyle = '#2d6a4f';
        snakeBoardCtx.strokeStyle = '#52b788';
        snakeBoardCtx.fillRect(this.foodX, this.foodY, 10, 10);
        snakeBoardCtx.strokeRect(this.foodX, this.foodY, 10, 10);

    }
}

// // style board
// const boardBorder = '#000000';
// const boardBg = '#ffffff';
// const snakeColor = '#f72585';
// const snakeBorder = '#ffafcc';

// // make the snake => array of coordinates
// let snake = [
//     {x: 200, y: 200}, {x: 190, y: 200}, 
//     {x: 180, y: 200}, {x: 170, y: 200}, 
//     {x: 160, y: 200}
// ];

// let score = 0;

// let speed = 100;

// let changingDirection = false;

// let dx = 10;
// let dy = 0;

// // food
// let foodX
// let foodY

// // Make the canvas
// const snakeBoard = document.getElementById('snakeBoard');
// const snakeBoardCtx = snakeBoard.getContext('2d');

// draw the border around the canvas
// coordinate 0,0 is top left

// const clearCanvas =()=> {
//     snakeBoardCtx.fillStyle = boardBg;
//     snakeBoardCtx.strokeStyle = boardBorder;
//     snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
//     snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
// }

// //Draw snake
// const drawSnake =()=> {
//     snake.forEach(drawSnakePart)
// }

// const drawSnakePart =(snakePart)=>{
//     snakeBoardCtx.fillStyle = snakeColor;
//     snakeBoardCtx.strokeStyle = snakeBorder;
//     snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
//     snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
// }

//Move snake
// const moveSnake =()=>{
//     const head = {x: snake[0].x + dx, y: snake[0].y + dy}
//     snake.unshift(head)

//     const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY

//     if(hasEatenFood) {
//         score += 10
//         const scoreDisplay = document.getElementById('score');
//         scoreDisplay.innerText = score
//         generateFood();
//     } else {
//         snake.pop();
//     }

//     // if(score > 50){
//     //     speed -=10
//     // }

// }

// const init =()=> {
//     // return completes a task; all functions after return end
//     if(hasGameEnded()) return

//     change_direction = false
//     // add timer
//     // setTimeout(callback function, time in ms)
//     setTimeout(function onTick(){
//         clearCanvas();
//         drawSnake();
//         drawFood();
//         moveSnake();

//         // call init()
//         init()
//     }, speed)
// }

// const changeDirection=(e)=>{
//     const LEFT = 37
//     const RIGHT = 39
//     const UP = 38
//     const DOWN = 40

//     if(change_direction) return
//     change_direction = true

//     const keyPressed = e.keyCode

//     const goingUp = dy === -10
//     const goingDown = dy === 10
//     const goingRight = dx === 10
//     const goingLeft = dx === -10

//     if (keyPressed === LEFT && !goingRight) {
//         dx = -10
//         dy = 0
//     }
    
//     if (keyPressed === UP && !goingDown) {
//         dx = 0
//         dy = -10
//     }
    
//     if (keyPressed === RIGHT && !goingLeft) {
//         dx = 10
//         dy = 0
//     }

//     if (keyPressed === DOWN && !goingUp) {
//         dx = 0
//         dy = 10
//     }

// }

// const hasGameEnded =()=> {
//     // snake bites itself
//     for( let i = 4; i < snake.length; i++) {
//         if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
//             return true
//         }
//     };

//     // snake hits wall
//     const hitLeftWall = snake[0].x < 0; //top left of object is being considered, not the whole object
//     const hitRightWall = snake[0].x > snakeBoard.width - 10;
//     const hitTopWall = snake[0].y < 0;
//     const hitBottomWall = snake[0].y > snakeBoard.height - 10;

//     return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
// }

// randomize food
// const randomFood =(min, max)=> {
//     return Math.round(Math.random() * (max - min) / 10) * 10
// }

// const generateFood =()=>{
//     foodX = randomFood(0, snakeBoard.width - 10);
//     foodY = randomFood(0, snakeBoard.height - 10);

//     snake.forEach(part => {
//         const hasEaten = part.x == foodX && part.y == foodY;

//         if(hasEaten) {
//             generateFood()
//         }
//     });
// };

// draw food
// const drawFood=()=>{
//     snakeBoardCtx.fillStyle = '#2d6a4f';
//     snakeBoardCtx.strokeStyle = '#52b788';
//     snakeBoardCtx.fillRect(foodX, foodY, 10, 10);
//     snakeBoardCtx.strokeRect(foodX, foodY, 10, 10);
// }


const snakeGame = new Snake
const startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', ()=> {
    snakeGame.gameEnded = false
    snakeGame.init();
})

document.addEventListener('keydown', ()=> {
    snakeGame.changeDirection(event)
})
snakeGame.generateFood();