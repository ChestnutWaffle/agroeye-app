import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TranslateText } from "../TranslateText";

export default function IconButton({
  icon,
  label,
  iconStyle,
  iconStylePressed,
  hoverStyle,
  hoverStylePressed,
  onPress,
}: {
  icon: string;
  label?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  hoverStyle?: StyleProp<ViewStyle>;
  hoverStylePressed?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  iconStylePressed?: StyleProp<TextStyle>;
}) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      {({ pressed }) => {
        return (
          <>
            <View
              style={[
                {
                  position: "absolute",
                  backgroundColor: "#ffffff",
                  flex: 1,
                  width: 63,
                  height: 63,
                  top: 0,
                  borderRadius: 9999,
                  opacity: pressed ? 0.2 : 0,
                },
                pressed ? hoverStylePressed : hoverStyle,
              ]}
            />
            <MaterialIcons
              name={icon as any}
              size={24}
              color="#fff"
              style={[
                { padding: 20, borderRadius: 9999 },
                pressed ? iconStylePressed : iconStyle,
              ]}
            />
            {label && (
              <TranslateText style={styles.iconButtonLabel}>
                {label}
              </TranslateText>
            )}
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 5,
  },
});
