import { API_KEY, API_ENDPOINT } from '../constants/apiEndpoints'

/** approach is still far from perfect, but at least components are isolated from such a low-level stuff as env variables */
export const getDiscoverMoviesApiUrl = ({ page }) =>
    `${API_ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`

export const getSearchMoviesApiUrl = ({ query, page }) =>
    `${API_ENDPOINT}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`

export const fetchMovieDetails = async (id) => {
    const response = await fetch(
        `${API_ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    )

    return response.json()
}
