import requests
from flask import jsonify
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def captionize(url):
    img_url = url
    raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')

    # unconditional image captioning
    inputs = processor(raw_image, return_tensors="pt")

    out = model.generate(**inputs, max_new_tokens=32)

    caption = processor.decode(out[0], skip_special_tokens=True)

    print("Caption: ", caption)

    return caption