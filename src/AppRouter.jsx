import { Route, Routes } from 'react-router-dom'
import ROUTES from './constants/routes'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'

const AppRouter = () => (
    <Routes>
        <Route path={ROUTES.HOME} element={<Movies />} />
        <Route path={ROUTES.STARRED} element={<Starred />} />
        <Route path={ROUTES.WATCH_LATER} element={<WatchLater />} />
        <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
        />
    </Routes>
)

export default AppRouter
