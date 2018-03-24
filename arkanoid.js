(function () {
    const store = {
        lifes: 3,
        score: 25,
        scoreList: [1, 3, 5],
        bricks: {
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
        bricksAreaInst = new BricksArea();
        this.arena.appendChild(bricksAreaInst.bricksArea);
    }

    Arena.prototype = {
        html: `<div class="arena" ref="arena"></div>`,
        createBall: function () {
            const ballInst = new Ball();

            this.arena.appendChild(ballInst.ball);
            this.balls.push(ballInst);
        }
    };

    function Panel() {
        this.panel = createElementFromHtml(this.html);
        this.panel.querySelector("[ref=lifes]").innerHTML = store.lifes;
        this.panel.querySelector("[ref=score]").innerHTML = store.score;
    }

    Panel.prototype = {
        html: ` <div class="panel">
                    <div class="lifes">Lifes: <span ref="lifes"></span></div>
                    <div class="score">Score: <span ref="score"></span></div>
                </div>`
    }    

    function BricksArea() {
        this.bricksArea = createElementFromHtml(this.html);

        //-------
        const fragment = document.createDocumentFragment();

        const brickElement = document.createElement("div");
        brickElement.classList.add("brick");

        for (let i = 1; i <= store.bricks.quantity; i += 1) {
            const brick = brickElement.cloneNode(true);
            brick.dataset.score = store.scoreList[Math.floor(Math.random() * 3)];
            fragment.appendChild(brick);
            
        }
        //-------
        this.bricksArea.appendChild(fragment);
        
    }
    BricksArea.prototype = {
        html: `<div class="bricksArea" ref="bricksArea"></div>`,
        


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
    document.getElementById("arkanoid").appendChild((new Panel()).panel);
}());

