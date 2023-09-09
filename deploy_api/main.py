from typing import List, Tuple

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from transformers import BertTokenizer

from model import Model
from model_onnx import create_onnx_session, onnx_inference


app = FastAPI()
model_level = Model("rubert-CB-6536")
model_cat = Model("rubert-CB-cat-7779")
sess_cat = create_onnx_session("rubert-CB-cat-7764/onnx_model.bin")
tokizer_cat = BertTokenizer.from_pretrained('rubert-CB-cat-7764')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Text(BaseModel):
    text: str


class TextPredict(BaseModel):
    level: str
    cat: str


class WordWeigth(BaseModel):
    probabilities: List[Tuple[str, float]]


@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse('favicon.ico')


@app.post("/predict", response_model=TextPredict)
def predict(request: Text):
    return TextPredict(
        level=model_level.predict(request.text),
        cat=model_cat.predict(request.text)
    )


@app.get("/predict/{text}", response_model=TextPredict)
def predict(text: str):
    return TextPredict(
        level=model_level.predict(text),
        cat=model_cat.predict(text)
    )


@app.post("/word_weigth", response_model=WordWeigth)
def word_weigth(request: Text):
    text = request.text
    sample_col_tokens = text.split()
    result = np.zeros((len(sample_col_tokens), 7), np.float32)

    for drop_i in range(len(sample_col_tokens)):
        tmp_text = ' '.join(tokizer_cat.unk_token if i == drop_i else tok
                            for i, tok in enumerate(sample_col_tokens))
        result[drop_i] = onnx_inference(tmp_text, sess_cat, tokizer_cat, 512)

    base_result = onnx_inference(text, sess_cat, tokizer_cat, 512)[0]
    predicted_class_id: int = base_result.argmax()
    diffs = base_result[predicted_class_id] - result[:, predicted_class_id]
    return WordWeigth(
        probabilities=list(zip(sample_col_tokens, diffs))
    )
