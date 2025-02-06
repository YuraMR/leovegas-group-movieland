import { useEffect } from 'react'
import {
    createSearchParams,
    useSearchParams,
    useNavigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'

import { fetchMovies } from './data/moviesSlice'
import Header from './components/Header'
import YouTubePlayer from './components/YoutubePlayer'
import ROUTES from './constants/routes'
import './app.scss'
import AppRouter from './AppRouter'

const App = () => {
    const dispatch = useDispatch()
    const { videoKey } = useSelector((state) => state.trailer)

    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')
    const navigate = useNavigate()

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

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className="App">
            <Header searchMovies={searchMovies} />

            <div className="container">
                {videoKey ? (
                    <YouTubePlayer videoKey={videoKey} />
                ) : (
                    <div style={{ padding: '30px' }}>
                        <h6>no trailer available. Try another movie</h6>
                    </div>
                )}
                <AppRouter />
            </div>
        </div>
    )
}

export default App
