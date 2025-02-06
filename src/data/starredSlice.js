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

export default starredSlice
