export default class GraphPainter {
    SIZE = 300;
    LINE_WIDTH = 1.5;
    TEXT_MARGIN = 15;
    TEXT_LINE_HEIGHT = 3;
    COLOR_RED = "#b50300"
    COLOR_GREEN = "#00b509"
    COLOR_MAIN = "#9999CC"
    WIDTH_IN_POINTS = 12;

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    r: number | undefined
    dots: Array<number> | undefined // TODO: change to array of objects
    fetchCoordinates: (x: number, y: number, r: number) => void

    constructor(canvas: HTMLCanvasElement,
                context: CanvasRenderingContext2D,
                r: number | undefined,
                dots: Array<number> | undefined,
                fetchCoordinates: (x: number, y: number, r: number) => void
                ) {
        this.canvas = canvas;
        this.ctx = context;
        this.r = r;
        this.dots = dots;
        this.fetchCoordinates = fetchCoordinates;
    }

    redrawAll(r: number){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGraph(r);
        this.drawAxes();
        this.setPointerAtDot(3);
        this.setPointerAtDot(1);
        this.setPointerAtDot(-1)
        this.setPointerAtDot(2)
        this.setPointerAtDot(-2)
        this.setPointerAtDot(5)
        this.setPointerAtDot(-5)
        // this.drawPoints();
    }

    drawAxes() {
        this.ctx.fillStyle = "#666666";
        this.drawArrow(-this.SIZE, this.SIZE / 2, this.SIZE, this.SIZE / 2);
        this.drawArrow( this.SIZE / 2, this.SIZE, this.SIZE / 2, 0);
    }

    drawGraph(r: number){
        const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS;
        this.ctx.fillStyle = this.COLOR_MAIN;

        this.ctx.fillRect(
            this.SIZE / 2,
            this.SIZE / 2 - r * pointInPixels,
            r * pointInPixels,
            r * pointInPixels
        );

        this.ctx.beginPath();
        this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + r * pointInPixels);
        this.ctx.lineTo(this.SIZE / 2 + r * pointInPixels, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(
            this.SIZE / 2,
            this.SIZE / 2,
            r / 2 * pointInPixels,
            Math.PI,
            3 / 2 * Math.PI
        );
        this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - r / 2 * pointInPixels);
        this.ctx.lineTo(this.SIZE / 2 - r / 2 * pointInPixels, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.fill();
    }

    setPointerAtDot(max_r = 5) {
        const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`${max_r}`, this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_MARGIN);
        this.ctx.fillText(`${max_r}`, this.SIZE / 2 + this.TEXT_MARGIN, this.SIZE / 2 - pointInPixels * max_r);

        this.ctx.beginPath()
        this.ctx.lineWidth = this.LINE_WIDTH;
        this.ctx.moveTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
        this.ctx.lineTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
        this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
        this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
        this.ctx.stroke();
    }

    drawArrow(fromx, fromy, tox, toy) {
        let headlen = 10; // length of head in pixels
        let dx = tox - fromx;
        let dy = toy - fromy;
        let angle = Math.atan2(dy, dx);
        this.ctx.strokeStyle = "#666666";
        this.ctx.beginPath();
        this.ctx.lineWidth = this.LINE_WIDTH;
        this.ctx.moveTo(fromx, fromy);
        this.ctx.lineTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    // parseClick(event){
    //     const xPixels = event.clientX - this.canvas.getBoundingClientRect().left;
    //     const yPixels = event.clientY - this.canvas.getBoundingClientRect().top;
    //     const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS;
    //     const x = (- (this.SIZE / 2 - xPixels) / pointInPixels).toFixed(4)
    //     const y = ((this.SIZE / 2 - yPixels) / pointInPixels).toFixed(4)
    //
    //     if(x > 2 || x < -2 || y > 3 || y < -3) {
    //         Swal.fire({
    //             title: 'Клик вне зоны графика',
    //             text: 'X принимает значения от -2 до 2, Y от -3 до 3',
    //             icon: 'warning'
    //         });
    //         return
    //     }
    //
    //     if(!this.lastClickedR) {
    //         Swal.fire({
    //             title: 'Невозможно определить радиус',
    //             text: 'Выберите радиус',
    //             icon: 'warning'
    //         });
    //         return
    //     }
    //
    //     addAttempt(
    //         [
    //             { name: "x", value: x.toString() },
    //             { name: "y", value: y.toString() },
    //             { name: "r", value: this.lastClickedR.toString() }
    //         ]
    //     )
    //
    //     updateGraph();
    // }

    // drawPoints(){
    //     let arrData = [];
    //     $(".main-table tr").each(function(){
    //         let currentRow=$(this);
    //         arrData.push({
    //             "x": parseFloat(currentRow.find("td:eq(0)").text()),
    //             "y": parseFloat(currentRow.find("td:eq(1)").text()),
    //             "r": parseFloat(currentRow.find("td:eq(2)").text()),
    //             "status": currentRow.find("td:eq(3)").text() === "yes!",
    //             "time": currentRow.find("td:eq(4)").text(),
    //             "scriptTime": currentRow.find("td:eq(5)").text()
    //         })
    //     });
    //     arrData.shift() // Delete headers
    //     arrData.forEach(dot =>{
    //         graphPainter.drawPoint(dot.x, dot.y, dot.r, dot.status)
    //     })
    // }

    drawPoint(x: number, y: number, r: number, success = true) {
        const totalPoints = 12;
        let r_now = this.r;
        if(r_now != null) {
            x *= r_now / r
            y *= r_now / r

        }
        this.ctx.fillStyle = success
            ? this.COLOR_GREEN
            : this.COLOR_RED;
        const pointInPixels = this.SIZE / totalPoints;
        this.ctx.beginPath();
        this.ctx.arc(
            this.SIZE / 2 + pointInPixels * x,
            this.SIZE / 2 - y * pointInPixels,
            5,
            0,
            Math.PI * 2,
        );
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "black"
        this.ctx.lineWidth = 1.5
        this.ctx.arc(
            this.SIZE / 2 + pointInPixels * x,
            this.SIZE / 2 - y * pointInPixels,
            5,
            0,
            Math.PI * 2
        )
        this.ctx.stroke();
    }
}