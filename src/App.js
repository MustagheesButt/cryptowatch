import { useRoutes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"
import Post from "./pages/Post"
import About from "./pages/About"
import './styles/globals.css'

const queryClient = new QueryClient()

const App = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/:lang', element: <Home /> },
    { path: '/:lang/:slug', element: <Post /> },
    { path: '/:lang/about', element: <About /> }
  ]

  let element = useRoutes(routes)

  return (
    <QueryClientProvider client={queryClient}>
      {element}
    </QueryClientProvider>
  )
}

export default App
