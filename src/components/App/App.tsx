import { useState } from 'react';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { MovieResponse } from '../../services/movieService';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoader(true);
    setError(false);

    try {
      const result: MovieResponse = await fetchMovies(query);
      if (result.results.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(result.results);
      console.log(result.results);
    } catch {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {!error && <MovieGrid onSelect={handleSelect} movies={movies} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
