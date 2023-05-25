import { Pressable, StyleSheet, Text, View } from "react-native";
import { Condition, remedies } from "../utils/remedies";
import { useRouter } from "expo-router";
import { TranslateText } from "./TranslateText";

export const ResultLink = ({
  index,
  condition,
  confidence,
  to,
}: {
  index: string;
  condition: string;
  confidence: string;
  to: string;
}) => {
  const router = useRouter();

  const conditionName = remedies[condition as Condition]
    ? remedies[condition as Condition].title
    : condition;

  const percentage = (parseFloat(confidence) * 100).toFixed(2);

  const onPress = () => {
    router.push(to);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? "#24b25b" : "transparent",
          borderColor: pressed ? "#24b25b" : "#f2f2f299",
        },
      ]}
      onPress={() => onPress()}
    >
      {({ pressed }) => (
        <>
          <View style={{ justifyContent: "center" }}>
            <TranslateText
              style={{ color: "#ffffff", fontSize: 24, fontWeight: "700" }}
            >
              {index}.
            </TranslateText>
          </View>
          <TranslateText
            style={[
              styles.condition,
              { color: pressed ? "#ffffff" : "#ffffff" },
            ]}
          >
            {conditionName}
          </TranslateText>
          <View style={{ justifyContent: "center" }}>
            <View
              style={[
                styles.confidenceContainer,
                {
                  backgroundColor: pressed ? "#ffffff" : "#24b25b",
                },
              ]}
            >
              <TranslateText
                style={[
                  styles.confidence,
                  { color: pressed ? "#000000" : "#ffffff" },
                ]}
              >
                {percentage} %
              </TranslateText>
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 10,
    flexWrap: "wrap",
    gap: 8,
    borderWidth: 2,
    borderRadius: 12,
  },
  condition: {
    fontSize: 21,
    flex: 1,
    flexWrap: "wrap",
    fontWeight: "700",
    letterSpacing: 0.75,
  },
  confidenceContainer: {
    borderRadius: 6,
    padding: 5,
  },
  confidence: {
    fontWeight: "700",
    fontSize: 16,
  },
});
