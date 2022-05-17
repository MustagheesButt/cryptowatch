import { Link, useParams } from "react-router-dom"

export const I18nLink = ({ to, children, ...props }) => {
  let { lang } = useParams()

  if (!lang) lang = 'en'

  return (
    <Link to={`/${lang}${to}`} {...props}>{children}</Link>
  )
}