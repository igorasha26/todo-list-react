import { useEffect, useState} from "react"
import TaskPage from "../../pages/TaskPage/TaskPage.jsx"
import {BASE_URL} from "@/shared/constants/index.js";

const getCurrentPath = () => {
    const pathname = window.location.pathname

    return pathname.startsWith(BASE_URL)
        ? pathname.slice(BASE_URL.length - 1) || '/'
        : pathname
}


const matchPath = (path, route) => {
    const pathParts = path.split('/')
    const routePaths = route.split('/')

    if(pathParts.length !== routePaths.length) {
        return null
    }

    const params = {}

    for (let i = 0; i < routePaths.length; i++) {
        if(routePaths[i].startsWith(':')) {
            const parmName = routePaths[i].slice(1)

            params[parmName] = pathParts[i]
        } else if(routePaths[i] !== pathParts[i]) {
            return null
        }
    }

    return params
}

export const useRoute = () => {
 const [path, setPath] = useState(getCurrentPath())

 useEffect(() => {
    const onLonationChange = () => {
        setPath(getCurrentPath())
    }

    window.addEventListener('popstate', onLonationChange)

    return () => {
        window.removeEventListener('popstate', onLonationChange)
    }
 }, [])

 return path
}

const Router = (props) => {

    const { routes } = props
    const path = useRoute()

    for(const route in routes) {
        const params = matchPath(path, route)

        if(params) {
            const Page = routes[route]

            return < Page params={params}/>
        }
    }

    const NotFound = routes['*']

    return <NotFound/>
}

export default Router