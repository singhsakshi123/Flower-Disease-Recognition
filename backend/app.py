from flask import Flask, redirect, render_template, request, session, jsonify
import os
from hashlib import sha512
import uuid
import cv2
import pandas as pd
import numpy as np
import tensorflow_hub as hub
from tensorflow.keras.models import load_model
import pickle
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
flower_model_path = "./flower_model.h5"
flower_model = load_model(
    flower_model_path, custom_objects={"KerasLayer": hub.KerasLayer}
)

rose_model_path = "./rose_model.h5"
rose_model = load_model(
    rose_model_path, custom_objects={"KerasLayer": hub.KerasLayer}
)

sunflower_model_path = "./sunflower_model.h5"
sunflower_model = load_model(
    sunflower_model_path, custom_objects={"KerasLayer": hub.KerasLayer}
)


@app.route("/")
def home():
    return "Hello"

@app.route("/image/upload", methods=["GET", "POST"])
def image_upload():
    print("TEST")
    if request.method == "POST":
        print("TEST")
        try:
            print(request.files["file"])
            file = request.files["file"]
            file_extension = os.path.splitext(file.filename)[1]
            file_name = str(file.filename) + uuid.uuid4().hex
            file_name = file_name.encode("utf-8")
            hash_filename = sha512(file_name).hexdigest() + str(file_extension)
            file.save(os.path.join("images", hash_filename))
            img_test = cv2.imread(os.path.join("images", hash_filename))
            # print(img_test)
            # img_test1 = "C:/Users/saksh/OneDrive/Desktop/Projects/Flower-Disease-Recognition/Data/Daisy_Disease/Gray_Mold_(2).png"
            img_resize = cv2.resize(img_test, (224, 224))
            img_scaled = img_resize / 255
            img_reshaped = np.reshape(img_scaled, [1, 224, 224, 3])
            input_pred = flower_model.predict(img_reshaped)
            input_label = np.argmax(input_pred)
            print(input_label)
            val = "ROSE"
            val2 = ""
            if input_label == 0:
                val = "ROSE"
            elif input_label == 1:
                val = "SUNFLOWER"
            if(val == "ROSE"):
                input_pred1 = rose_model.predict(img_reshaped)
                input_label1 = np.argmax(input_pred1)
                if(input_label1 == 0):
                    val2 = "Healthy"
                if(input_label1 == 1):
                    val2 = "Powdery Mildew"
            elif(val == "SUNFLOWER"):
                input_pred3 = sunflower_model.predict(img_reshaped)
                input_label3 = np.argmax(input_pred3)
                if(input_label3 == 0):
                    val2 = "Healthy"
                if(input_label3 == 1):
                    val2 = "Aster Yellow"
            print(val,val2)
            return [val,val2]
        except Exception as e:
            print(e)
            return jsonify({'message': 'Running on port '})
    else:
        return jsonify({'message': 'Running'})
    
app.run(debug=True)