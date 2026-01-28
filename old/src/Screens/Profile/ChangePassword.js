import { useContext } from "react"
import { Box, Typography } from "@mui/material"
import { LanguageContext } from "../../Contexts/LanguageContext"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"

const ChangePassword = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#000" }}
          name={lang.current}
          type="password"
          value={props?.changePasswordPayload.password}
          refState={(e) => {
            var temppayload = { ...props?.changePasswordPayload }
            temppayload.password = e.target.value
            props?.setChangePasswordPayload({ ...temppayload })
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
          textStyle={{ color: "#000" }}
          name={lang.new}
          type="password"
          value={props?.changePasswordPayload.newpassword}
          refState={(e) => {
            var temppayload = { ...props?.changePasswordPayload }
            temppayload.newpassword = e.target.value
            props?.setChangePasswordPayload({ ...temppayload })
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
          textStyle={{ color: "#000" }}
          name={lang.confirm}
          type="password"
          value={props?.changePasswordPayload.confirmpassword}
          refState={(e) => {
            var temppayload = { ...props?.changePasswordPayload }
            temppayload.confirmpassword = e.target.value
            props?.setChangePasswordPayload({ ...temppayload })
          }}
          helperText={
            props?.changePasswordPayload.newpassword !==
            props?.changePasswordPayload.confirmpassword ? (
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
    </>
  )
}
const styles = {
  textFieldContainer: {
    marginTop: 2,
  },
}
export default ChangePassword
