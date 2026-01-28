import { useContext, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { Box, Typography } from "@mui/material"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { ResetPassword_API } from "../../APIs/API"
import LogoImg from "../../assets/AppIcon.png"

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/

  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [resetPasswordPayload, setResetPasswordPayload] = useState({
    email: location?.state?.email,
    password: "",
    confirmpassword: "",
  })

  useEffect(() => {
    if (
      resetPasswordPayload.password === resetPasswordPayload.confirmpassword &&
      resetPasswordPayload.password.length !== 0 &&
      resetPasswordPayload.confirmpassword.length !== 0 &&
      regexPassword.test(resetPasswordPayload.password) &&
      regexPassword.test(resetPasswordPayload.confirmpassword)
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [
    resetPasswordPayload.password,
    resetPasswordPayload.confirmpassword,
    regexPassword,
  ])

  const ResetPasswordMutation = useMutation("ResetPassword_API", {
    mutationFn: ResetPassword_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, "error")
    },
    onSuccess: (data) => {
      enqueueSnackbar(lang.passwordupdated, "success")
      setIsLoading(false)
      if (data.data.status) {
        navigate("login")
      } else {
        enqueueSnackbar(
          language === "english" ? data.data.reason : data.data.reasonAr,
          "warning",
        )
      }
    },
  })

  return (
    <Box sx={styles.container}>
      {isLoading && <CircularLoader />}
      <Box component="img" sx={styles.logoImage} alt="logo" src={LogoImg} />
      <Typography sx={styles.logoTitle}>{lang.resetPassword}</Typography>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.password}
          type="password"
          value={resetPasswordPayload.password}
          refState={(e) => {
            var temppayload = { ...resetPasswordPayload }
            temppayload.password = e.target.value
            setResetPasswordPayload({ ...temppayload })
          }}
          helperText={
            <Box>
              <Typography>{lang.upperlowernumbervalidation}</Typography>
              <Typography>{lang.specialcharsvalidation}</Typography>
              <Typography>{lang.from6to12validation}</Typography>
            </Box>
          }
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.confirm}
          type="password"
          value={resetPasswordPayload.confirmpassword}
          refState={(e) => {
            var temppayload = { ...resetPasswordPayload }
            temppayload.confirmpassword = e.target.value
            setResetPasswordPayload({ ...temppayload })
          }}
          helperText={
            <Box>
              <Typography>{lang.upperlowernumbervalidation}</Typography>
              <Typography>{lang.specialcharsvalidation}</Typography>
              <Typography>{lang.from6to12validation}</Typography>
            </Box>
          }
          required
        />
      </Box>
      <PrimaryBtn
        title={lang.save}
        btnStyle={styles.primaryBtn}
        disabled={disabled || isLoading}
        onClick={() => ResetPasswordMutation.mutate(resetPasswordPayload)}
      />
    </Box>
  )
}
const styles = {
  container: {
    backgroundColor: "#042f36",
    height: "100%",
    "min-height": "100vh",
  },
  logoImage: {
    marginTop: 10,
    width: "12.6875rem",
  },
  logoTitle: {
    fontSize: "45px",
    fontWeight: 500,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "cursive",
  },
  textFieldContainer: {
    marginTop: 2,
    marginLeft: { xs: 8, md: 8, lg: 30 },
    marginRight: { xs: 8, md: 8, lg: 30 },
  },
  primaryBtn: {
    marginTop: 5,
    width: 200,
    textTransform: "capitalize",
    backgroundColor: "#fff",
    borderColor: "#fff",
    height: "40px",
    color: "#042f36",
    "&:disabled": {
      opacity: 0.5,
      backgroundColor: "#fff",
      borderColor: "#fff",
      color: "#042f36",
    },
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#fff",
      borderColor: "#fff",
      color: "#042f36",
    },
  },
  textBtn: {
    marginTop: 5,
    paddingBottom: 5,
    alignSelf: "center",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}
export default ResetPassword
