import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import LogoImg from "../../assets/AppIcon.png"
import { useMutation } from "react-query"
import { Login_API } from "../../APIs/API"
import { useSnackbar } from "notistack"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"

const Login = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const regexMail = /\S+@\S+\.\w{2,}/
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/

  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (
      loginPayload.email &&
      loginPayload.password &&
      regexMail.test(loginPayload.email) &&
      regexPassword.test(loginPayload.password)
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [loginPayload.email, loginPayload.password, regexMail, regexPassword])

  const LoginMutation = useMutation("Login_API", {
    mutationFn: Login_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data?.data?.status) {
        if (
          data?.data?.role === "user" &&
          data?.data?.userstatus === "Validated"
        ) {
          enqueueSnackbar(lang.welcomeback, { variant: "success" })
          navigate("/contracts")
          sessionStorage.setItem("user", JSON.stringify(data.data))
        }
        if (data?.data?.role === "company") {
          enqueueSnackbar(lang.welcomeback, { variant: "success" })
          navigate("/my-contracts")
          sessionStorage.setItem("user", JSON.stringify(data.data))
        }
        if (data?.data?.emailvalidation === "0") {
          sessionStorage.setItem("user", JSON.stringify(data.data))
          navigate("/verify", { state: { email: data?.data?.email } })
        } else if (
          data?.data?.role === "user" &&
          data?.data?.signvalidation === "0" &&
          data?.data?.userstatus === "Pending"
        ) {
          sessionStorage.setItem("user", JSON.stringify(data.data))
          navigate(`/complete-profile/${data?.data?.id}`, {
            state: { email: data?.data?.email },
          })
        }
      } else {
        enqueueSnackbar(
          language === "english" ? data?.data?.reason : data?.data?.reasonAr,
          { variant: "warning" },
        )
      }
    },
  })

  return (
    <Box sx={styles.container}>
      {isLoading && <CircularLoader />}
      <Box component="img" sx={styles.logoImage} alt="logo" src={LogoImg} />
      <Typography sx={styles.logoTitle}>{lang.tawke3y}</Typography>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.email}
          type="email"
          value={loginPayload.email}
          refState={(e) => {
            var temppayload = { ...loginPayload }
            temppayload.email = e.target.value
            setLoginPayload({ ...temppayload })
          }}
          helperText={lang.incorrectemail}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.password}
          type="password"
          value={loginPayload.password}
          refState={(e) => {
            var temppayload = { ...loginPayload }
            temppayload.password = e.target.value
            setLoginPayload({ ...temppayload })
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
      <Typography
        sx={styles.textBtn}
        onClick={() => navigate("/verify-method")}>
        {lang.forget}
      </Typography>
      <PrimaryBtn
        title={lang.signin}
        btnStyle={styles.primaryBtn}
        disabled={disabled || isLoading}
        onClick={() => LoginMutation.mutate(loginPayload)}
      />
      <Typography
        sx={{
          ...styles.textBtn,
          ...{
            paddingBottom: 5,
          },
        }}
        onClick={() => navigate("/register")}>
        {`${lang.donot} ${lang.register}`}
      </Typography>
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
  },
  textFieldContainer: {
    marginTop: 2,
    marginLeft: { xs: 1.5, md: 8, lg: 30 },
    marginRight: { xs: 1.5, md: 8, lg: 30 },
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
    alignSelf: "center",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
  },
}
export default Login
