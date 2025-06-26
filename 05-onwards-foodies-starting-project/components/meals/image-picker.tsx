'use client';

import classes from './image-picker.module.css';
import {ChangeEvent, useRef, useState} from "react";
import Image from "next/image";

type ImagePickerProps = {
  label:string;
  name:string;
}

export default function ImagePicker({label, name}: ImagePickerProps){
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  function handleImagePick(): void {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>){
    const files = event.target.files;
    if (!files || files.length === 0) {
      setPickedImage(null);
      return;
    }

    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleImagePick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}