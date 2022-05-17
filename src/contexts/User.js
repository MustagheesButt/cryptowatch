import { createContext, useReducer, useContext, useCallback, useMemo, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"

const LOGIN = 'LOGIN'

const UserContext = createContext()

export function useUserContext() {
  return useContext(UserContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case LOGIN: {
      const { user } = payload

      return {
        ...state,
        user: {
          ...user
        }
      }
    }

    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

const INITIAL_STATE = { }

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const login = useCallback(() => {
    dispatch({
      type: LOGIN,
      payload: {
        user: {
          id: 1,
          email: "renald@gmail.com",
          fullName: "Mustaghees Butt",
          account: "0x123487651111"
        }
      }
    })
  }, [])

  return (
    <UserContext.Provider value={useMemo(
      () => [
        state,
        { login }
      ], [state, login])}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const [state] = useUserContext()

  return state?.user
}

export function useUserLogin() {
  const [state, { login }] = useUserContext()
  const { active, account, activate } = useWeb3React()

  async function loginRequest() {
    if (!active) {
      await activate(new InjectedConnector({}))
    }
    if (!state.user) {
      login()
    }
  }

  useEffect(() => {
    console.log("AC: " + account)
  }, [account])

  return { user: state.user, login: loginRequest }
}

export function useUserLogout() {
  const { deactivate } = useWeb3React()
  return deactivate
}

// const login = (account) => {
//   if (!account) throw new Error("Invalid Account")

//   return fetch(`${process.env.REACT_APP_API_URL}cw/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ wallet_address: account })
//   })
// }