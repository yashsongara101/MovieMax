import { useQuery } from "@tanstack/react-query";
import movieService from "../service/movieService";

const useMovies = ({ queryOptions, year, genre }) => {
  return useQuery({
    queryKey: ['movieYear', year],
    queryFn: () => {
      return movieService.getMoviesByYearPaginated(year, genre);
    },
    ...queryOptions
  });
}

export default useMovies;
