import { Player } from "@lottiefiles/react-lottie-player"

export const Loader = () => {
  return (
    <div className="loader flex flex-col items-center">
      <Player src="https://assets9.lottiefiles.com/packages/lf20_t9gkkhz4.json" background="transparent" speed="1" style={{width: "300px", height: "300px"}} loop autoplay></Player>
      <span>Loading...</span>
    </div>
  )
}