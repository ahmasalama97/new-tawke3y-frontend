import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { Box, Typography } from "@mui/material"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import LogoImg from "../../assets/AppIcon.png"
import { CreateUser_API } from "../../APIs/API"
import { useMutation } from "react-query"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"

const Register = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { lang } = useContext(LanguageContext)

  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/

  const [registerPayload, setRegisterPayload] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    role: "user",
    emailvalidation: 0,
    signvalidation: 0,
    password: "",
    confirmpassword: "",
    userstatus: "Pending",
  })

  useEffect(() => {
    if (
      registerPayload.name &&
      registerPayload.username &&
      registerPayload.email &&
      registerPayload.password &&
      registerPayload.confirmpassword &&
      registerPayload.password === registerPayload.confirmpassword &&
      regexPassword.test(registerPayload.password) &&
      regexPassword.test(registerPayload.confirmpassword)
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [
    registerPayload.name,
    registerPayload.username,
    registerPayload.email,
    registerPayload.password,
    registerPayload.confirmpassword,
    regexPassword,
  ])

  const RegisterMutation = useMutation("CreateUser_API", {
    mutationFn: CreateUser_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar("Something Went Wrong!", { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        enqueueSnackbar(data.data.message, { variant: "success" })
        navigate("/Login")
      } else {
        enqueueSnackbar(data.data.reason, { variant: "warning" })
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
          name={lang.fullname}
          type="text"
          value={registerPayload.name}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.name = e.target.value
            setRegisterPayload({ ...temppayload })
          }}
          helperText={lang.incorrectinput}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.user}
          type="text"
          value={registerPayload.username}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.username = e.target.value
            setRegisterPayload({ ...temppayload })
          }}
          helperText={lang.incorrectinput}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.email}
          type="email"
          value={registerPayload.email}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.email = e.target.value
            setRegisterPayload({ ...temppayload })
          }}
          helperText={lang.incorrectemail}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.mobile}
          type="phone"
          value={registerPayload.mobile}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.mobile = e.target.value
            setRegisterPayload({ ...temppayload })
          }}
          helperText={lang.invalidmobile}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.address}
          type="text"
          value={registerPayload.address}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.address = e.target.value
            setRegisterPayload({ ...temppayload })
          }}
          helperText={lang.incorrectinput}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.password}
          type="password"
          value={registerPayload.password}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.password = e.target.value
            setRegisterPayload({ ...temppayload })
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
          value={registerPayload.confirmpassword}
          refState={(e) => {
            var temppayload = { ...registerPayload }
            temppayload.confirmpassword = e.target.value
            setRegisterPayload({ ...temppayload })
          }}
          helperText={
            registerPayload.password !== registerPayload.confirmpassword ? (
              lang.passwordmatchesconfirm
            ) : (
              <Box>
                <Typography>{lang.upperlowernumbervalidation}</Typography>
                <Typography>{lang.specialcharsvalidation}</Typography>
                <Typography>{lang.from6to12validation}</Typography>
              </Box>
            )
          }
          required
        />
      </Box>
      <PrimaryBtn
        disabled={disabled || isLoading}
        title={lang.register}
        btnStyle={styles.primaryBtn}
        onClick={() => RegisterMutation.mutate(registerPayload)}
      />
      <Typography sx={styles.textBtn} onClick={() => navigate("/login")}>
        {`${lang.al} ${lang.signin}`}
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
}
export default Register
