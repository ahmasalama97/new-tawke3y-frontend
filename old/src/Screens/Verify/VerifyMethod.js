import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import LogoImg from "../../assets/AppIcon.png"
import { LanguageContext } from "../../Contexts/LanguageContext"
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn"

const VerifyMethod = () => {
  const navigate = useNavigate()

  const { lang, language } = useContext(LanguageContext)

  return (
    <Box sx={styles.container}>
      <Box component="img" sx={styles.logoImage} alt="logo" src={LogoImg} />
      <Typography sx={styles.logoTitle}>{lang.forget}</Typography>
      <Box sx={styles.root}>
        <SecondaryBtn
          title={lang.withemail}
          onClick={() => {
            navigate("/forget-password")
          }}
          language={language}
        />
        <Box sx={styles.lineText}>
          <Box sx={styles.line} />
          <Box>
            <Typography sx={styles.text}>{lang.or}</Typography>
          </Box>
          <Box sx={styles.line} />
        </Box>
        <SecondaryBtn
          title={lang.withPhone}
          onClick={() => {
            navigate("/forget-password-phone")
          }}
          language={language}
        />
      </Box>
    </Box>
  )
}
const styles = {
  root: {
    position: "relative",
    padding: "20px 200px",
  },
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
  lineText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    display: "flex",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#fff",
    marginLeft: 1,
    marginRight: 1,
  },
  text: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
}
export default VerifyMethod
