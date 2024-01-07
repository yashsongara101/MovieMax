import { useInfiniteQuery } from "@tanstack/react-query";
import movieService from "../service/movieService";

const useSearchMovieByName = ({queryOptions, searchQuery}) => {
  return useInfiniteQuery({
    queryKey: [`search-${searchQuery}`],
    queryFn: ({pageParam}) => {
      return movieService.getMoviesByName(searchQuery, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages === allPages.length ? undefined : allPages.length + 1
    },
    ...queryOptions
  });
}

export default useSearchMovieByName;
