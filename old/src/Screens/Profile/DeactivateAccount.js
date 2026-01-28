import { useContext } from "react"
import { Box, Typography } from "@mui/material"
import { LanguageContext } from "../../Contexts/LanguageContext"

const DeactivateAccount = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Box sx={styles.textFieldContainer}>
        <Typography sx={styles.deletedAccountConfirmation}>
          {lang.deletedAccountConfirmation}
        </Typography>
        <Typography sx={styles.deletedAccountSubConfirmation}>
          {lang.deletedAccountSubConfirmation}
        </Typography>
      </Box>
    </>
  )
}
const styles = {
  textFieldContainer: {
    marginTop: 2,
  },
  primaryBtnContainer: {
    marginTop: 5,
    justifyContent: "center",
    display: "flex",
  },
  primaryBtn: {
    textTransform: "capitalize",
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    height: "40px",
    color: "#fff",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#ff0000",
      borderColor: "#ff0000",
    },
  },
  deletedAccountConfirmation: {
    paddingBottom: 5,
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  deletedAccountSubConfirmation: {
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
    color: "#a9a9a9",
  },
}
export default DeactivateAccount
