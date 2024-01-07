import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../../constants/colors";

const RenderMovieSectionHeader = ({section}) => {
  const { title } = section;
    
  return (
    <Text style={[styles.titleStyle]}>{title}</Text>
  );
}

const arePropsEqual = (prevProps, nextProps) => prevProps?.section?.title === nextProps?.section?.title

const styles = StyleSheet.create({
  titleStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default React.memo(RenderMovieSectionHeader, arePropsEqual);
