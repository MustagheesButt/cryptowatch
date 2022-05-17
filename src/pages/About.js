import { Player } from "@lottiefiles/react-lottie-player"
import { useParams } from "react-router-dom"
import { Layout } from "../components/layout"
import { getRes } from "../services/i18n"

export const About = () => {
  const params = useParams()
  return (
    <>
      <Layout>
        <section className="text-center my-20 mx-auto w-3/4 md:w-2/3">
          <h1 className="text-5xl font-bold mb-10">{getRes(params.lang, 'pages.about.title')}</h1>
          <h2 className="text-3xl text-gray-500 dark:text-gray-400 font-medium">{getRes(params.lang, 'pages.about.subtitle')}</h2>
          <Player src="https://assets8.lottiefiles.com/packages/lf20_m9zragkd.json" background="transparent" speed="1" style={{width: "100%", height: "400px"}} autoplay loop />
        </section>
      </Layout>
    </>
  )
}

export default About