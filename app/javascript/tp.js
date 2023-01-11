// constants used in program
/*const g = 9.807;
const TIME = 1 / 60;
const W = Math.floor(window.innerWidth * 0.9), H = Math.floor(window.innerHeight * 0.8);
const ORIGIN_X = Math.floor(W / 2);
const ORIGIN_Y = Math.floor(H / 3);
const SCALE = 100;

// variable used to store context of canvas for drawing
let ctx = null;
// triple pendulum object
let tp = null;
// variables used for manipulating double pendulum
let running = false;
let edited = false;
// on load of body, create canvas element and append it to the window
document.body.onload = initTPDemo;

// initialize canvas and other elements, and add to document
function initTPDemo() {

    const ll1 = document.createElement("label");
    ll1.for = "len1";
    ll1.innerText = "Length 1";
    const len1 = document.createElement("input");
    len1.id = "len1";
    len1.type = "number";
    len1.addEventListener("change", () => { edited = true; });
    document.body.appendChild(ll1);
    document.body.appendChild(len1);

    const lm1 = document.createElement("label");
    lm1.for = "mass1";
    lm1.innerText = "Mass 1";
    const mass1 = document.createElement("input");
    mass1.id = "mass1";
    mass1.type = "number";
    mass1.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lm1);
    document.body.appendChild(mass1);

    const lt1 = document.createElement("label");
    lt1.for = "theta1";
    lt1.innerText = "Theta 1";
    const theta1 = document.createElement("input");
    theta1.id = "theta1";
    theta1.type = "number";
    theta1.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lt1);
    document.body.appendChild(theta1);
    document.body.appendChild(document.createElement("br"));

    const ll2 = document.createElement("label");
    ll2.for = "len2";
    ll2.innerText = "Length 2";
    const len2 = document.createElement("input");
    len2.id = "len2";
    len2.type = "number";
    len2.addEventListener("change", () => { edited = true; });
    document.body.appendChild(ll2);
    document.body.appendChild(len2);

    const lm2 = document.createElement("label");
    lm2.for = "mass2";
    lm2.innerText = "Mass 2";
    const mass2 = document.createElement("input");
    mass2.id = "mass2";
    mass2.type = "number";
    mass2.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lm2);
    document.body.appendChild(mass2);

    const lt2 = document.createElement("label");
    lt2.for = "theta2";
    lt2.innerText = "Theta 2";
    const theta2 = document.createElement("input");
    theta2.id = "theta2";
    theta2.type = "number";
    theta2.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lt2);
    document.body.appendChild(theta2);
    document.body.appendChild(document.createElement("br"));

    const ll3 = document.createElement("label");
    ll3.for = "len3";
    ll3.innerText = "Length 3";
    const len3 = document.createElement("input");
    len3.id = "len3";
    len3.type = "number";
    len3.addEventListener("change", () => { edited = true; });
    document.body.appendChild(ll3);
    document.body.appendChild(len3);

    const lm3 = document.createElement("label");
    lm3.for = "mass3";
    lm3.innerText = "Mass 3";
    const mass3 = document.createElement("input");
    mass3.id = "mass3";
    mass3.type = "number";
    mass3.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lm3);
    document.body.appendChild(mass3);

    const lt3 = document.createElement("label");
    lt3.for = "theta3";
    lt3.innerText = "Theta 3";
    const theta3 = document.createElement("input");
    theta3.id = "theta3";
    theta3.type = "number";
    theta3.addEventListener("change", () => { edited = true; });
    document.body.appendChild(lt3);
    document.body.appendChild(theta3);

    const submitBtn = document.createElement("input");
    submitBtn.id = "newDP";
    submitBtn.type = "button";
    submitBtn.value = "Start";
    submitBtn.addEventListener("click", newDoublePendulum);
    document.body.appendChild(submitBtn);

    const cnv = document.createElement("canvas");
    cnv.id = "cnv";
    ctx = cnv.getContext("2d");

    cnv.setAttribute("width", W.toString());
    cnv.setAttribute("height", H.toString());
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, W, H);
    document.body.appendChild(cnv);
    ctx = document.getElementById("cnv").getContext("2d");
    ctx.lineWidth = "3";

}*/

class TriplePendulum {

    constructor(l1, l2, l3, m1, m2, m3, t1, t2, t3) {

        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
        this.m1 = m1;
        this.m2 = m2;
        this.m3 = m3;
        this.t1 = t1;
        this.t2 = t2;
        this.t3 = t3;

        this.m123 = m1 + m2 + m3;
        this.m23 = m2 + m3;

        this.l12 = l1 * l2;
        this.l13 = l1 * l3;
        this.l123 = l1 * l2 * l3;
        this.l23 = l2 * l3;

        this.dt1 = 0;
        this.dt2 = 0;
        this.dt3 = 0;
        this.p1 = 0;
        this.p2 = 0;
        this.p3 = 0;
        this.dp1 = 0;
        this.dp2 = 0;
        this.dp3 = 0;

    }

