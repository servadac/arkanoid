(function () {

    const gameWrap = document.getElementById("arkanoid")
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
        this.arena.tabIndex = -1;
        this.balls = [];
        this.createBall();
        this.paddleInst = new Paddle();
        this.arena.appendChild(this.paddleInst.paddle);
        bricksAreaInst = new BricksArea();
        this.arena.appendChild(bricksAreaInst.bricksArea);
        const {
          paddleInst
        } = this;
        this.arena.addEventListener("keydown", function(e) {
          if(e.keyCode === 37) {
            paddleInst.paddle.style.left = paddleInst.getLeft() - paddleInst.getWidth()*2/3 + "px";
          }
          if (paddleInst.getLeft() < 0+(paddleInst.getWidth()*2/3)) {
              paddleInst.paddle.style.left = 0 +(paddleInst.getWidth()*2/3) + "px";
          }
          if(e.keyCode === 39) {

            paddleInst.paddle.style.left = paddleInst.getLeft() + paddleInst.getWidth()*2/3 + "px";
          }
          if (paddleInst.getLeft() > 256-(paddleInst.getWidth()*2/3)  ) {
            paddleInst.paddle.style.left = 256-(paddleInst.getWidth()*2/3) + "px";
        }
        }, false);

        const {
            top: arenaTop,
            left: arenaLeft,
            right: arenaRight,
            width: arenaWidth,
            height: arenaHeight
        } = this.arena.getBoundingClientRect();

            //arena.style.transform = rotate(270deg);
    }

    Arena.prototype = {
        html: `<div class="arena" ref="arena"></div>`,
        createBall: function () {
            const ballInst = new Ball();

            this.arena.appendChild(ballInst.ball);
            this.balls.push(ballInst);


        },

        setBallPosition: function () {
          const ballLeft = this.paddleInst.getLeft() + (this.paddleInst.getWidth() / 2) - (this.balls[0].getDiameter() / 2);
          const ballTop = this.paddleInst.getTop() - this.balls[0].getDiameter();
          this.balls[0].ball.style.left = ballLeft + "px";
          this.balls[0].ball.style.top = ballTop + "px";
        },

        start: function() {
          this.setBallPosition();
        },


    };

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



    const arenaCreator = new Arena()
    document.getElementById("arkanoid").appendChild(arenaCreator.arena);
    document.getElementById("arkanoid").appendChild((new Panel()).panel);
    arenaCreator.start();

}());


