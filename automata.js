class Automata {
    constructor(game) {
        Object.assign(this, {game})

        this.automata = [];
        this.height = 100;
        this.width = 200;

        this.tickCount = 0;
        this.ticks = 0;

        this.speed = parseInt(document.getElementById("speed").ariaValueMax, 10);
        this.isRunning = false;

        for (let i = 0; i < this.width; i++) {
            this.automata.push([])
            for (let j = 0; j < this.height; j++) {
                this.automata[i][j] = 0
            }
        }

        document.getElementById("start").onclick = e => {this.isRunning = true}
        document.getElementById("pause").onclick = e => {this.isRunning = false}
        document.getElementById("clear").onclick = e => {this.clear()}
        document.getElementById("random").onclick = e => {this.random()}
        document.getElementById("checkerboard").onclick = e => {this.checkerboard()}
        document.getElementById("blindfolds").onclick = e => {this.blindfolds()}
        document.getElementById("diagonal").onclick = e => {this.skewedDiagonal()}
        this.random();
    }

    clear() {
        this.tickCount = 0;
        this.ticks = 0;
        this.isRunning = false;
        document.getElementById("ticks").innerHTML = "Ticks: " + this.ticks
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.automata[i][j] = 0
            }
        }
    }

    findAdjacent(col, row) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) count++;
            }
        }
        return count;
    }

    checkerboard() {
        this.clear();
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if ((i + j) % 2 == 0) {
                    this.automata[i][j] = 1;
                }
            }
        }
    }

    blindfolds() {
        this.clear();
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.automata[j][i] = i % 3;
            }
        }
    }

    skewedDiagonal() {
        this.clear();
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if ((i + j) % 3 == 0) {
                    this.automata[j][i] = 1;
                }
            }
        }
    }

    random() {
        this.clear();
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = randomInt(2);
            }
        }
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.tickCount++ >= this.speed && this.isRunning) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let next = [];
            for (let i = 0; i < this.width; i++) {
                next.push([]);
                for (let j = 0; j < this.height; j++) {
                    next[i].push(0);
                }
            }

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    let cell = this.automata[i][j]
                    let adjacent = this.findAdjacent(i, j)
                    if (cell) {
                        next[i][j] = (adjacent == 2 || adjacent == 3) ? 1 : 0
                    } else {
                        next[i][j] = adjacent == 3 ? 1 : 0
                    }
                }
            }
            this.automata = next;
        }
    }

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "White";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    }
}