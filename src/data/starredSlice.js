import { createSlice } from '@reduxjs/toolkit'

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: {}
    },
    reducers: {
        starMovie: (state, action) => {
            const movie = action.payload
            state.starredMovies[movie.id] = movie
        },
        unstarMovie: (state, action) => {
            delete state.starredMovies[action.payload]
        },
        clearAllStarred: (state) => {
            state.starredMovies = {}
        }
    }
})

export const selectStarredMoviesList = (state) =>
    Object.values(state.starred.starredMovies)

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions

export default starredSlice
