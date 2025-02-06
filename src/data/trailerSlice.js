import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMovieDetails } from '../utils/apiEndpoints'

const VIDEO_TYPES = {
    TRAILER: 'Trailer'
}

export const fetchTrailer = createAsyncThunk(
    'trailer/fetchTrailer',
    async (movieId, { rejectWithValue }) => {
        try {
            const videoData = await fetchMovieDetails(movieId)

            if (!videoData.videos?.results?.length) return null

            // Find trailer or fallback to the first video
            const trailer = videoData.videos.results.find(
                (vid) => vid.type === VIDEO_TYPES.TRAILER
            )
            return trailer ? trailer.key : videoData.videos.results[0].key
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const trailerSlice = createSlice({
    name: 'trailer',
    initialState: {
        videoKey: null,
        isOpen: false,
        status: 'idle',
        error: null
    },
    reducers: {
        closeTrailerModal: (state) => {
            state.isOpen = false
            state.videoKey = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrailer.pending, (state) => {
                state.status = 'loading'
                state.videoKey = null
                state.isOpen = true
                state.error = null
            })
            .addCase(fetchTrailer.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.videoKey = action.payload
                state.isOpen = !!action.payload
            })
            .addCase(fetchTrailer.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
                state.videoKey = null
                state.isOpen = false
            })
    }
})

export const { closeTrailerModal } = trailerSlice.actions

export default trailerSlice
