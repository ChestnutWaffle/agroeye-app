import { useRouter } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import IconButton from "./Buttons/IconButton";

export const BackButton = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.topContainer, { width }]}>
      <IconButton
        icon="keyboard-backspace"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    // backgroundColor: "#ffffff",
    paddingHorizontal: 5,
    position: "absolute",
    zIndex: 10,
    top: 50,
    flexDirection: "row",
    // flex: 1,
    // justifyContent: "flex-start",
  },
});
