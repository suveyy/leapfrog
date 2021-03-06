const pipes = {
    position: [],

    bottom: {
        sourceX: 502,
        sourceY: 0
    },
    top: {
        sourceX: 553,
        sourceY: 0
    },

    width: 53,
    height: 400,
    gap: 85,
    maxYPos: -150,
    dx: 2,

    drawPipes: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];


            let topYPos = p.y;
            let bottomYpos = p.y + this.height + this.gap;

            ctx.drawImage(spriteImage, this.top.sourceX, this.top.sourceY, this.width, this.height, p.x, topYPos, this.width, this.height);
            ctx.drawImage(spriteImage, this.bottom.sourceX, this.bottom.sourceY, this.width, this.height, p.x, bottomYpos, this.width, this.height);
        }
    },

    updatePipes: function () {
        if (gameStates.currentState !== gameStates.playing) return;

        if (frames % 100 == 0) {
            this.position.push({
                x: cvs.width,
                y: this.maxYPos * (Math.random() + 1)
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let bottomPipeYPos = p.y + this.height + this.gap;

            if (bird.xDest + bird.radius > p.x && bird.xDest - bird.radius < p.x + this.width && bird.yDest + bird.radius > p.y && bird.yDest - bird.radius < p.y + this.height) {
                gameStates.currentState = gameStates.gameOver;
            }
            if (bird.xDest + bird.radius > p.x && bird.xDest - bird.radius < p.x + this.width && bird.yDest + bird.radius > bottomPipeYPos && bird.yDest - bird.radius < bottomPipeYPos + this.height) {
                gameStates.currentState = gameStates.gameOver;
            }

            p.x -= this.dx;

            if (p.x + this.width <= 0) {
                this.position.shift();
            }
        }
    },

    resetPipes: function () {
        this.position = [];
    }
}