import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'
import { fetchTrailer } from '../data/trailerSlice'

const Movie = ({ movie }) => {
    const { starred, watchLater } = useSelector((state) => state)
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const dispatch = useDispatch()

    // const myClickHandler = (e) => {
    //     if (!e) var e = window.event
    //     e.cancelBubble = true
    //     if (e.stopPropagation) e.stopPropagation()
    //     e.target.parentElement.parentElement.classList.remove('opened')
    // }

    return (
        <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
            <div className="card">
                <div className="card-body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <div className="overview">{movie.overview}</div>
                        <div className="year">
                            {movie.release_date?.substring(0, 4)}
                        </div>
                        {starred.starredMovies[movie.id] ? (
                            <span
                                className="btn-star"
                                data-testid="unstar-link"
                                onClick={() => dispatch(unstarMovie(movie.id))}
                            >
                                <i
                                    className="bi bi-star-fill"
                                    data-testid="star-fill"
                                />
                            </span>
                        ) : (
                            <span
                                className="btn-star"
                                data-testid="starred-link"
                                onClick={() =>
                                    dispatch(
                                        starMovie({
                                            id: movie.id,
                                            overview: movie.overview,
                                            release_date:
                                                movie.release_date?.substring(
                                                    0,
                                                    4
                                                ),
                                            poster_path: movie.poster_path,
                                            title: movie.title
                                        })
                                    )
                                }
                            >
                                <i className="bi bi-star" />
                            </span>
                        )}
                        {watchLater.watchLaterMovies[movie.id] ? (
                            <button
                                type="button"
                                data-testid="remove-watch-later"
                                className="btn btn-light btn-watch-later blue"
                                onClick={() =>
                                    dispatch(removeFromWatchLater(movie.id))
                                }
                            >
                                <i className="bi bi-check"></i>
                            </button>
                        ) : (
                            <button
                                type="button"
                                data-testid="watch-later"
                                className="btn btn-light btn-watch-later"
                                onClick={() =>
                                    dispatch(
                                        addToWatchLater({
                                            id: movie.id,
                                            overview: movie.overview,
                                            release_date:
                                                movie.release_date?.substring(
                                                    0,
                                                    4
                                                ),
                                            poster_path: movie.poster_path,
                                            title: movie.title
                                        })
                                    )
                                }
                            >
                                Watch Later
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => dispatch(fetchTrailer(movie.id))}
                        >
                            View Trailer
                        </button>
                    </div>
                    <img
                        className="center-block"
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : placeholder
                        }
                        alt="Movie poster"
                    />
                </div>
                <h6 className="title mobile-card">{movie.title}</h6>
                <h6 className="title">{movie.title}</h6>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="close"*/}
                {/*    onClick={(e) => myClickHandler(e)}*/}
                {/*    aria-label="Close"*/}
                {/*>*/}
                {/*    <span aria-hidden="true">&times;</span>*/}
                {/*</button>*/}
            </div>
        </div>
    )
}

export default Movie
