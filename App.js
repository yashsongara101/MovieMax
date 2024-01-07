import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppNavigation } from "./src/navigation";

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchOnWindowFocus: false
    },
  }
});

const App = () => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <AppNavigation/>
    </QueryClientProvider>
  );
}

export default App;
