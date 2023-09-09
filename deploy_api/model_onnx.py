import numpy as np
import onnxruntime
from onnxruntime import (
    InferenceSession,
    SessionOptions
)
from transformers import BertConfig, BertTokenizer


def create_onnx_session(
        model_path: str,
        provider: str = "CPUExecutionProvider"
) -> InferenceSession:
    """Создание сессии для инференса модели с помощью ONNX Runtime.

    @param model_path: путь к модели в формате ONNX
    @param provider: инференс на ЦП
    @return: ONNX Runtime-сессия
    """
    options = SessionOptions()
    options.graph_optimization_level = \
        onnxruntime.GraphOptimizationLevel.ORT_ENABLE_ALL
    session = InferenceSession(model_path, options, providers=[provider])
    session.disable_fallback()
    return session


def onnx_inference(
        text: str,
        session: InferenceSession,
        tokenizer: BertTokenizer,
        max_length: int = 256
) -> np.ndarray:
    """Инференс модели с помощью ONNX Runtime.

    @param text: входной текст для классификации
    @param session: ONNX Runtime-сессия
    @param tokenizer: токенизатор
    @param max_length: максимальная длина последовательности в токенах
    @return: логиты на выходе из модели
    """
    inputs = tokenizer(
        text,
        padding="max_length",
        truncation=True,
        max_length=max_length,
        return_tensors="np",
    )
    input_feed = {
        "input_ids": inputs["input_ids"].astype(np.int64)
    }
    outputs = session.run(
        output_names=["output"],
        input_feed=input_feed
    )[0]
    return outputs


config = BertConfig.from_pretrained('rubert-CB-cat-7764')


def y_pred2class(y_pred: np.ndarray) -> str:
    return config.id2label[y_pred.argmax()]
