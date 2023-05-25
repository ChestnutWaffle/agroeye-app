import { createContext, useContext, useState } from "react";

export const ImageUriContext = createContext<{
  imageUri: string;
  imageBase64: string;
  updateUriAndBase64: (uri: string, base64: string) => void;
}>({
  imageUri: "",
  imageBase64: "",
  updateUriAndBase64: (uri: string, base64: string) => {},
});

export const ImageUriProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imageUri, setImageUri] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const updateUriAndBase64 = (uri: string, base64: string) => {
    setImageUri(uri);
    setImageBase64(base64);
  };

  const value = { imageUri, imageBase64, updateUriAndBase64 };

  return (
    <ImageUriContext.Provider value={value}>
      {children}
    </ImageUriContext.Provider>
  );
};

export const useImageUri = () => useContext(ImageUriContext);
