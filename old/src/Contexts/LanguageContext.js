import { createContext, useEffect, useState } from "react"
import { english } from "../Utils/english"
import { arabic } from "../Utils/arabic"

const LanguageContext = createContext({})

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("english")
  const languageStorage = sessionStorage.getItem("language")
  useEffect(() => {
    if (languageStorage) {
      setLanguage(languageStorage)
    } else {
      setLanguage("english")
    }
  }, [languageStorage])

  const selectLanguage = (value) => {
    setLanguage(value)
    sessionStorage.setItem("language", value)
    window.location.reload()
  }
  let lang = {}
  if (language === "english") {
    lang = english
  } else if (language === "arabic") {
    lang = arabic
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        language,
        setLanguage,
        selectLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  )
}
const LanguageConsumer = LanguageContext.Consumer

export { LanguageProvider, LanguageConsumer, LanguageContext }
