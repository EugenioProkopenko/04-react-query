import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(item => (
        <li key={item.id}>
          <div className={css.card} onClick={() => onSelect(item)}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              loading="lazy"
            />
            <h2 className={css.title}>{item.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
