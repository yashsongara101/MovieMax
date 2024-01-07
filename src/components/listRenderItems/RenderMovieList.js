import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import { MovieList } from "..";
import useMovies from "../../hooks/useMovies";
import colors from "../../constants/colors";

const RenderMovieList = ({ item }) => {
  const { year, genre } = item;

  const { data: movieList, isLoading } = useMovies({year: year, genre: genre});

  if ( isLoading ) {
    return <ActivityIndicator color={colors.primary} size={'large'}/>;
  }
  
  return (
    <React.Fragment>
      <Text style={[styles.titleStyle]}>{year}</Text>
      <MovieList
        movieList={movieList}/>
    </React.Fragment>
  );
}

const arePropsEqual = (prevProps, nextProps) => (prevProps?.item?.year === nextProps?.item?.year)

const styles = StyleSheet.create({
  titleStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16
  }
});

export default React.memo(RenderMovieList, arePropsEqual);
