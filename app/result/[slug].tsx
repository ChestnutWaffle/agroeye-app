import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../../components/BackButton";

import { Condition, Remedy, remedies } from "../../utils/remedies";
import { ScrollView } from "react-native-gesture-handler";
import { openBrowserAsync } from "expo-web-browser";
import { AntDesign } from "@expo/vector-icons";
import { TranslateText } from "../../components/TranslateText";

export default function ConditionPage() {
  const { slug, value } = useLocalSearchParams();

  const conditionName = slug as Condition;

  const conditionDetails = remedies[conditionName] as Remedy;
  const title = conditionDetails.title;
  const percentage = (parseFloat(String(value)) * 100).toFixed(2);
  const regular = conditionDetails.control.regular;
  const chemical = conditionDetails.control.chemical;
  const organic = conditionDetails.control.organic;

  return (
    <SafeAreaView style={[styles.container]}>
      <BackButton />
      <View style={styles.innerContainer}>
        <ScrollView>
          <View>
            <TranslateText style={styles.title}>{title}</TranslateText>
          </View>
          <View>
            <View style={styles.confidenceContainer}>
              <TranslateText style={styles.confidence}>
                {percentage} %
              </TranslateText>
            </View>
          </View>
          {regular && (
            <View>
              <View style={{ marginVertical: 20 }}>
                <TranslateText style={styles.measureTitle}>
                  Regular Measures
                </TranslateText>
                <View style={styles.separator} />
                <View style={styles.measureContainer}>
                  <TranslateText style={styles.measureText}>
                    {regular}
                  </TranslateText>
                </View>
              </View>
            </View>
          )}
          {chemical && (
            <View>
              <View style={{ marginVertical: 20 }}>
                <TranslateText style={styles.measureTitle}>
                  Chemical Measures
                </TranslateText>
                <View style={styles.separator} />
                <View style={styles.measureContainer}>
                  <TranslateText style={styles.measureText}>
                    {chemical}
                  </TranslateText>
                </View>
              </View>
            </View>
          )}
          {organic && (
            <View>
              <View style={{ marginVertical: 20 }}>
                <TranslateText style={styles.measureTitle}>
                  Organic Measures
                </TranslateText>
                <View style={styles.separator} />
                <View style={styles.measureContainer}>
                  <TranslateText style={styles.measureText}>
                    {organic}
                  </TranslateText>
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              flex: 1,
            }}
          >
            <Pressable
              style={({ pressed }) => ({
                padding: 20,
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: pressed ? "#324ad3ee" : "#324ad3",
                borderRadius: 20,
              })}
              onPress={() =>
                openBrowserAsync(
                  `https://www.google.com/search?q=${title} Treatment`
                )
              }
            >
              <TranslateText
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                Search on Google for more
              </TranslateText>
              <View style={{ justifyContent: "center" }}>
                <AntDesign name="google" size={24} color="white" />
              </View>
            </Pressable>
          </View>
          <View style={{ padding: 50 }} />
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
    marginHorizontal: 22,
    borderRadius: 18,
  },
  innerContainer: {
    marginTop: 80,
  },
  title: {
    color: "#ffffff",
    flex: 1,
    flexWrap: "wrap",
    fontSize: 36,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "900",
    padding: 18,
  },
  confidenceContainer: {
    backgroundColor: "#24b25b",
    alignSelf: "center",
    padding: 10,
    borderRadius: 16,
  },
  confidence: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },

  measureTitle: {
    color: "#000000",
    padding: 10,
    fontSize: 21,
    fontWeight: "500",
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    textAlign: "center",
  },
  separator: {
    borderBottomColor: "#ffffffaa",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    borderRadius: 9999,
  },
  measureContainer: {
    overflow: "hidden",
    borderColor: "#ffffff",
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 18,
  },
  measureText: {
    color: "#ffffff",
    textAlign: "justify",
    padding: 15,
    fontSize: 18,
    lineHeight: 24,
  },
});
