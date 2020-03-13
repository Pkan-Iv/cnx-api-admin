import React, { createContext, useContext, useEffect, useState } from "react"
import createAuthClient from "@auth0/auth0-spa-js"

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState( {}, document.title, window.location.pathname)

export const AuthContext = createContext()
export const useAuth0 = () => useContext(AuthContext)
export const AuthProvider = ( {
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
} ) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(),
        [ user, setUser ] = useState(),
        [ authClient, setAuth ] = useState(),
        [ loading, setLoading ] = useState(true),
        [ popupOpen, setPopupOpen ] = useState(false)

  useEffect( () => {
    const initAuth = async () => {
      const authFromHook = await createAuthClient(initOptions)
      setAuth(authFromHook)

      if (window.location.search.includes("code=") &&
          window.location.search.includes("state=")) {
        const { appState } = await authFromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await authFromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await authFromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await authClient.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await authClient.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await authClient.handleRedirectCallback()
    const user = await authClient.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => authClient.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => authClient.loginWithRedirect(...p),
        getTokenSilently: (...p) => authClient.getTokenSilently(...p),
        getTokenWithPopup: (...p) => authClient.getTokenWithPopup(...p),
        logout: (...p) => authClient.logout(...p)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}