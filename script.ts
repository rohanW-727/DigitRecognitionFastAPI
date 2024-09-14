const canvas = document.getElementById('digit-canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
let drawing: boolean = false;


canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if(!drawing) return;
    ctx.fillStyle = 'black'
    ctx.fillRect(event.offsetX, event.offsetY, 8, 8);
}

function clearCanvas() {
    const canvas = document.getElementById('digit-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById('predicted-digit')!.innerText = 'Predicted Digit: '
}

async function predict() {
    const smallCanvas = document.createElement('canvas')
    document.body.appendChild(smallCanvas);
    smallCanvas.width = 28
    smallCanvas.height = 28
    smallCanvas.getContext('2d')?.drawImage(canvas,0,0,280,280,0,0,28,28);
    const imageData = smallCanvas.getContext('2d')!.getImageData(0,0,28,28);

    const imageArray: number[] = [];
    for(let i = 0; i < imageData.data.length; i += 4) {
        const avg: number = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2])/ 3;
        imageArray.push(avg / 255.0)
    }

    try {
        const response = await fetch('/predict', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({image: imageArray})
        })
        const result = await response.json();
        document.getElementById('predicted-digit')!.innerText = `Predicted Digit: ${result.prediction}`
        

    }catch(error) {
        console.log("Error cannot predict Digit")
    }



}


document.getElementById('digit-form')?.addEventListener('submit', (event) => {
    event.preventDefault() // prevents the form's default behavior
});

