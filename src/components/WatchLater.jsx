import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import watchLaterSlice from '../data/watchLaterSlice'
import '../styles/starred.scss'
import ROUTES from '../constants/routes'
import Movie from './Movie'

const WatchLater = ({ viewTrailer }) => {
    const { watchLater } = useSelector((state) => state)
    const { removeAllWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()

    const { watchLaterMovies } = watchLater
    const watchLaterMoviesList = Object.values(watchLaterMovies)

    return (
        <div className="starred" data-testid="watch-later-div">
            {watchLaterMoviesList.length > 0 && (
                <div
                    data-testid="watch-later-movies"
                    className="starred-movies"
                >
                    <h6 className="header">Watch Later List</h6>
                    <div className="row">
                        {watchLaterMoviesList.map((movie) => (
                            <Movie
                                movie={movie}
                                key={movie.id}
                                viewTrailer={viewTrailer}
                            />
                        ))}
                    </div>

                    <footer className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => dispatch(removeAllWatchLater())}
                        >
                            Empty list
                        </button>
                    </footer>
                </div>
            )}

            {watchLaterMoviesList.length === 0 && (
                <div className="text-center empty-cart">
                    <i className="bi bi-heart" />
                    <p>You have no movies saved to watch later.</p>
                    <p>
                        Go to <Link to={ROUTES.HOME}>Home</Link>
                    </p>
                </div>
            )}
        </div>
    )
}

export default WatchLater
