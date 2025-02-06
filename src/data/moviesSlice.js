import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getSearchMoviesApiUrl,
    getDiscoverMoviesApiUrl
} from '../utils/apiEndpoints'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ query, page = 1 }, { rejectWithValue }) => {
        try {
            const apiUrl = query
                ? `${getSearchMoviesApiUrl({ query, page })}`
                : `${getDiscoverMoviesApiUrl({ page })}`

            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        currentPage: 1,
        totalPages: 0,
        fetchStatus: ''
    },
    reducers: {
        resetMovies: (state) => {
            state.movies = []
            state.currentPage = 1
            state.totalPages = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = [...state.movies, ...action.payload.results]
                state.currentPage = action.payload.page
                state.totalPages = action.payload.total_pages
                state.fetchStatus = 'success'
            })
            .addCase(fetchMovies.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    }
})

export const { resetMovies } = moviesSlice.actions
export default moviesSlice
