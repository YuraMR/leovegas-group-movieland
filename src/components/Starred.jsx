import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from './Movie'
import '../styles/starred.scss'
import ROUTES from '../constants/routes'

const Starred = () => {
    const { starred } = useSelector((state) => state)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

    const { starredMovies } = starred
    const starredMoviesList = Object.values(starredMovies)

    return (
        <div className="starred" data-testid="starred">
            {starredMoviesList.length > 0 && (
                <div data-testid="starred-movies" className="starred-movies">
                    <h6 className="header">Starred movies</h6>
                    <div className="row">
                        {starredMoviesList.map((movie) => (
                            <Movie movie={movie} key={movie.id} />
                        ))}
                    </div>

                    <footer className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => dispatch(clearAllStarred())}
                        >
                            Remove all starred
                        </button>
                    </footer>
                </div>
            )}

            {starredMoviesList.length === 0 && (
                <div className="text-center empty-cart">
                    <i className="bi bi-star" />
                    <p>There are no starred movies.</p>
                    <p>
                        Go to <Link to={ROUTES.HOME}>Home</Link>
                    </p>
                </div>
            )}
        </div>
    )
}

export default Starred
