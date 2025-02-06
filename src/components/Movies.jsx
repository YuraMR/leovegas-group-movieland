import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMovies } from '../data/moviesSlice'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import '../styles/movies.scss'
import Movie from './Movie'

const Movies = () => {
    const dispatch = useDispatch()
    const { movies, currentPage, totalPages, fetchStatus } = useSelector(
        (state) => state.movies
    )

    const hasMore = currentPage < totalPages

    const loadMoreMovies = useCallback(() => {
        if (fetchStatus === 'loading' || !hasMore) return

        dispatch(fetchMovies({ query: '', page: currentPage + 1 }))
    }, [dispatch, fetchStatus, hasMore, currentPage])

    useInfiniteScroll(loadMoreMovies)

    return (
        <div className="movies-container" data-testid="movies">
            {movies.map((movie) => (
                <Movie movie={movie} key={movie.id} />
            ))}
            {fetchStatus === 'loading' && <p>Loading...</p>}
        </div>
    )
}

export default Movies
