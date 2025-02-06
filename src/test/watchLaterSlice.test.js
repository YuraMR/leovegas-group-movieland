import watchLaterSlice from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

describe('watchLaterSlice test', () => {
    const state = { watchLaterMovies: {} }

    it('should set initial state', () => {
        const initialState = state
        const action = { type: '' }
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result).toEqual({ watchLaterMovies: {} })
    })

    it('should add movie to watch later', () => {
        const initialState = { ...state, watchLaterMovies: {} }
        const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)

        // Ensure the movie is added to the object with its ID as the key
        expect(result.watchLaterMovies[moviesMock[0].id]).toBe(moviesMock[0])
        expect(Object.keys(result.watchLaterMovies).length).toBe(1)
    })

    it('should remove movie from watch later', () => {
        const initialState = {
            ...state,
            watchLaterMovies: moviesMock.reduce(
                (acc, movie) => ({ ...acc, [movie.id]: movie }),
                {}
            )
        }

        const action = watchLaterSlice.actions.removeFromWatchLater(
            moviesMock[0].id
        )
        const result = watchLaterSlice.reducer(initialState, action)

        // Ensure the movie is removed
        expect(result.watchLaterMovies[moviesMock[0].id]).toBeUndefined()
        expect(Object.keys(result.watchLaterMovies).length).toBe(
            moviesMock.length - 1
        )
    })

    it('should remove all movies', () => {
        const initialState = {
            ...state,
            watchLaterMovies: moviesMock.reduce(
                (acc, movie) => ({ ...acc, [movie.id]: movie }),
                {}
            )
        }

        const action = watchLaterSlice.actions.removeAllWatchLater()
        const result = watchLaterSlice.reducer(initialState, action)
        expect(Object.keys(result.watchLaterMovies).length).toEqual(0)
    })
})
