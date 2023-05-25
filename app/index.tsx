import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../context/Language";
import { TranslateText } from "../components/TranslateText";

import { languages } from "../utils/languages";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { lang, updateLanguage } = useLanguage();

  const router = useRouter();

  const handlePress = async () => {
    if (permission?.granted) {
      router.push("/camera");
    } else {
      await requestPermission();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoOuterContainer}>
        <View style={styles.logoInnerContainer}>
          <Text style={styles.logoText}>AGR</Text>
          <FontAwesome5 name="eye" size={54} color="#3fd06b" />
          <FontAwesome5
            style={{ marginLeft: -68, marginTop: -45 }}
            name="leaf"
            size={48}
            color="#3fd06b"
          />
          <Text style={[styles.logoText, { marginLeft: 8 }]}>EYE</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", gap: 10 }}>
        <View style={styles.select}>
          <TranslateText style={styles.selectName}>Language</TranslateText>
          <Picker
            style={styles.picker}
            selectedValue={lang}
            onValueChange={(itemValue) => updateLanguage(itemValue)}
          >
            {languages.map(({ code, language }) => (
              <Picker.Item
                key={code}
                label={language}
                style={styles.pickerItem}
                value={code}
              />
            ))}
          </Picker>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => handlePress()}
        >
          <TranslateText style={styles.buttonText}>
            {permission?.granted ? "Take a Picture!" : "Give Camera Access"}
          </TranslateText>
        </Pressable>
      </View>

      {/* <View style={[styles.buttonContainer, { width }]}></View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#171717",
    padding: 20,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderRadius: 99,
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },

  buttonText: {
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
  },

  select: { backgroundColor: "#ffffff", padding: 8, borderRadius: 40 },
  selectName: { paddingHorizontal: 18, marginBottom: -10, marginTop: 10 },
  picker: {
    color: "#000000",
  },
  pickerItem: {
    color: "black",
    fontSize: 24,
    borderRadius: 18,
    textAlign: "left",
  },
  logoOuterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    color: "#3fd06b",
    textAlign: "center",
    fontSize: 72,
    fontWeight: "900",
  },
});
