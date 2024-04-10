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

    update() {

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