import axios from "axios";
import Config from "react-native-config";

const tmdbClient = axios.create({
  baseURL: Config.TMDB_BASE_URL,
  params: {
    api_key: Config.TMDB_API_KEY
  }
});

export default tmdbClient;
