import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import { Layout } from "../components/layout"

export default function Home() {
  useEffect(() => {
    if (window.location.pathname === '/')
      window.location = '/en/'
  })

  const { lang } = useParams()

  const fetchPosts = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "wp/v2/posts")
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  const { isLoading, isError, data: posts } = useQuery(['posts'], fetchPosts)

  const renderedPosts = (posts) => posts.map(p => {
    return (
      <Link to={`/${lang}/${p.slug}`} key={`${p.id}`}>
          <div className='rounded p-5 bg-white dark:bg-slate-900 hover:bg-blue-100 hover:dark:bg-blue-900'>
            <h3 className='text-2xl mb-2'>{p.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
          </div>
      </Link>
    )
  })

  return (
    <>
      <Layout>
        <section className='p-10 bg-blue-200 dark:bg-blue-900'>
          <h1 className='text-4xl mb-10'>CryptoWatch</h1>
          <h2 className='text-3xl mb-10'>Your #1 news source for everything Crypto, NFTs, Metaverse, Web 3.0 related to Pakistan.</h2>
        </section>

        <section className='p-10'>
          <h3 className='text-3xl mb-5'>Trending</h3>
        </section>

        <section className='p-10'>
          <h3 className='text-3xl mb-5'>Latest</h3>
          {isLoading ? 'loading...' : (isError ? 'failed' : renderedPosts(posts))}
        </section>
      </Layout>
    </>
  )
}
