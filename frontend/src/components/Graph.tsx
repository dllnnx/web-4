import React, {useEffect, useRef, useState} from "react";
import GraphPainter from "./GraphPainter";

interface GraphProps {
    width: number;
    height: number;
    radius: number;
    onAddResult: (result: any) => void;
    token: string | null;
}

export default ({width, height, radius, onAddResult, token}: GraphProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [points, setPoints] = useState<any[]>([]);
    const graphPainter = new GraphPainter(canvasRef.current, canvasRef.current?.getContext('2d'), radius);

    useEffect(() => {
        if (!canvasRef?.current?.getContext('2d')) return
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx == null) return
        const graphPainter = new GraphPainter(canvas, ctx, radius);
        graphPainter.redrawAll(radius);
    }, [radius]);

    // загрузка точек
    const fetchPoints = async () => {
        if (!token) return;

        try {
            const url = `http://localhost:24147/backend/api/results`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPoints(data);
            } else {
                console.error(`Ошибка загрузки точек: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Ошибка при запросе точек: ${error}`);
        }
    };

    const drawGraph = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const graphPainter = new GraphPainter(canvas, ctx, radius);

        graphPainter.redrawAll(radius);

        points.forEach((point) => {
            graphPainter.drawPoint(
                point.x,
                point.y,
                radius,
                point.isHit
            );
        });
    };

    useEffect(() => {
        fetchPoints();
    }, []);

    useEffect(() => {
        drawGraph();
    }, [radius, points]);

    const handleCanvasClick = async (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const pointInPixels = 300 / 12;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const xPixels = event.clientX - rect.left;
        const yPixels = event.clientY - rect.top;

        const x = ((xPixels - centerX) / pointInPixels).toFixed(2);
        const y = ((centerY - yPixels) / pointInPixels).toFixed(2);

        if (parseFloat(x) > 5 || parseFloat(x) < -3 || parseFloat(y) > 3 || parseFloat(y) < -3) {
            alert("Клик вне зоны графика. -3<= x <= 5, -3 <= y <= 3");
            return;
        }

        try {
            const url = `http://localhost:24147/backend/api/results`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ x: parseFloat(x), y: parseFloat(y), r: radius }),
            });

            if (response.ok) {
                const data = await response.json();
                graphPainter.drawPoint(data.x, data.y, radius, data.isHit === true);
                onAddResult(data);
            } else {
                console.error(`Ошибка: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Произошла ошибка: ${error}`);
        }
    };
    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onClick={handleCanvasClick}
            />
    )
}