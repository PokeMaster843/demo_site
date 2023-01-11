// double pendulum object
var dp = null;
// variables used for manipulating double pendulum
var running = false;
var edited = false;

// initialize canvas and other elements, and add to document
function initDPDemo() {

    const ll1 = document.createElement("label");
    ll1.id = "ll1";
    ll1.for = "len1";
    ll1.innerText = "Length 1";
    const len1 = document.createElement("input");
    len1.id = "len1";
    len1.type = "number";
    len1.addEventListener("change", () => { edited = true; });
    document.body.appendChild(ll1);
    document.body.appendChild(len1);

    const lm1 = document.createElement("label");
    lm1.id = "lm1";
    lm1.for = "mass1";
    lm1.innerText = "Mass 1";
    const mass1 = document.createElement("input");
    mass1.id = "mass1";
    mass1.type = "number";
    mass1.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lm1);
    document.body.appendChild(mass1);

    const lt1 = document.createElement("label");
    lt1.id = "lt1";
    lt1.for = "theta1";
    lt1.innerText = "Theta 1";
    const theta1 = document.createElement("input");
    theta1.id = "theta1";
    theta1.type = "number";
    theta1.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lt1);
    document.body.appendChild(theta1);
    const br1 = document.createElement("br");
    br1.id = "space1";
    document.body.appendChild(br1);

    const ll2 = document.createElement("label");
    ll2.id = "ll2";
    ll2.for = "len2";
    ll2.innerText = "Length 2";
    const len2 = document.createElement("input");
    len2.id = "len2";
    len2.type = "number";
    len2.addEventListener("change", () => { edited = true; });
    document.body.appendChild(ll2);
    document.body.appendChild(len2);

    const lm2 = document.createElement("label");
    lm2.id = "lm2";
    lm2.for = "mass2";
    lm2.innerText = "Mass 2";
    const mass2 = document.createElement("input");
    mass2.id = "mass2";
    mass2.type = "number";
    mass2.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lm2);
    document.body.appendChild(mass2);

    const lt2 = document.createElement("label");
    lt2.id = "lt2";
    lt2.for = "theta2";
    lt2.innerText = "Theta 2";
    const theta2 = document.createElement("input");
    theta2.id = "theta2";
    theta2.type = "number";
    theta2.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lt2);
    document.body.appendChild(theta2);

    const submitBtn = document.createElement("input");
    submitBtn.id = "newDP";
    submitBtn.type = "button";
    submitBtn.value = "Start";
    submitBtn.addEventListener("click", newDoublePendulum);
    document.body.appendChild(submitBtn);
    const br2 = document.createElement("br");
    br2.id = "space2";
    document.body.appendChild(br2);

    let cnv = document.getElementById("cnv");

    W = Math.floor(0.95 * window.innerWidth);
    H = Math.floor((0.95 * window.innerHeight - (document.body.clientHeight - parseInt(cnv.height))));
    ORIGIN_X = Math.floor(W / 2);
    ORIGIN_Y = Math.floor(H / 3);

    cnv.setAttribute("width", W.toString());
    cnv.setAttribute("height", H.toString());
    document.body.appendChild(cnv);
    ctx = document.getElementById("cnv").getContext("2d");
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 2;

    // perform operation at regular interval
    interval = setInterval(function() {

        // only render pendulum if the simulation is running
        if(running) {
            dp.render(ctx, ORIGIN_X, ORIGIN_Y);
        }

    }, 1000 * TIME);

}

initDPDemo();

// function triggered by click event of button; either starts or stops double pendulum
function newDoublePendulum(e) {

    // if not currently running simulation, start it or resume
    if(!running) {

        // if any of the parameters have been edited since the last button press, create new double pendulum
        if(edited) {

            let l1 = parseInt(document.getElementById("len1").value);
            let m1 = parseInt(document.getElementById("mass1").value);
            let t1 = parseInt(document.getElementById("theta1").value);
            let l2 = parseInt(document.getElementById("len2").value);
            let m2 = parseInt(document.getElementById("mass2").value);
            let t2 = parseInt(document.getElementById("theta2").value);
            dp = new DoublePendulum(l1, l2, m1, m2, t1, t2);

        }

        // regardless of any edits, change button text to "Stop"
        document.getElementById("newDP").value = "Stop";

    }

    // if currently running, stop the simulation and change button text to "Start"
    else {
        document.getElementById("newDP").value = "Start";
    }

    // reset variable for tracking edits to parameters
    edited = false;
    // flip value of running variable
    running = !running;

}