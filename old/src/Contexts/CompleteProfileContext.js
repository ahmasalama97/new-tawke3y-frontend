import { useState, createContext, useContext } from "react"
import { UserInfoProfile_API, VerifyUserAccount_API } from "../APIs/API"
import { useMutation, useQuery } from "react-query"
import { LanguageContext } from "./LanguageContext"
import { useSnackbar } from "notistack"
import { useNavigate, useParams } from "react-router-dom"

export const CompleteProfileContext = createContext()

export const CompleteProfileContextprovider = (props) => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const [submitbuttonloadingcontext, setsubmitbuttonloadingcontext] =
    useState(false)

  const [
    completeProfilepayloadobjContext,
    setCompleteProfilepayloadobjContext,
  ] = useState({
    id: "",
    idnumber: "",
    mothername: "",
    birthdate: "",
    idcard: "",
    profileimage: "",
  })

  const submitprofilecontext = async (id) => {
    const data = new FormData()
    const blob = await fetch(
      completeProfilepayloadobjContext.profileimage,
    ).then((res) => res.blob())
    data.append("id", id)
    data.append("idnumber", completeProfilepayloadobjContext.idnumber)
    data.append("mothername", completeProfilepayloadobjContext.mothername)
    data.append("birthdate", completeProfilepayloadobjContext.birthdate)
    data.append("idcard", completeProfilepayloadobjContext.idcard)
    data.append("profileimage", blob)
    completeProfileContextMutation.mutate(data)
  }

  const completeProfileContextMutation = useMutation("UserInfoProfile_API", {
    mutationFn: UserInfoProfile_API,
    onMutate: () => {
      setsubmitbuttonloadingcontext(true)
    },
    onError: () => {
      setsubmitbuttonloadingcontext(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setsubmitbuttonloadingcontext(false)
      if (data.data.status) {
        enqueueSnackbar(lang.completeprofileSuccess, { variant: "success" })
        navigate("/home")
      } else {
        enqueueSnackbar(
          language === "english" ? data.data.reason : data.data.reasonAr,
          { variant: "warning" },
        )
      }
    },
  })
  const verifyUserContextMutation = useMutation("VerifyUserAccount_API", {
    mutationFn: VerifyUserAccount_API,
    onMutate: () => {
      setsubmitbuttonloadingcontext(true)
    },
    onError: () => {
      setsubmitbuttonloadingcontext(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setsubmitbuttonloadingcontext(false)
      if (data.data.status) {
        enqueueSnackbar(lang.completeprofileSuccess, { variant: "success" })
        navigate("/home")
      } else {
        enqueueSnackbar(
          language === "english" ? data.data.reason : data.data.reasonAr,
          { variant: "warning" },
        )
      }
    },
  })

  return (
    <CompleteProfileContext.Provider
      value={{
        completeProfilepayloadobjContext,
        setCompleteProfilepayloadobjContext,
        submitprofilecontext,
        setsubmitbuttonloadingcontext,
        submitbuttonloadingcontext,
        verifyUserContextMutation,
      }}>
      {props.children}
    </CompleteProfileContext.Provider>
  )
}
export const CompleteProfileContextConsumer = CompleteProfileContext.Consumer
