import Config from "react-native-config";

export function getTmdbImageUrlFromPath (posterPath) {
  return `${Config.TMDB_IMAGE_RESOURCE_URL}/w300${posterPath}`;
}

export function getMovieListFromPageData (movieListPagesData) {
  if (!movieListPagesData)
    return [];

  const movieList = [];

  for ( const pageData of movieListPagesData?.pages ) {
    movieList.push(...pageData?.results);
  }
  
  return movieList;
}

export function filterCrewData (crewData) {
  const map = new Map(crewData.map(person => [person.id, person]));
  return [...map.values()];
}
