# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("token-classification", model="yanekyuk/bert-keyword-extractor")