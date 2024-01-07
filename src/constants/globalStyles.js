import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
  chipSelectedStyle: {
    backgroundColor: colors.primary
  },
  chipUnselectedStyle: {
    backgroundColor: colors.bg_dark
  },
  chipLabelSelectedStyle: {
    fontWeight: 'bold',
    color: colors.secondary,
  },
  chipLabelUnselectedStyle: {
    color: colors.white
  },
  roundedTopBox: {
    backgroundColor: colors.bg_dark,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  inputBoxStyle: {
    fontSize: 16,
    borderRadius: 16,
    color: colors.white,
  }
});

export default globalStyles;
