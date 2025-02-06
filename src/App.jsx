import { useEffect } from 'react'
import {
    createSearchParams,
    useSearchParams,
    useNavigate
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import 'reactjs-popup/dist/index.css'

import { fetchMovies, resetMovies } from './data/moviesSlice'
import Header from './components/Header'
import ROUTES from './constants/routes'
import './app.scss'
import AppRouter from './AppRouter'

const App = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')
    const navigate = useNavigate()

    const getSearchResults = (query) => {
        dispatch(resetMovies())

        if (query !== '') {
            /** implementation of api service must be hidden */
            dispatch(fetchMovies({ query, page: 1 }))
            setSearchParams(createSearchParams({ search: query }))
        } else {
            /** implementation of api service must be hidden */
            dispatch(fetchMovies({ query: '', page: 1 }))
            setSearchParams()
        }
    }

    const searchMovies = (query) => {
        navigate(ROUTES.HOME)
        getSearchResults(query)
    }

    useEffect(() => {
        dispatch(fetchMovies({ query: searchQuery || '', page: 1 }))
    }, [dispatch, searchQuery])

    return (
        <div className="App">
            <Header searchMovies={searchMovies} />

            <div className="container">
                <AppRouter />
            </div>
        </div>
    )
}

export default App
