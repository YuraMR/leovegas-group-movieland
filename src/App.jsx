import { useEffect, useState } from 'react'
import {
    Routes,
    Route,
    createSearchParams,
    useSearchParams,
    useNavigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'
import ROUTES from './constants/routes'
import { fetchMovieDetails } from './utils/apiEndpoints'

const App = () => {
    const state = useSelector((state) => state)
    const { movies } = state
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')
    const [videoKey, setVideoKey] = useState()
    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()

    const closeModal = () => setOpen(false)

    const closeCard = () => {}

    const getSearchResults = (query) => {
        if (query !== '') {
            /** implementation of api service must be hidden */
            dispatch(fetchMovies(query))
            setSearchParams(createSearchParams({ search: query }))
        } else {
            /** implementation of api service must be hidden */
            dispatch(fetchMovies())
            setSearchParams()
        }
    }

    const searchMovies = (query) => {
        navigate(ROUTES.HOME)
        getSearchResults(query)
    }

    const getMovies = () => {
        if (searchQuery) {
            /** implementation of api service must be hidden */
            dispatch(fetchMovies(searchQuery))
        } else {
            /** implementation of api service must be hidden */
            dispatch(fetchMovies())
        }
    }

    const viewTrailer = (movie) => {
        getMovie(movie.id)
        if (!videoKey) setOpen(true)
        setOpen(true)
    }

    const getMovie = async (id) => {
        setVideoKey(null)
        /** implementation of api service must be hidden  */
        const videoData = await fetchMovieDetails(id)

        if (videoData.videos && videoData.videos.results.length) {
            const trailer = videoData.videos.results.find(
                (vid) => vid.type === 'Trailer'
            )
            setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className="App">
            <Header
                searchMovies={searchMovies}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />

            <div className="container">
                {videoKey ? (
                    <YouTubePlayer videoKey={videoKey} />
                ) : (
                    <div style={{ padding: '30px' }}>
                        <h6>no trailer available. Try another movie</h6>
                    </div>
                )}

                <Routes>
                    <Route
                        path={ROUTES.HOME}
                        element={
                            <Movies
                                movies={movies}
                                viewTrailer={viewTrailer}
                                closeCard={closeCard}
                            />
                        }
                    />
                    <Route
                        path={ROUTES.STARRED}
                        element={<Starred viewTrailer={viewTrailer} />}
                    />
                    <Route
                        path={ROUTES.WATCH_LATER}
                        element={<WatchLater viewTrailer={viewTrailer} />}
                    />
                    <Route
                        path="*"
                        element={<h1 className="not-found">Page Not Found</h1>}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
