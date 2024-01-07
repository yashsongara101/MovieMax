import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, SectionList, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import colors from "../constants/colors";
import { ChipGroup } from "../components";
import globalStyles from "../constants/globalStyles";
import LogoLight from '../assets/logo_light.svg';
import SearchIcon from '../assets/search.svg';
import useGenre from "../hooks/useGenre";
import { RenderMovieList } from "../components/listRenderItems";

const HomeScreen = () => {
  const queryClient = useQueryClient();
  
  const onEndReachedCalledDuringMomentum = useRef(false);

  const flatListRef = useRef(null);

  const navigation = useNavigation();
  const [genreFilter, setGenreFilter] = useState([]);
  const [movieYears, setMovieYears] = useState([{year: 2012, genre: []}]);

  const { data: genreList } = useGenre();

  const onGenreSelectedCallback = useCallback((selectedItems) => {
    setGenreFilter(selectedItems);
    queryClient.removeQueries({
      queryKey: ['movieYear']
    });

    setMovieYears([
      {year: 2012, genre: selectedItems},
    ]);
  },[queryClient]);

  useEffect(() => {
    navigation.setOptions({
        headerTitle: (props) => (
            <View>
              <LogoLight 
                width={24}
                height={24}
                {...props}/>
            </View>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Search');
            }}>
                <SearchIcon 
                    width={24} 
                    height={24}
                    fill={colors.white}/>
            </TouchableOpacity>
        ),
    });
  }, [navigation]);

  const renderSectionListItem = useCallback(({ item }) => <RenderMovieList item={item}/>);

  const fetchPreviousYearMovie = () => {
    const firstItemYear = Number(movieYears[0]?.year);

    setMovieYears([
      {year: firstItemYear - 1, genre: genreFilter},
      ...movieYears
    ])

    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 1, animated: false });
    }
  }

  const fetchNextYearMovies = () => {
    const lastItemYear = Number(movieYears[movieYears.length - 1]?.year);
    const prevYear = new Date().getFullYear() - 1;

    if ( prevYear !== lastItemYear ) {
      setMovieYears([
        ...movieYears,
        {year: lastItemYear + 1, genre: genreFilter}
      ])
    }
  }

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.black}
      />
      <View style={[styles.containerStyle]}>
        <ChipGroup chipsData={genreList?.map((genre) => ({
              key: genre?.id,
              value: genre?.name
            }))}
          onChipPressed={onGenreSelectedCallback}/>

        <View style={[globalStyles.roundedTopBox, { flex: 1 }]}>
          <FlatList
            ref={flatListRef}
            data={movieYears}
            extraData={movieYears}
            renderItem={renderSectionListItem}
            contentContainerStyle={[styles.movieSectionListContainerStyle]}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.year}-${genreFilter.join(',')}`}
            onEndReached={() => {
              if ( !onEndReachedCalledDuringMomentum.current ) {
                fetchNextYearMovies();
                onEndReachedCalledDuringMomentum.current = true;
              }
            }}
            onEndReachedThreshold={2}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum.current = false;
            }}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0
            }}
            onStartReached={() => {
              if ( !onEndReachedCalledDuringMomentum.current ) {
                fetchPreviousYearMovie();
                onEndReachedCalledDuringMomentum.current = true;
              }
            }}/>
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
  movieSectionListContainerStyle: {
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  }
});

export default HomeScreen;