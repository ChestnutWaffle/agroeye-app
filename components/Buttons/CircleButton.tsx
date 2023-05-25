import {
  View,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CircleButton({
  onPress,
  style,
}: {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.circleButtonContainer, { marginTop: -20 }]}>
      <Pressable
        style={({ pressed }) => [
          styles.circleButton,
          { backgroundColor: pressed ? "#ffefefcc" : "#ffefef" },
          style,
        ]}
        onPress={onPress}
      >
        {({ pressed }) => (
          <MaterialIcons
            name="photo-camera"
            size={38}
            color={pressed ? "#000000" : "#3e3f41"}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#ffffff",
    borderRadius: 42,
    padding: 3,
    marginLeft: 56,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "#ffefef",
  },
});
