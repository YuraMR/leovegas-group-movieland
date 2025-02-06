import { createSlice } from '@reduxjs/toolkit'

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState: {
        watchLaterMovies: {}
    },
    reducers: {
        addToWatchLater: (state, action) => {
            const movie = action.payload
            state.watchLaterMovies[movie.id] = movie
        },
        removeFromWatchLater: (state, action) => {
            delete state.watchLaterMovies[action.payload]
        },
        removeAllWatchLater: (state) => {
            state.watchLaterMovies = {}
        }
    }
})

export default watchLaterSlice
