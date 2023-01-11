function Chomp(rows, cols, userFirst, aiDifficulty) {

    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.playersTurn = userFirst;
    this.ai = new ChompAI(aiDifficulty, rows, cols);
    this.gameOver = false;
    this.currentTurn = 1;

    this.reset();

}

Object.assign(Chomp.prototype, {

    constructor: Chomp,

    // reset the chomp board to initial state
    reset: function() {

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = FULL;
            }
        }

        this.grid[0][0] = POISON;
        this.gameOver = false;
        this.currentTurn = 2;
        let who = this.playersTurn ? "Player" : "A.I.";
        document.getElementById("turnText").innerText = "Turn 1 - " + who + "'s turn";

    },

    // take a bite out of the board
    bite: function(row=null, col=null) {

        // if game already ended, return false and do nothing
        if(this.gameOver) { return false; }

        // if using default parameters, AI's turn
        if(row === null) {

            let pos = this.ai.findBestMove(this.grid, this.rows, this.cols);
            row = pos[0];
            col = pos[1];

        }

        // check for invalid selection
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || this.grid[row][col] === EMPTY) {
            alert("Please select a valid move.");
            return false;
        } else {

            // TODO: implement flicker mechanic for cleaner experience
            for (let i = row; i < this.rows; i++) {
                for (let j = col; j < this.cols; j++) {
                    this.grid[i][j] = EMPTY;
                }
            }

            // declare winner when poison square is gone
            if(this.grid[0][0] === EMPTY) {
                this.declareWinner();
                return false;
            }

            let who = !this.playersTurn ? "Player" : "A.I.";
            this.currentTurn++;
            document.getElementById("turnText").innerText = "Turn " + (this.currentTurn >> 1) + " - " + who + "'s turn";

            // flip turn indicator
            this.playersTurn = !this.playersTurn;
            return true;

        }

    },

    // declare winner of the game
    declareWinner: function() {

        this.gameOver = true;

        if (!this.playersTurn) {
            document.getElementById("turnText").innerText = "Player wins!";
        } else {
            document.getElementById("turnText").innerText = "A.I. wins! Better luck next time!";
        }

    },

    // draw chomp board, highlighting tiles that would be removed by user's current selection
    draw: function(userR=Infinity, userC=Infinity) {

        // clear screen
        ctx.clearRect(0, 0, W, H);
        // set stroke style to black for border of tiles
        ctx.strokeStyle = "#000000";
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {

                // set fill style differently based on whether the tile is empty or not
                if(this.grid[i][j] === EMPTY) { ctx.fillStyle = "#999999"; }
                else { ctx.fillStyle = "#74594f"; }

                // fill tile
                ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
                // if tile is poison square, put yellow 'X' over it to indicate as such
                if(this.grid[i][j] === POISON) {

                    ctx.strokeStyle = "#f5e84f";
                    ctx.beginPath();
                    ctx.moveTo(j * SCALE, i * SCALE);
                    ctx.lineTo((j + 1) * SCALE, (i + 1) * SCALE);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo((j + 1) * SCALE, i * SCALE);
                    ctx.lineTo(j * SCALE, (i + 1) * SCALE);
                    ctx.stroke();
                    ctx.strokeStyle = "#000000";

                }

                // highlight any tiles that are still full that would be removed by user's current selection
                if(this.grid[i][j] !== EMPTY && i >= userR && j >= userC) {
                    ctx.fillStyle = "rgba(250,0,0,0.3)";
                    ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
                }

                // border the tile with black
                ctx.strokeRect(j * SCALE, i * SCALE, SCALE, SCALE);

            }
        }

    }

});