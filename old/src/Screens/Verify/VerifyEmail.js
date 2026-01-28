import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import LogoImg from "../../assets/AppIcon.png"
import { useMutation } from "react-query"
import { ResendCode_API, VerifyEmail_API } from "../../APIs/API"
import { useSnackbar } from "notistack"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [verifyPayload, setVerifyPayload] = useState({
    code: "",
    email: location?.state?.email || "",
  })

  useEffect(() => {
    if (verifyPayload.code && verifyPayload.email) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [verifyPayload.code, verifyPayload.email])

  const VerifyMutation = useMutation("VerifyEmail_API", {
    mutationFn: VerifyEmail_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        navigate("/reset-password", {
          state: { email: location?.state?.email || "" },
        })
        enqueueSnackbar(lang.codeverified, { variant: "success" })
      } else {
        enqueueSnackbar(
          language === "english" ? data?.data?.reason : data?.data?.reasonar,
          { variant: "warning" },
        )
      }
    },
  })

  const ResendMutation = useMutation("ResendEmailCode_API", {
    mutationFn: ResendCode_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        enqueueSnackbar(lang.emailverifysuccess, { variant: "success" })
      } else {
        enqueueSnackbar(lang.errorResponse, {
          variant: "warning",
        })
      }
    },
  })

  return (
    <Box sx={styles.container}>
      {isLoading && <CircularLoader />}
      <Box component="img" sx={styles.logoImage} alt="logo" src={LogoImg} />
      <Typography sx={styles.logoTitle}>{lang.verify}</Typography>
      <Box>
        <Typography style={styles.content}>{lang.verifymsg}</Typography>
        <Typography style={styles.emailAddress}>
          {" "}
          {location?.state?.email || ""}
        </Typography>
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.verifycode}
          type="number"
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
        disabled={disabled || isLoading}
        onClick={() => VerifyMutation.mutate(verifyPayload)}
      />
      <Typography
        sx={styles.textBtn}
        onClick={() =>
          ResendMutation.mutate({
            email: location?.state?.email || "",
          })
        }>
        {`${lang.code} ${lang.resend}`}
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
export default VerifyEmail
