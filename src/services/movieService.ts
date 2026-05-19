import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  console.log(import.meta.env.VITE_TMDB_TOKEN);

  const response = await axios.get<MovieResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return response.data;
};
