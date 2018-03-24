(function () {
    const store {
        lifes: 3,
        score: 0,
        bricks {
            quantity: 30
        }
    }

    function createElementFromHtml(html) {
        const div = document.createElement("div");
        div.innerHTML = html;

        return div.firstElementChild;
    }

    function Arkanoid() {

    }

    function Arena() {
        this.arena = createElementFromHtml(this.html);
        this.balls = [];
        this.createBall();
        this.paddleInst = new Paddle();
        this.arena.appendChild(this.paddleInst.paddle);
        bricksInst = new Bricks();
        this.arena.appendChild(bricksInst.bricks);
        /*-------
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/game");
        xhr.responseType = "json";
        xhr.addEventListener("load", function () {
            const {
                bricks: { quantity },
                lifes: resLifes,
                scoreList
            } = this.response[0];
            const fragment = document.createDocumentFragment();

            const brickElement = document.createElement("div");
            brickElement.classList.add("brick");

            for (let i = 1; i <= quantity; i += 1) {
                const brick = brickElement.cloneNode(true);
                brick.dataset.score = scoreList[Math.floor(Math.random() * 3)];
                fragment.appendChild(brick);
            }

            bricksQuantity = quantity;

            lifes = resLifes;
            tpl.lifes.innerHTML = lifes;
            tpl.score.innerHTML = score;

            tpl.bricks.appendChild(fragment);

            bricksTop = tpl.bricks.offsetTop;
            bricksBottom = bricksTop + tpl.bricks.offsetHeight;
        });
        xhr.send();

        setBallPosition();

        tpl.paddle.addEventListener("mousedown", function (event) {
            document.addEventListener("mousemove", mouseMove, false);
            startBall();
        }, false);

        gameWrap.addEventListener("keydown", function (e) {
            if (e.keyCode === 32) {
                startBall();
            }
            if (e.keyCode === 37) {
                tpl.paddle.style.left = tpl.paddle.offsetLeft - 20 + "px";
            }

            if (e.keyCode === 39) {
                tpl.paddle.style.left = tpl.paddle.offsetLeft + 20 + "px";
            }
        }, false);
        */

    }

    Arena.prototype = {
        html: `<div class="arena" ref="arena"></div>`,
        createBall: function () {
            const ballInst = new Ball();

            this.arena.appendChild(ballInst.ball);
            this.balls.push(ballInst);
        }
    };

    function Bricks() {
        this.bricks = createElementFromHtml(this.html);
    }
    Bricks.prototype = {
        html: `<div class="bricks" ref="bricks"></div>`
    }

    function Brick() {
      
    }

    function Ball() {
        this.ball = createElementFromHtml(this.html);
    }
    Ball.prototype = {
        html: `<div class="ball" ref="ball"></div>`,
        deltaX: 1,
        deltaY: -1,
        setPosition: function () {
            const { ball, deltaX, deltaY } = this;

            this.ballLeftPos = ball.offsetLeft + deltaX;
            this.ballTopPos = ball.offsetTop + deltaY;
            ball.style.top = this.ballTopPos + "px";
            ball.style.left = this.ballLeftPos + "px";
        },
        getDiameter: function () {
            return this.ball.offsetHeight;
        },
        getRadius: function () {
            return this.getDiameter() / 2;
        }
    };

    function Paddle() {
        this.paddle = createElementFromHtml(this.html);
    }
    Object.assign(Paddle.prototype, {
        html: `<div class="paddle" ref="paddle"></div>`,
        getLeft: function () {
            return this.paddle.offsetLeft;
        },
        getTop: function () {
            return this.paddle.offsetTop;
        },
        getWidth: function () {
            return this.paddle.offsetWidth;
        }
    });

    document.getElementById("arkanoid").appendChild((new Arena()).arena);
}());

