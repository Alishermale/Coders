import torch
from transformers import BertForSequenceClassification, BertTokenizer


class Model:
    def __init__(self, model_path: str) -> None:
        model = BertForSequenceClassification.from_pretrained(model_path)
        model = model.eval()
        self.model = model.to("cpu")
        self.tokenizer = BertTokenizer.from_pretrained(model_path)

    def predict(self, text: str) -> str:
        inputs = self.tokenizer(text, return_tensors="pt")
        with torch.no_grad():
            logits = self.model(**inputs).logits
        predicted_class_id = logits.argmax().item()
        return self.model.config.id2label[predicted_class_id]

    def word_weigth(self, text: str):
        sample_col_tokens = text.split()
        data_drop_one_token = [text] * (len(sample_col_tokens) + 1)

        for drop_i in range(len(sample_col_tokens)):
            data_drop_one_token[drop_i] = ' '.join(self.tokenizer.unk_token if i == drop_i else tok
                                                   for i, tok in enumerate(sample_col_tokens))

        x_tmp = self.tokenizer(
            data_drop_one_token,
            return_tensors="pt",
            max_length=256,
            padding='max_length',
            truncation=True
        )

        with torch.no_grad():
            *predictions_drop_one_token, baseline_pred = self.model(**x_tmp).logits

        predicted_class_id: int = baseline_pred.argmax().item()
        predictions_drop_one_token = torch.stack(predictions_drop_one_token)
        diffs = baseline_pred[predicted_class_id] - predictions_drop_one_token[:, predicted_class_id]
        return list(zip(sample_col_tokens, diffs))
