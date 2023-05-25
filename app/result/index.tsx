import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useImageUri } from "../../context/Image";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResultLink } from "../../components/ResultLink";
import { BackButton } from "../../components/BackButton";
import { fetchResults } from "../../utils/fetch";
import { Ionicons } from "@expo/vector-icons";
import { useResult } from "../../context/Result";
import { TranslateText } from "../../components/TranslateText";

const Status = {
  loading: "Result is loading, Please wait.",
  error: "Try again.",
  success: "Result fetched from server",
};

export default function ResultPage() {
  const { imageBase64, imageUri } = useImageUri();

  const { result1, result2, updateResults } = useResult();
  const [status, setStatus] = useState(Status.success);

  useEffect(() => {
    const f = async () => {
      setStatus(Status.loading);

      try {
        const result = await fetchResults(imageBase64);
        console.log(result);

        updateResults(result[1], result[0]);

        setStatus(Status.success);
      } catch (e) {
        if (e instanceof Error) {
          setStatus(Status.error);
          console.log(e.message);
        }
      }
    };

    if (result1.key === "" && result2.key === "") f();
  }, []);

  const retry = async () => {
    setStatus(Status.loading);
    try {
      const result = await fetchResults(imageBase64);
      console.log(result);

      updateResults(result[1], result[0]);

      setStatus(Status.success);
    } catch (e) {
      if (e instanceof Error) {
        setStatus(Status.error);
        console.log(e.message);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { borderRadius: 18 }]}>
      <BackButton />
      <View
        style={{
          borderRadius: 18,
          overflow: "hidden",
          marginTop: 80,
        }}
      >
        <ScrollView>
          <View>
            <Image style={[styles.image]} source={{ uri: imageUri }}></Image>
          </View>
          <View style={{ padding: 10 }} />
          {status === Status.loading && (
            <View
              style={{
                marginVertical: 20,
                backgroundColor: "#ffffff",
                borderRadius: 18,
              }}
            >
              <TranslateText
                style={{
                  color: "#000000",
                  fontSize: 20,
                  textAlign: "center",
                  paddingVertical: 10,
                }}
              >
                {status}
              </TranslateText>
            </View>
          )}
          {status === Status.error && (
            <Pressable
              onPress={() => retry()}
              style={({ pressed }) => ({
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 24,
                backgroundColor: pressed ? "#ffffffbb" : "#ffffff",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              })}
            >
              <TranslateText
                style={{ fontSize: 28, textAlign: "center", fontWeight: "500" }}
              >
                {status}
              </TranslateText>
              <Ionicons
                name="reload"
                size={36}
                color="black"
                style={{ justifyContent: "center" }}
              />
            </Pressable>
          )}

          {status === Status.success && result1.key && (
            <ResultLink
              index="1"
              confidence={result1.value}
              condition={result1.key}
              to={`/result/${result1.key}?value=${result1.value}`}
            />
          )}

          {status === Status.success && result2.key && (
            <ResultLink
              index="2"
              confidence={result2.value}
              condition={result2.key}
              to={`/result/${result2.key}?value=${result2.value}`}
            />
          )}
          <View style={{ padding: 20 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
