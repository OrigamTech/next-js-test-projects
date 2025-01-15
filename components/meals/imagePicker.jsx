"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const ImagePicker = ({ name, label }) => {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();
  const handlePickClick = () => {
    imageInput.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => setPickedImage(fileReader.result);
  };
  return (
    <div className="flex">
      <label htmlFor={name}>
        {label}
        <div className="flex flex-col">
          <div className="w-40 h-40 flex justify-center relative items-center">
            {!pickedImage && <p>No images has been picked yet!</p>}
            {pickedImage && (
              <Image className="object-contain" src={pickedImage} alt="image picked by the user" fill />
            )}
          </div>
          <input
            className="hidden"
            type="file"
            name={name}
            id={name}
            accept="image/png, image/jpeg"
            ref={imageInput}
            onChange={handleImageChange}
            required
          />
          <button
            onClick={handlePickClick}
            type="button"
            className="flex bg-orange-500 p-2 m-3"
          >
            Pick an Image
          </button>
        </div>
      </label>
    </div>
  );
};

export default ImagePicker;
