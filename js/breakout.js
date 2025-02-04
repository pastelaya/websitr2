open = document.getElementById('rules-btn')
rules = document.getElementById('rules')
close = document.getElementById('close-btn')
canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

score = 0;

brickRowCount = 9;
brickColumnCount = 5;


// ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#45C44A'
    ctx.fill()
    ctx.closePath()
}

// create pattle properties

paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

// create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

// creating bricks

bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {
            x,
            y,
            ...brickInfo
        }
    }
}


// draw paddle
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#45C44A'
    ctx.fill()
    ctx.closePath()
}

// draw score on canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#45C44A' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })

    })
}

// draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

function update() {
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
}

update()

// move paddle on canvas
function movePaddle() {
    paddle.x = paddle.x + paddle.dx

    // detect wall
    if (paddle.x < 0) {
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }

}

// keydown event
function keyDown(e) {
    // console.log(e.key)
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = -paddle.speed
    }
}

// keyup event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = 0
}
    if (e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}


// keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)


// move ball on canvas
function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy


// ball collision (top)
if (ball.y + ball.size < 0) {
    ball.dy = -1 * ball.dy
}

// ball collision (right)
if (ball.x + ball.size > canvas.width) {
    ball.dx = -1 * ball.dx
}

// ball collision (bottom)
if (ball.y + ball.size > canvas.height) {
    ball.dy = -1 * ball.dy
    showAllBricks()
    score = 0
}

// ball collision (left)
if (ball.x + ball.size < 0) {
    ball.dx = -1 * ball.dx
}

// paddle collision
if (
    ball.x - ball.size > paddle.x &&
    paddle.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
    ){
    ball.dy = -1 * ball.dy
}

/// brick collision
bricks.forEach(column => {
    column.forEach(brick => {
        if (brick.visible){
            if (ball.x - ball.size > brick.w &&
            ball.x + ball.size < brick.x + brick.w &&
            ball.y - ball.size < brick.y + brick.h &&
            ball.y + ball.size > brick.y)
            {

            ball.dy = -ball.dy
            brick.visible = false
            increaseScore()
            }
        }
    })
})

}

function increaseScore() {
    score++

    if (score == brickCount * brickColumnCount){
        score=0
        showAllBricks()
    }
}

function showAllBricks() {
    bricks.forEach(column =>{
        column.forEach(brick =>{
            brick.visible = true
        })
    })
}


// rules open and close event handlers
open.addEventListener('click', () => {
    rules.classList.add('show')
})

close.addEventListener('click', () => {
    rules.classList.remove('show')
})