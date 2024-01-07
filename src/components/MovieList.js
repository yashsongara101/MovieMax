import { FlatList, StyleSheet, View } from "react-native";

import { useCallback } from "react";

import { RenderMovieListItem } from "./listRenderItems";
import { Spacer } from ".";

const MovieList = ({ movieList, numColumns = 2, onEndReached }) => {
  const renderFlatListItem = useCallback(({ item }) => (
    <RenderMovieListItem 
      item={item}
      numColumns={numColumns}/>
  ), [numColumns]);

  return (
    <FlatList 
      data={movieList}
      contentContainerStyle={[styles.movieListContainerStyle]}
      columnWrapperStyle={[styles.movieListColumnWrapperStyle]}
      renderItem={renderFlatListItem}
      ItemSeparatorComponent={Spacer}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      numColumns={numColumns}
      onEndReached={onEndReached}
      onEndReachedThreshold={3}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0
      }}/>
  );
}

const styles = StyleSheet.create({
  movieListColumnWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
  },
  movieListContainerStyle: {
    padding: 24
  }
});

export default MovieList;
