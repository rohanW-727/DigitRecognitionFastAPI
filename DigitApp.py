from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List
import numpy as np
from tensorflow.keras.models import load_model


model = load_model('/Users/rohanwadhwa/Desktop/mnist_model.keras')
templates = Jinja2Templates(directory="Templates")


app = FastAPI()
app.mount("/static", StaticFiles(directory = "static"), name="static")

class ImageData(BaseModel):
    image: List[float]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
    



@app.post('/predict', response_class=HTMLResponse)
async def predict(data: ImageData):
    image = np.array(data.image, dtype=np.float32).reshape(1,28,28,1) 
    print("Recieved Data Image: ", image)
    prediction = model.predict(image)
    probabilities = prediction[0]
    
    predicted_digit = np.argmax(probabilities).item() # Converts it into a native python int
    probabilities_list = probabilities.astype(float).tolist() #converts it into a list of float numbers
    
    return JSONResponse({
        'prediction': predicted_digit,
        'probabilities': probabilities_list 
    })
    



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
