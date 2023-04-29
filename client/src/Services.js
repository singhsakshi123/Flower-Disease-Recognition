import React, { useState } from "react";
import "./Services.css";

function Service() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [predictedFlowerDisease, setPredictedFlowerDisease] = useState("");
  const [perdictedFlower, setPerdictedFlower] = useState("");
  const [imageSrc, setImageSrc] = useState('');

  const changeHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("http://localhost:5000/image/upload", {
      method: "POST",
      body: formData,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      //.then((response) => console.log("Response", response))
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setPredictedFlowerDisease(result[1]);
        setPerdictedFlower(result[0]);
      })
      .catch((error) => {
        console.error("Error React:", error);
      });
    setIsSubmitted(true);
  };

  // const previewImage = (event) => {

  //   const imageFiles = event.target.files;

  //   const imageFilesLength = imageFiles.length;

  //   if (imageFilesLength > 0) {

  //     const imageSrc = URL.createObjectURL(imageFiles[0]);

  //     const imagePreviewElement = document.querySelector("#preview-selected-image");

  //     imagePreviewElement.src = imageSrc;

  //     imagePreviewElement.style.display = "block";
  //   }
  // };
  return (
    <>
      <div className="service component__space" id="Services">
        <div className="heading">
          <h1 className="heading">Our Service</h1>
          <p className="heading p__color">Detect the Flower and Disease it has</p>
          <p className="heading p__color"></p>
        </div>

        <div className="container">
          <div className="row">
            <img src={imageSrc} className="flower" />
            <div className="col__3">
              {/* <div className="image-preview-container">
                <div class="preview">
                  <img id="preview-selected-image" src={imageSrc} /> 
                </div> */}
              <input
                type="file"
                name="File"
                id="fileUp"
                hidden
                onChange={changeHandler}
              // onClick={previewImage}
              />
              <label htmlFor="fileUp">
                <div className="service__box pointer">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      align="center"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">Upload Image</h1>
                    <p className="p service__text p__color">
                      Upload the Image of the Flower that has
                    </p>
                    <p className="p service__text p__color">
                      to be Tested for Detection.
                    </p>
                  </div>
                </div>
              </label>
              <button
                onClick={handleSubmission}
                style={{
                  fontSize: 20,
                  backgroundColor: "#f9004d",
                  padding: "15px 32px",
                  margin: 0,
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Submit
              </button>
              {isSubmitted ? (
                <div>
                  <h1
                    style={{
                      textAlign: "center",
                      paddingTop: 20,
                      fontSize: 30,
                    }}
                  >
                    Prediction
                  </h1>
                  <h1
                    style={{
                      textAlign: "center",
                      paddingTop: 2,
                      fontSize: 30,
                      fontfamily: "Times New Roman",
                      backgroundColor: "#f9004d",
                    }}
                  >
                    {perdictedFlower}
                    <br />
                    {predictedFlowerDisease}
                  </h1>
                </div>
              ) : (
                <></>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>

  );
}


export default Service;
