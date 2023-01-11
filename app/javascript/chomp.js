// constants used in only this demo
var FULL = 1, EMPTY = 0, POISON = 2;

// game object
var chompGame = null;
var usrX = 0, usrY = 0;

function initChompDemo() {

    const lr = document.createElement("label");
    lr.id = "lr";
    lr.for = "rows";
    lr.innerText = "Rows";
    const rows = document.createElement("input");
    rows.id = "rows";
    rows.type = "number";
    document.body.appendChild(lr);
    document.body.appendChild(rows);

    const lc = document.createElement("label");
    lc.id = "lc";
    lc.for = "cols";
    lc.innerText = "Columns";
    const cols = document.createElement("input");
    cols.id = "cols";
    cols.type = "number";
    document.body.appendChild(lc);
    document.body.appendChild(cols);

    const diff = document.createElement("select");
    diff.id = "diff";
    const selectDiff = document.createElement("option");
    selectDiff.innerText = "--Select difficulty--";
    diff.appendChild(selectDiff);
    const diff0 = document.createElement("option");
    diff0.innerText = "0 - Simple";
    diff.appendChild(diff0);
    const diff1 = document.createElement("option");
    diff1.innerText = "1 - Easy";
    diff.appendChild(diff1);
    const diff2 = document.createElement("option");
    diff2.innerText = "2 - Medium";
    diff.appendChild(diff2);
    const diff3 = document.createElement("option");
    diff3.innerText = "3 - Hard";
    diff.appendChild(diff3);
    document.body.appendChild(diff);

    const lgc = document.createElement("label");
    lgc.id = "lgc";
    lgc.for = "goFirst";
    lgc.innerText = "Go First? ";
    const goFirst = document.createElement("input");
    goFirst.id = "goFirst";
    goFirst.type = "checkbox";
    document.body.appendChild(lgc);
    document.body.appendChild(goFirst);

    const start = document.createElement("input");
    start.id = "start";
    start.type = "button";
    start.value = "Start game";
    start.addEventListener("click", newGame);
    document.body.appendChild(start);
    const br1 = document.createElement("br");
    br1.id = "space1";
    document.body.appendChild(br1);

    const turnText = document.createElement("a");
    turnText.id = "turnText";
    turnText.innerText = "No game currently playing";
    document.body.appendChild(turnText);
    const br2 = document.createElement("br2");
    br2.id = "space2";
    document.body.appendChild(br2);

    const cnv = document.getElementById("cnv");

    W = Math.floor(0.95 * window.innerWidth);
    H = Math.floor((0.95 * window.innerHeight - (document.body.clientHeight - parseInt(cnv.height))));

    cnv.setAttribute("width", W.toString());
    cnv.setAttribute("height", H.toString());
    ctx.clearRect(0, 0, W, H);
    document.body.appendChild(cnv);

    // perform operation at regular interval
    interval = setInterval(function () {

        // if there is a current game playing, draw the current game state
        if (chompGame !== null) {
            chompGame.draw(usrY, usrX);
        }

    }, 1000 * TIME);

}

// instantiate new chomp game
function newGame(e) {

    const r = document.getElementById("rows").value;
    const c = document.getElementById("cols").value;
    const diffs = document.getElementById("diff");
    const diff = parseInt(diffs.options[diffs.selectedIndex].text);
    const userFirst = document.getElementById("goFirst").checked;
    chompGame = new Chomp(r, c, userFirst, diff);
    usrY = Infinity;
    usrX = Infinity;

    if(!userFirst) {

        setTimeout(function() {
            chompGame.bite();
        }, 3000);

    }

}

// detect keydown events within canvas to adjust scale of game board
document.getElementById("cnv").addEventListener("keydown", function(e) {

    if(e.key === "=" && SCALE < 150) {
        SCALE += 10;
    }

    else if(e.key === "-" && SCALE > 10) {
        SCALE -= 10;
    }

});

// detect mousemove events within canvas to keep track of user's current selection
document.getElementById("cnv").addEventListener("mousemove", function(e) {

    if(chompGame !== null && !chompGame.gameOver) {

        usrY = Math.floor(e.offsetY / SCALE);
        usrX = Math.floor(e.offsetX / SCALE);

    }

});

// detect mousedown event within canvas to know when user finalizes selection, and take bite from chomp board
document.getElementById("cnv").addEventListener("mousedown", function(e) {

    // if there is a current game playing and it is the player's turn, use their current selection to take a bite
    if(chompGame !== null && chompGame.playersTurn && !chompGame.gameOver) {

        // if move was valid and game is not over, let AI move after 3 seconds
        if(chompGame.bite(usrY, usrX)) {
            setTimeout(function() {
                chompGame.bite();
            }, 3000);
        }

    }

});

initChompDemo();