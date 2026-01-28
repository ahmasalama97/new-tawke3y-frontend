import { useContext } from "react"
import { Box } from "@mui/material"
import { LanguageContext } from "../../Contexts/LanguageContext"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"

const EditProfile = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#000" }}
          name={lang.user}
          type="text"
          value={props?.editProfilePayload.username}
          refState={(e) => {
            var temppayload = { ...props?.editProfilePayload }
            temppayload.username = e.target.value
            props?.setEditProfilePayload({ ...temppayload })
          }}
          helperText={lang.incorrectinput}
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
export default EditProfile
