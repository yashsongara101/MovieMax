import React, { useCallback } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getTmdbImageUrlFromPath } from "../../utils/movieUtils";
import { MovieCard } from "..";

const RenderMovieListItem = ({ item, numColumns }) => {
  const navigation = useNavigation();
  const { title, vote_average, poster_path, vote_count, id } = item;

  const onMovieClickCallback = useCallback(
    () => {
      navigation.navigate('MovieDetail', {
        movieId: id
      });
    },
    [id, navigation]
  );

  return (
    <View style={{
      flex: 1/numColumns
    }}>
      <MovieCard 
        title={title}
        votes={vote_count}
        rating={vote_average}
        poster={getTmdbImageUrlFromPath(poster_path)}
        onMovieClickCallback={onMovieClickCallback}/>
    </View>
  );
}

const arePropsEqual = (prevProps, nextProps) => prevProps?.item?.id === nextProps?.item?.id

export default React.memo(RenderMovieListItem, arePropsEqual);