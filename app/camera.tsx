import { Camera, CameraType, ImageType } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import CircleButton from "../components/Buttons/CircleButton";
import IconButton from "../components/Buttons/IconButton";
import * as ImagePicker from "expo-image-picker";
import { useImageUri } from "../context/Image";
import { BackButton } from "../components/BackButton";
import { initialResult, useResult } from "../context/Result";
import { TranslateText } from "../components/TranslateText";
// import * as FS from "expo-file-system";

export default function CameraPage() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);
  const [camera, setCamera] = useState<Camera | null>(null);
  // const [imageUri, setImageUri] = useState<string | null>(null);
  const { updateUriAndBase64 } = useImageUri();
  const router = useRouter();
  const { updateResults } = useResult();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      // console.log(result);
      const imageData = result.assets[0];
      updateUriAndBase64(imageData.uri, imageData.base64!);
      router.push("/result");
    }
  };

  useEffect(() => {
    updateResults(initialResult, initialResult);
  }, []);

  async function getImage() {
    if (camera) {
      const image = await camera.takePictureAsync({
        base64: true,
        imageType: ImageType.jpg,
        quality: 0.4,
      });
      console.log(image.uri);
      updateUriAndBase64(image.uri, image.base64!);
      router.push("/result");
    }
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <TranslateText style={{ textAlign: "center", color: "white" }}>
          We need your permission to show the camera
        </TranslateText>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <Camera
        ratio="4:3"
        style={{
          height: height,
          width: width,
          marginTop: -40,
        }}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      ></Camera>
      <View style={{ ...styles.optionsContainer, width: Math.floor(width) }}>
        <View style={styles.optionsRow}>
          <IconButton icon="photo-library" label="Albums" onPress={pickImage} />
          <CircleButton onPress={getImage} />
          <IconButton
            icon={
              Platform.OS === "ios" ? "flip-camera-ios" : "flip-camera-android"
            }
            iconStyle={{
              color: type === CameraType.back ? "#fff" : "#3e3f41",
              opacity: 1,
            }}
            iconStylePressed={{
              color: type === CameraType.back ? "#fff" : "#3e3f41",
              opacity: 0.8,
            }}
            hoverStyle={{
              opacity: type === CameraType.back ? 0 : 1,
            }}
            hoverStylePressed={{
              opacity: type === CameraType.back ? 0.2 : 0.8,
            }}
            label={"Flip"}
            onPress={toggleCameraType}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#171717",
  },

  optionsContainer: {
    position: "absolute",
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
