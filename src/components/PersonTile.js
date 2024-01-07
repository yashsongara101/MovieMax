import { Image, StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";

const PersonTile = ({ imageUrl, label, description }) => {
  return (
    <View style={[styles.containerStyle]}>
      <Image source={{ uri: imageUrl }}
        style={[styles.imageStyle]}/>
      <Text style={[styles.labelStyle]}>{ label }</Text>
      <Text style={[styles.descriptionStyle]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 100
  },
  imageStyle: {
    aspectRatio: 1,
    width: 80,
    borderRadius: 40,
    backgroundColor: colors.default_text_color
  },
  labelStyle: {
    marginTop: 8,
    color: colors.white,
    textAlign: 'center'
  },
  descriptionStyle: {
    marginTop: 4,
    color: colors.default_text_color,
    fontSize: 12,
    textAlign: 'center'
  }
});

export default PersonTile;
