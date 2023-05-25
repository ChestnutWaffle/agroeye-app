import { Slot } from "expo-router";
import { View } from "react-native";
import { ImageUriProvider } from "../context/Image";
import { ResultsProvider } from "../context/Result";
import { LanguageProvider } from "../context/Language";

export default function Layout() {
  return (
    <LanguageProvider>
      <ImageUriProvider>
        <ResultsProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: "#171717",
              justifyContent: "center",
            }}
          >
            <Slot />
          </View>
        </ResultsProvider>
      </ImageUriProvider>
    </LanguageProvider>
  );
}
