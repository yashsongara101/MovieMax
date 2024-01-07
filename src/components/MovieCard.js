import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";
import { numberFormatter } from "../utils/commonUtils";

const MovieCard = ({
  title,
  poster,
  rating,
  votes,
  onMovieClickCallback
}) => {
  return (
    <TouchableOpacity onPress={onMovieClickCallback}>
      <Image
        source={{ uri: poster}}
        style={[styles.posterStyle]}/>
        
      <Text style={[styles.secondaryTextStyle]}>
        ⭐
        <Text style={{fontSize: 12}}>
          {` ${rating} • ${numberFormatter(votes)} votes`}
        </Text>
      </Text>

      <Text style={[styles.titleStyle]}>
        {title}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  posterStyle: {
    aspectRatio: 3/4.5,
    borderRadius: 16,
    backgroundColor: colors.black,
    width: '100%'
  },
  titleStyle: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 4
  },
  secondaryTextStyle: {
    textAlign: 'center', 
    paddingTop: 8,
    fontSize: 10, 
    textAlignVertical: 'center',
    color: colors.default_text_color
  }
});

export default MovieCard;
