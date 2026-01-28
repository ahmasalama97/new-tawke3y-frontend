import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { Box, Typography } from "@mui/material"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"
import LogoImg from "../../assets/AppIcon.png"
import { auth } from "../../firebase.config"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const ForgetPasswordWithPhone = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { lang } = useContext(LanguageContext)

  const [disabled, setDisabled] = useState(true)
  const [disabledCode, setDisabledCode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showOtp, setShowOTP] = useState(false)

  const regexCode = /^([0-9\-+]){1,6}$/i

  const [forgetPasswordPayload, setForgetPasswordPayload] = useState({
    mobile: "",
  })

  const [verifyPayload, setVerifyPayload] = useState({
    code: "",
  })

  useEffect(() => {
    if (
      forgetPasswordPayload.mobile &&
      forgetPasswordPayload.mobile.length === 11
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [forgetPasswordPayload.mobile])

  useEffect(() => {
    if (verifyPayload.code && regexCode.test(verifyPayload.code)) {
      setDisabledCode(false)
    } else {
      setDisabledCode(true)
    }
  }, [verifyPayload.code, regexCode])

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          onSignUp()
        },
      },
      auth,
    )
  }

  const onSignUp = () => {
    setIsLoading(true)
    onCaptchaVerify()
    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(
      auth,
      "+2" + forgetPasswordPayload.mobile,
      appVerifier,
    )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        setIsLoading(false)
        setShowOTP(true)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const onOTPVerify = () => {
    window.confirmationResult.confirm(verifyPayload.code).then(async (res) => {
      if (res) {
        enqueueSnackbar(lang.codeverified, { variant: "success" })
        navigate("/reset-password-phone", {
          state: { mobile: forgetPasswordPayload.mobile || "" },
        })
      } else {
        enqueueSnackbar(lang.invalidcode, { variant: "warning" })
      }
    })
  }

  return (
    <Box sx={styles.container}>
      <div id="recaptcha-container" class="justify-center flex"></div>
      {isLoading && <CircularLoader />}
      <Box component="img" sx={styles.logoImage} alt="logo" src={LogoImg} />
      <Typography sx={styles.logoTitle}>
        {!showOtp ? lang.forget : lang.verifymsg}
      </Typography>
      {!showOtp && (
        <>
          <Box sx={styles.textFieldContainer}>
            <TextInputComponent
              textStyle={{ color: "#fff" }}
              name={lang.mobile}
              type="phone"
              value={forgetPasswordPayload.mobile}
              refState={(e) => {
                var temppayload = { ...forgetPasswordPayload }
                temppayload.mobile = e.target.value
                setForgetPasswordPayload({ ...temppayload })
              }}
              helperText={lang.invalidmobile}
              required
            />
          </Box>
          <PrimaryBtn
            title={lang.send}
            btnStyle={styles.primaryBtn}
            disabled={disabled || isLoading}
            onClick={() => onSignUp()}
          />
        </>
      )}
      {showOtp && (
        <>
          <Box>
            <Typography style={styles.content}>{lang.verifymsg}</Typography>
            <Typography style={styles.emailAddress}>
              {" "}
              {forgetPasswordPayload.mobile}
            </Typography>
          </Box>
          <Box sx={styles.textFieldContainer}>
            <TextInputComponent
              textStyle={{ color: "#fff" }}
              name={lang.verifycode}
              type="code"
              value={verifyPayload.code}
              refState={(e) => {
                var temppayload = { ...verifyPayload }
                temppayload.code = Number(e.target.value)
                setVerifyPayload({ ...temppayload })
              }}
              required
            />
          </Box>
          <PrimaryBtn
            title={lang.verify}
            btnStyle={styles.primaryBtn}
            disabled={disabledCode || isLoading}
            onClick={() => onOTPVerify()}
          />
        </>
      )}
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
  content: {
    marginTop: 20,
    color: "#fff",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  emailAddress: {
    marginTop: 20,
    marginBottom: 20,
    color: "#fff",
    alignSelf: "center",
  },
}
export default ForgetPasswordWithPhone
