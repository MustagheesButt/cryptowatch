import { useParams } from "react-router-dom"
import { getRes } from "../services/i18n"
import { I18nLink } from "./i18nlink"

export const Layout = ({ children }) => {
  const params = useParams()

  return (
    <>
      <header className="py-5 px-10">
        <div className="flex justify-between items-center">
          <I18nLink to={`/`} className='text-blue-600'>CryptoWatch</I18nLink>
          <nav className="">
            {/* <Link to={'/observer'}><a className='mr-5'>Observer</a></Link>
            <Link to={'/quiz'}><a className='mr-5'>Quiz</a></Link>
            <Link to={'/login'}><a className='mr-5'>Login</a></Link> */}
            <I18nLink to={'/about'} className='mr-5 hover:text-gray-100'>{getRes(params.lang, 'nav.about')}</I18nLink>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>

      <footer className="p-5">
        &copy; Copyright {new Date().getFullYear()}, CryptoWatch.
      </footer>
    </>
  )
}