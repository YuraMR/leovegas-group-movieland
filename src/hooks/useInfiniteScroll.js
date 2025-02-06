import { useCallback, useEffect } from 'react'

const useInfiniteScroll = (loadMoreCallback) => {
    const handleScroll = useCallback(() => {
        const shouldLoadMore =
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight

        if (shouldLoadMore) {
            loadMoreCallback()
        }
    }, [loadMoreCallback])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])
}

export default useInfiniteScroll