    update() {

        let a, b, c, e, f, i;
        let c12 = Math.cos(this.t1 - this.t2), c13 = Math.cos(this.t1 - this.t3), c23 = Math.cos(this.t2 - this.t3);
        let p12 = this.p1 * this.p2, p13 = this.p1 * this.p3, p23 = this.p2 * this.p3;

        a = this.m3 * this.l23 * this.l23 * (this.m23 - this.m3 * c23 * c23);
        b = this.m3 * this.l123 * this.l3 * (-this.m23 * c12 + this.m3 * c13 * c23);
        c = this.m23 * this.m3 * this.l123 * this.l2 * (c12 * c23 - c13);
        e = this.m3 * this.l13 * this.l13 * (this.m123 - this.m3 * c13 * c13);
        f = this.m3 * this.l123 * this.l1 * (-this.m123 * c23 + this.m23 * c12 * c13);
        i = this.m23 * this.l12 * this.l12 * (this.m123 - this.m23 * c12 * c12);

        let det = 1 / (a * (e * i - f * f) - b * (b * i - c * f) + c * (b * f - e * c));

        let aa = e * i - f * f, bb = c * f - b * i, cc = b * f - c * e;
        let ee = a * i - c * c, ff = b * c - a * f;
        let ii = a * e - b * b;

        this.dt1 = (aa * this.p1 + bb * this.p2 + cc * this.p3) * det;
        this.dt2 = (bb * this.p1 + ee * this.p3 + ff * this.p3) * det;
        this.dt3 = (cc * this.p1 + ff * this.p2 + ii * this.p3) * det;

        /*

        H = dt_i * p_i - L
        d aa
        ------  = m23 * m3 * l123 * l123 * l1 * l1 * [ d/dt_1 (m123 - m3 * c13 * c13)(m123 - m23 * c12 * c12) ] - (m3 * l123 * l1)^2 * [ d/dt_1 (-m123 * c23 + m23 * c12 * c13)^2 ]
        d t_1

        [1] = d/dt_1 (m123 * m123 - m123 * (m3 * c13 * c13 + m23 * c12 * c12) + m3 * m23 * c12 * c12 * c13 * c13)
            = -m123 * m3 * sin(2*(t1-t3)) - m123 * m23 * sin(2*(t1-t2)) - m3 * m23 * (sin(2*(t1-t2)) * c13 + c12 * sin(2*(t1-t3)))
        [2] = 2*(-m123 * c23 + m23 * c12 * c13) * d/dt_1 (-m123 * c23 + m23 * c12 * c13)
            = -2 * m23 * (-m123 * c23 + m23 * c12 * c13) * (s12 * c13 + c12 * s13)

        daa/dt_1 = -m3 * m23 * l123 * l123 * l1 * l1 * (m123 * m3 * sin(2*(t1-t3)) + m123 * m23 * sin(2*(t1-t2)) + m3 * m23 * (sin(2*(t1-t2)) * c13 + c12 * sin(2*(t1-t3))) + 2 * m3 * (-m123 * c23 + m23 * c12 * c13) * (s12 * c13 + c12 * s13))

        [1] = d/dt_2 (m123 * m123 - m123 * (m3 * c13 * c13 + m23 * c12 * c12) + m3 * m23 * c12 * c12 * c13 * c13)
            = m23 * (m123 * m23 * sin(2*(t1-t2)) - m3 * sin(2*(t1-t2)) * c13 * c13)
        [2] = 2*(-m123 * c23 + m23 * c12 * c13) * d/dt_2 (-m123 * c23 + m23 * c12 * c13)
            = 2*(-m123 * c23 + m23 * c12 * c13) * (m123 * s23 - m23 * s12 * c13)

        daa/dt_2 = m3 * l123 * l123 * l1 * l1 * (m23 * (m23 * (m123 * m23 * sin(2*(t1-t2)) - m3 * sin(2*(t1-t2)) * c13 * c13)) - m3 * (2*(-m123 * c23 + m23 * c12 * c13) * (m123 * s23 - m23 * s12 * c13)))

        [1] = d/dt_3 (m123 * m123 - m123 * (m3 * c13 * c13 + m23 * c12 * c12) + m3 * m23 * c12 * c12 * c13 * c13)
            = -m123 * m3 * sin(2*(t1-t3)) + m3 * m23 * c12 * c12 * sin(2*(t1-t3))
        [2] = 2*(-m123 * c23 + m23 * c12 * c13) * d/dt_3 (-m123 * c23 + m23 * c12 * c13)
            = 2*(-m123 * c23 + m23 * c12 * c13) * (-m123 * s23 + m23 * c12 * s13)

        daa/dt_3 = m3 * m3 * l123 * l123 * l1 * l1 * (m23 * (-m123 * sin(2*(t1-t3)) + m23 * c12 * c12 * sin(2*(t1-t3))) - 2*(-m123 * c23 + m23 * c12 * c13) * (-m123 * s23 + m23 * c12 * s13))

         */

    }

}