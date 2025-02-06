import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTrailer } from '../data/trailerSlice'

const YoutubePlayer = ({ movieId }) => {
    const dispatch = useDispatch()
    const { videoKey } = useSelector((state) => state.trailer)

    useEffect(() => {
        if (movieId) {
            dispatch(fetchTrailer(movieId))
        }
    }, [])

    return (
        <ReactPlayer
            className="video-player"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls={true}
            playing={true}
            data-testid="youtube-player"
        />
    )
}

export default YoutubePlayer
