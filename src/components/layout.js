import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useUserLogin, useUserLogout } from "../contexts/User"
import { getRes } from "../services/i18n"
import { I18nLink } from "./i18nlink"

export const Layout = ({ children }) => {
  const { lang } = useParams()
  const { user, login } = useUserLogin()
  const logout = useUserLogout()

  useEffect(() => {
    document.body.lang = lang
    document.body.dir = lang === "en" ? "ltr" : "rtl"
  }, [lang])

  return (
    <>
      <header className="p-5 md:px-10">
        <div className="flex justify-between items-center">
          <I18nLink to={`/`} className="hover:text-gray-100">CryptoWatch</I18nLink>
          <nav className="">
            {/* <Link to={'/observer'}><a className='mr-5'>Observer</a></Link>
            <Link to={'/quiz'}><a className='mr-5'>Quiz</a></Link> */}
            {/* <button className='mr-5' onClick={() => setShowLoginModal(!showLoginModal)}>{getRes(lang, 'nav.login')}</button> */}
            {!user ?
              <button className='mr-5 hover:text-gray-100' onClick={login}>{getRes(lang, 'nav.login')}</button>
              :
              <>
                <span className="mr-5">{user.account.substring(0, 6)}...{user.account.substring(user.account.length - 4)}</span>
                <button onClick={logout} className="mr-5 hover:text-gray-100">{getRes(lang, 'nav.logout')}</button>
              </>
            }
            <I18nLink to={'/about'} className='mr-5 hover:text-gray-100'>{getRes(lang, 'nav.about')}</I18nLink>
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