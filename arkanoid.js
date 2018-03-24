(function () {
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
        this.bricks = [];
        this.createBricks();
    }

    Arena.prototype = {
        html: `<div class="arena" ref="arena"></div>`,
        createBall: function () {
            const ballInst = new Ball();

            this.arena.appendChild(ballInst.ball);
            this.balls.push(ballInst);
        },

        createBricks: function () {
            const bricksInst = new Bricks();

            this.arena.appendChild(bricksInst.bricks);
            this.balls.push(bricksInst);
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
