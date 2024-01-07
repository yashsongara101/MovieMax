import tmdbClient from "../client/tmdbClient";

const movieService = {
  getMoviesByYearPaginated: async (year, genre = [], page = 1) => {
    const { data } = await tmdbClient.get('/discover/movie', {
      params: {
        'sort_by': 'popularity.desc',
        'primary_release_year': year,
        'page': page,
        'vote_count.gte': 100 ,
        'with_genres': genre.join(',')
      }
    });
    
    return data?.results;
  },
  getMovieDetails: async (movieId) => {
    const { data } = await tmdbClient.get(`/movie/${movieId}`, {
      params: {
        'append_to_response': 'credits'
      }
    });
    return data;
  },
  getMoviesByName: async (string, page) => {
    const { data } = await tmdbClient.get(`/search/movie`, {
      params: {
        'query': string,
        'page': page
      }
    });

    return data;
  },
  getGenreList: async () => {
    const { data } = await tmdbClient.get('/genre/movie/list');
    return data?.genres;
  }
}

export default movieService;
