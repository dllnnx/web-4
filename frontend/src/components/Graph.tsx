import React, {useEffect, useRef} from "react";
import GraphPainter from "./GraphPainter";

export default function Graph({width, height}: {width: number, height: number}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!canvasRef?.current?.getContext('2d')) return
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx == null) return
        const graphPainter = new GraphPainter(canvas, ctx, 3, undefined, (x, y, r) => console.log(x, y, r));
        graphPainter.redrawAll(3);
    });
    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onClick={() => console.log("clicked!")}
            />
    )
}