import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import movieService from "../service/movieService";
import colors from "../constants/colors";
import globalStyles from "../constants/globalStyles";
import { filterCrewData, getTmdbImageUrlFromPath } from "../utils/movieUtils";
import { numberFormatter } from "../utils/commonUtils";
import { Chip, Divider, PersonTile } from "../components";

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;

  const { data: movieData, isLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => {
      return movieService.getMovieDetails(movieId);
    }
  });

  const renderCastItem = useCallback(({ item }) => {
    const { character: characterName, original_name, profile_path: imagePath } = item;

    return (
      <PersonTile 
        imageUrl={getTmdbImageUrlFromPath(imagePath)}
        label={original_name}
        description={`as ${characterName}`}/>
    );
  });
  
  const renderCrewItem = useCallback(({ item }) => {
    const { known_for_department, original_name, profile_path: imagePath } = item;

    return (
      <PersonTile 
        imageUrl={getTmdbImageUrlFromPath(imagePath)}
        label={original_name}
        description={known_for_department}/>
    );
  });

  return (
    <SafeAreaView style={[styles.containerStyle]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.black}
      />
      <View style={[globalStyles.roundedTopBox, {height: '100%'}]}>
        {isLoading ? (
          <ActivityIndicator
            color={colors.primary} style={{
              padding: 24
            }}/>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={[styles.detailsHeaderStyle]}>
              <Image
                source={{ uri: getTmdbImageUrlFromPath(movieData?.poster_path)}}
                style={[styles.posterStyle]}/>
              
              <View style={{
                flex: 2/3,
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingVertical: 8
              }}>
                <View>
                  <Text style={[styles.movieTitleStyle]}>{movieData?.original_title}</Text>

                  <Text style={[styles.movieTaglineStyle]}>{movieData?.tagline}</Text>
                </View>

                <View>
                  <Text style={{ color: colors.white, marginTop: 16}}>
                    ⭐
                    <Text>
                      {` ${movieData?.vote_average.toFixed(1)} ( ${numberFormatter(movieData?.vote_count)} votes )`}
                    </Text>
                  </Text>

                  <Text style={{
                    color: colors.default_text_color,
                    marginTop: 8
                  }}>
                    {movieData?.production_countries?.map(country => country?.iso_3166_1).join(', ')}
                    {' • '}
                    {new Date(movieData?.release_date).toDateString()}
                  </Text>
                </View>
              </View>

            </View>
            
            <Divider/>

            <View style={[styles.genreContainerStyle]}>
              {movieData?.genres?.map(genre => {
                return (
                  <Chip 
                    key={genre?.name}
                    label={genre?.name}
                    labelStyle={{...styles.genreChipLabelStyle}}
                    chipStyle={{...styles.genreChipStyle}}/>
                )
              })}
            </View>

            <Divider/>

            <View style={{padding: 24}}>
                <Text style={[styles.sectionTitleStyle]}>Overview</Text>
                <Text style={{
                  color: colors.default_text_color,
                  marginTop: 16
                }}>
                  {movieData?.overview}
                </Text>
            </View>

            <Divider/>

            <View style={{
              padding: 24,
              flexDirection: 'row',
              gap: 24
            }}>
              <Text style={[styles.sectionTitleStyle]}>Production</Text>
              <Text style={{ color: colors.default_text_color }}>
                {movieData?.production_companies?.map(company => company?.name).join('\n')}
              </Text>
            </View>

            <Divider/>

            <View style={{
              paddingVertical: 24,
            }}>
              <Text style={[styles.sectionTitleStyle, { paddingHorizontal: 24 }]}>Cast</Text>
              <FlatList data={movieData?.credits?.cast}
                keyExtractor={item => item.id}
                renderItem={renderCastItem}
                contentContainerStyle={[styles.creditsListContainerStyle]}
                showsHorizontalScrollIndicator={false}
                horizontal/>
            </View>

            <Divider/>

            <View style={{
              paddingVertical: 24,
            }}>
              <Text style={[styles.sectionTitleStyle, { paddingHorizontal: 24 }]}>Crew</Text>
              <FlatList data={filterCrewData(movieData?.credits?.crew)}
                keyExtractor={item => item.id}
                renderItem={renderCrewItem}
                contentContainerStyle={[styles.creditsListContainerStyle]}
                showsHorizontalScrollIndicator={false}
                horizontal/>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.black
  },
  posterStyle: {
    borderRadius: 16,
    backgroundColor: colors.black,
    width: '100%',
    aspectRatio: 3/4.5,
    flex: 1/3
  },
  creditsListContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8
  },
  sectionTitleStyle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  detailsHeaderStyle: {
    flexDirection: 'row',
    padding: 24,
    gap: 16
  },
  movieTitleStyle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  movieTaglineStyle: {
    color: colors.default_text_color,
    marginTop: 8
  },
  genreContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  genreChipLabelStyle: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 12
  },
  genreChipStyle: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8
  }
});

export default MovieDetailScreen;
