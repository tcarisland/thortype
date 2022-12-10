export type CanvasSize = {
    width: number,
    height: number
}

export const sizes: CanvasSize[] = [
    { width: 3000, height: 2000 },
    { width: 2400, height: 1600 },
    { width: 1800, height: 1200 },
    { width: 1500, height: 1000 },
    { width: 1200, height: 800 },
    { width: 900, height: 600 },
    { width: 600, height: 400 },
    { width: 300, height: 200 },
    { width: 150, height: 100 },
]

export const toCanvasSize = function(size: CanvasSize): CanvasSize {
    console.log({"size": size});
    let canvasSize: CanvasSize | undefined = sizes.filter(s => { 
        return ((size.width / 1.2) > s.width)
    })?.at(0);
    console.log({"canvasSize": canvasSize});
    return canvasSize ? canvasSize : sizes[3];
}
