import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";

const Chip = ({
  label, 
  iconStart, 
  chipStyle,
  labelStyle,
  onPressed
}) => {
  return (
    <TouchableOpacity style={[styles.chipContainerStyle, {...chipStyle}]}
      onPress={onPressed}>
      {iconStart && (
        <View style={[styles.iconContainerStyle]}>
          {iconStart}
        </View>
      )}
      <Text style={[styles.labelStyle, {...labelStyle}]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chipContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.bg_dark,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  labelStyle: {
    color: colors.white
  },
  iconContainerStyle: {
    marginEnd: 4
  }
});

export default Chip;
