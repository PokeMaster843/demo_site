// double pendulum object
function DoublePendulum(l1, l2, m1, m2, t1, t2) {

    this.l1 = l1;
    this.l2 = l2;
    this.m1 = m1;
    this.m2 = m2;
    this.t1 = t1;
    this.t2 = t2;

    // will be used in calculations frequently, so calculate ahead of time
    this.m12 = this.m1 + this.m2;

    // initialize all higher order derivatives to 0
    this.dt1 = 0;
    this.dt2 = 0;
    this.p1 = 0;
    this.p2 = 0;
    this.dp1 = 0;
    this.dp2 = 0;

    // trackers for first and second pendulum
    this.tracker1 = new Tracker(0, 0, 255);
    this.tracker2 = new Tracker(255, 0, 0);

}

Object.assign(DoublePendulum.prototype, {

    // constructor: accepts length, mass, and initial angle parameters for each of the two rods
    constructor: DoublePendulum,

    // updates double pendulum system over some small slice of time (from TIME constant above)
    update: function() {

        /*

        mass moment of inertia of rod about end: 1/3 * m * L^2

        s12 = sin(t1 - t2)
        c12 = cos(t1 - t2)
        m12 = m1 + m2
        det = l1 * l2 * (m1 + m2 * s12^2)

        dt1 = (l2 * p1 - l1 * p2 * c12) / (l1 * det)
        dt2 = (l1 * m12 * p2 - l2 * m2 * p1 * c12) / (l2 * det)

        dp1 = -m12 * g * l1 * sin(t1) -C1 + C2
        dp2 = -m2 * g * l2 * sin(t2) + C1 - C2

        C1 = (p1 * p2 * s12) / det
        C2 = sin(2*(t1 - t2)) * (l2^2 * m2 * p1^2 + l1^2 * m12 * p2^2 - l1 * l2 * m2 * p1 * p2 * c12) / (2 * det^2)

         */

        // frequently used calculations; stored in variables to reduce load
        let s12 = Math.sin(this.t1 - this.t2);
        let c12 = Math.cos(this.t1 - this.t2);
        let det = this.l1 * this.l2 * (this.m1 + this.m2 * s12 * s12);
        let c1 = (this.p1 * this.p2 * s12) / det;
        let c2 = Math.sin(2 * (this.t1 - this.t2)) * (this.l2 * this.l2 * this.m2 * this.p1 * this.p1 + this.l1 * this.l1 * this.m12 * this.p2 * this.p2 - this.l1 * this.l2 * this.p1 * this.p2 * c12) / (2 * det * det);

        // calculate time derivative of theta 1, theta 2, momentum 1, momentum 2
        this.dt1 = (this.l2 * this.p1 - this.l1 * this.p2 * c12) / (this.l1 * det);
        this.dt2 = (this.l1 * this.m12 * this.p2 - this.l2 * this.m2 * this.p1 * c12) / (this.l2 * det);
        this.dp1 = -this.m12 * g * this.l1 * Math.sin(this.t1) - c1 + c2;
        this.dp2 = -this.m2 * g * this.l2 * Math.sin(this.t2) + c1 - c2;

        // step values for one unit of TIME
        this.t1 += this.dt1 * TIME;
        this.t2 += this.dt2 * TIME;
        this.p1 += this.dp1 * TIME;
        this.p2 += this.dp2 * TIME;

    },

    // render the double pendulum and tracked path of both rod's ends
    render: function() {

        // update pendulum
        this.update();

        // clear canvas before drawing
        ctx.clearRect(0, 0, W, H);
        // move and scale end points of pendulum rods
        let x1 = ORIGIN_X + this.l1 * SCALE * Math.sin(this.t1);
        let y1 = ORIGIN_Y + this.l1 * SCALE * Math.cos(this.t1);
        let x2 = x1 + this.l2 * SCALE * Math.sin(this.t2);
        let y2 = y1 + this.l2 * SCALE * Math.cos(this.t2);
        // add points to trackers
        this.tracker1.add([x1, y1]);
        this.tracker2.add([x2, y2]);
        // draw trails
        this.tracker1.drawFaded(ctx);
        this.tracker2.drawFaded(ctx);

        // change strokeStyle to solid black for pendulum, then draw it
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(ORIGIN_X, ORIGIN_Y);
        ctx.lineTo(x1, y1);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

    }

});