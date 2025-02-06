import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getSearchMoviesApiUrl,
    getDiscoverMoviesApiUrl
} from '../utils/apiEndpoints'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (query, { rejectWithValue }) => {
        try {
            const apiUrl = query
                ? getSearchMoviesApiUrl(query)
                : getDiscoverMoviesApiUrl()
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
        fetchStatus: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload
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

export default moviesSlice
