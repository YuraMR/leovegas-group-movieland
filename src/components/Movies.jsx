import { useSelector } from 'react-redux'

import '../styles/movies.scss'
import Movie from './Movie'

const Movies = ({ viewTrailer, closeCard }) => {
    const { movies } = useSelector((state) => state)

    return (
        <div data-testid="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
