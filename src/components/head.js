import { useEffect } from "react"

const Head = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | CryptoWatch` : "CryptoWatch"
    if (description) document.querySelector("meta[name=description]").innerHTML = description
  })

  return <></>
}

export default Head