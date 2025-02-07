import { useSelector } from 'react-redux'

import '../styles/movies.scss'
import Movie from './Movie'

const Movies = () => {
    const { movies } = useSelector((state) => state)

    return (
        <div data-testid="movies">
            {movies.movies.results?.map((movie) => (
                <Movie movie={movie} key={movie.id} />
            ))}
        </div>
    )
}

export default Movies
