import starredSlice from '../data/starredSlice'
import { moviesMock } from './movies.mocks'

describe('starredSlice test', () => {
    const state = { starredMovies: {} }

    it('should set an initial state', () => {
        const initialState = state
        const action = { type: '' }
        const result = starredSlice.reducer(initialState, action)
        expect(result).toEqual({ starredMovies: {} })
    })

    it('should add movie to starred', () => {
        const initialState = { ...state, starredMovies: {} }
        const action = starredSlice.actions.starMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)

        expect(result.starredMovies[moviesMock[0].id]).toBe(moviesMock[0])
        expect(Object.keys(result.starredMovies).length).toBe(1)
    })

    it('should remove movie from starred', () => {
        const initialState = {
            ...state,
            starredMovies: moviesMock.reduce(
                (acc, movie) => ({ ...acc, [movie.id]: movie }),
                {}
            )
        }

        const action = starredSlice.actions.unstarMovie(moviesMock[0].id)
        const result = starredSlice.reducer(initialState, action)

        expect(result.starredMovies[moviesMock[0].id]).toBeUndefined()
        expect(Object.keys(result.starredMovies).length).toBe(
            moviesMock.length - 1
        )
    })

    it('should remove all movies', () => {
        const initialState = {
            ...state,
            starredMovies: moviesMock.reduce(
                (acc, movie) => ({ ...acc, [movie.id]: movie }),
                {}
            )
        }

        const action = starredSlice.actions.clearAllStarred()
        const result = starredSlice.reducer(initialState, action)
        expect(Object.keys(result.starredMovies).length).toEqual(0)
    })
})
