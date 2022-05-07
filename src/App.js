import { useRoutes } from "react-router-dom"
import Home from "./pages/Home"
import Post from "./pages/Post"
import About from "./pages/About"
import './styles/globals.css'

const App = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/:lang', element: <Home /> },
    { path: '/:lang/:slug', element: <Post /> },
    { path: '/:lang/about', element: <About /> }
  ]

  let element = useRoutes(routes)

  return (
    <div>{element}</div>
  )
}

export default App
