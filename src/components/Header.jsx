import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../styles/header.scss'
import ROUTES from '../constants/routes'

const Header = ({ searchMovies }) => {
    const { starredMovies } = useSelector((state) => state.starred)

    const starredMoviesList = Object.values(starredMovies)

    return (
        <header>
            <Link
                to={ROUTES.HOME}
                data-testid="home"
                onClick={() => searchMovies('')}
            >
                <i className="bi bi-film" />
            </Link>

            <nav>
                <NavLink
                    to={ROUTES.STARRED}
                    data-testid="nav-starred"
                    className="nav-starred"
                >
                    {starredMoviesList.length > 0 ? (
                        <>
                            <i className="bi bi-star-fill bi-star-fill-white" />
                            <sup className="star-number">
                                {starredMoviesList.length}
                            </sup>
                        </>
                    ) : (
                        <i className="bi bi-star" />
                    )}
                </NavLink>
                <NavLink to={ROUTES.WATCH_LATER} className="nav-fav">
                    watch later
                </NavLink>
            </nav>

            <div className="input-group rounded">
                <Link
                    to={ROUTES.HOME}
                    onClick={(e) => searchMovies('')}
                    className="search-link"
                >
                    <input
                        type="search"
                        data-testid="search-movies"
                        onKeyUp={(e) => searchMovies(e.target.value)}
                        className="form-control rounded"
                        placeholder="Search movies..."
                        aria-label="Search movies"
                        aria-describedby="search-addon"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
