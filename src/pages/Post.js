import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Layout } from "../components/layout"
import styles from '../styles/Post.module.css'

export const Post = () => {
  const params = useParams()

  const fetchPost = async (slug) => {
    if (!slug) throw new Error('Invalid slug')

    const response = await fetch(`${process.env.REACT_APP_API_URL}wp/v2/posts/?slug=${params.slug}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  const fetchAuthor = async (author_id) => {
    if (!author_id) throw new Error('Invalid Author ID')

    const response = await fetch(`${process.env.REACT_APP_API_URL}wp/v2/users/${author_id}`)
    if (!response.ok) {
      throw new Error('Network response not ok')
    }
    return response.json()
  }

  const { isLoading, data: posts } = useQuery(['posts', params.slug], () => fetchPost(params.slug))
  const post = posts?.length > 0 ? posts[0] : undefined
  const { data: author } = useQuery(['author', post], () => fetchAuthor(post?.author))

  return (
    <>
      <Layout>
        {isLoading ? "loading" : (
          <>
            <article className={`${styles.article} font-serif p-10 w-full md:w-2/3 m-auto`}>
              <div>
                By {author?.name} . 5 min read
              </div>
              <h1 className="title">{post.title.rendered}</h1>
              <p dangerouslySetInnerHTML={{ __html: (post.content.rendered) }} />
            </article>

            <div className="border-b-2 w-1/3 mx-auto"></div>

            <CommentsSection post={post} />
          </>
        )}
      </Layout>
    </>
  )
}

const CommentsSection = ({ post }) => {
  const fetchComments = async (pid) => {
    if (!pid) throw new Error('Invalid PID')

    const response = await fetch(`${process.env.REACT_APP_API_URL}wp/v2/comments?post=${pid}`)
    if (!response.ok) {
      throw new Error('Network response not ok')
    }

    return response.json()
  }

  const { isLoading: commentsLoading, data: comments } = useQuery(['comments', post], () => fetchComments(post.id))

  return (
    <div className="m-10">
      <textarea className="w-full px-3 py-2 border rounded-lg focus:outline-none mb-3 bg-transparent" rows="4" placeholder="Leave your comments"></textarea>
      <button className="bg-blue-600 text-gray-200 rounded hover:bg-blue-500 px-4 py-2 focus:outline-none">Post</button>
      <h2 className="text-3xl font-medium my-5">{comments?.length} thoughts on {post.title.rendered}</h2>
      {
        commentsLoading ? "Loading..." : comments.map((comment) => {
          return (
            <div key={comment.id} className='mb-5'>
              <h3 className="font-bold">{comment.author_name}</h3>
              <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Post