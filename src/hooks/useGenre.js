import { useQuery } from "@tanstack/react-query";
import movieService from "../service/movieService";

const useGenre = (queryOptions) => {
  return useQuery({
    queryKey: ['genre'],
    queryFn: movieService.getGenreList,
    ...queryOptions
  }); 
}

export default useGenre;
