// Home.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import unsplash from "../api/unsplash";
import UploadImageForm from "../components/UploadForm/UploadForm";

interface Pin {
  urls: {
    regular: string;
  };
}

// Update UnsplashResponse interface
interface UnsplashResponse<T> {
  results: T;
}

const Upload: React.FC = () => {
  const [pins, setNewPins] = useState<Pin[]>([]);

  const getImages = (term: string) => {
    return unsplash.get<UnsplashResponse<Pin[]>>(
      "search/photos",
      // Adjust the endpoint based on your API structure
      {
        params: {
          query: term,
        },
      }
    );
  };

  const onSearchSubmit = (term: string) => {
    getImages(term).then((res) => {
      // Ensure 'res.data.results' exists and is an array before using it
      let newPins = Array.isArray(res.data.results)
        ? [...res.data.results, ...pins]
        : [...pins];

      newPins.sort(() => 0.5 - Math.random());
      setNewPins(newPins);
    });
  };

  const getNewPins = () => {
    let promise: Promise<void>[] = [];
    let pinData: Pin[] = [];

    let pins = ["dogs", "cats", "still life", "fasion", "clouds"];

    pins.forEach((pinTerm) => {
      promise.push(
        getImages(pinTerm).then((res) => {
          // Ensure 'res.data.results' exists and is an array before using it
          if (Array.isArray(res.data.results)) {
            pinData = pinData.concat(res.data.results);
            pinData.sort(() => 0.5 - Math.random());
          }
        })
      );
    });

    Promise.all(promise).then(() => {
      setNewPins(pinData);
    });
  };

  useEffect(() => {
    getNewPins();
  }, []);

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      <UploadImageForm />
    </>
  );
};

export default Upload;
