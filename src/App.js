import { useRoutes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
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
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider) }>
      <QueryClientProvider client={queryClient}>
        {element}
      </QueryClientProvider>
    </Web3ReactProvider>
  )
}

export default App
