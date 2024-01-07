import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../constants/colors";
import globalStyles from "../constants/globalStyles";
import useSearchMovieByName from "../hooks/useSearchMovieByName";
import { MovieList, SearchBox } from "../components";
import { useDebounce } from "../hooks/useDebounce";
import { getMovieListFromPageData } from "../utils/movieUtils";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: movieListPagesData, fetchNextPage } = useSearchMovieByName({
    searchQuery: useDebounce(searchQuery, 800),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <SearchBox 
          placeholder={"Enter movie name"} 
          onChangeTextCallback={(text) => {
            setSearchQuery(text.trim());
          }} 
          {...props}/>
      )
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.black}
      />
      <View style={[styles.containerStyle]}>
        <View style={[globalStyles.roundedTopBox, {marginTop: 8, flex: 1}]}>
          {searchQuery !== '' && movieListPagesData?.pages?.length !== 0 && (
            <MovieList 
              movieList={getMovieListFromPageData(movieListPagesData)}
              numColumns={3}
              onEndReached={() => {
                fetchNextPage();
              }}/>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.black,
    height: '100%'
  },
  noMoviesStyle: {
    color: colors.default_text_color,
    textAlign: 'center',
    padding: 36
  }
});

export default SearchScreen;
