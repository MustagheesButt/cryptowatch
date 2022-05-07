import { Link, useParams } from "react-router-dom"

export const I18nLink = ({ to, children }) => {
  let { lang } = useParams()

  if (!lang) lang = 'en'

  return (
    <Link to={`/${lang}${to}`}>{children}</Link>
  )
}