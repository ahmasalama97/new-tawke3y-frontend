import { Box } from "@mui/material"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import DatePickerComponent from "../../Components/FormComponents/DatePickerComponent"
import dayjs from "dayjs"
import moment from "moment"
import "moment/locale/ar"

const Step1 = (props) => {
  return (
    <>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={props?.lang.id}
          type="number"
          value={props?.completeProfilepayloadobjContext.idnumber}
          refState={(e) => {
            var temppayload = { ...props?.completeProfilepayloadobjContext }
            temppayload.idnumber = e.target.value
            props?.setCompleteProfilepayloadobjContext({ ...temppayload })
          }}
          helperText={
            props?.completeProfilepayloadobjContext.idnumber < 14
              ? props?.lang.idnumberformaterror
              : props?.completeProfilepayloadobjContext.idnumber > 14
              ? props?.lang.idnumberformaterror
              : null
          }
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={props?.lang.email}
          type="email"
          value={props?.email || ""}
          disabled
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={props?.lang.mothername}
          type="text"
          value={props?.completeProfilepayloadobjContext.mothername}
          refState={(e) => {
            var temppayload = { ...props?.completeProfilepayloadobjContext }
            temppayload.mothername = e.target.value
            props?.setCompleteProfilepayloadobjContext({ ...temppayload })
          }}
          helperText={props?.lang.incorrectinput}
          required
        />
      </Box>
      <Box sx={styles.textFieldContainer}>
        <DatePickerComponent
          textStyle={{ color: "#fff" }}
          name={props?.lang.birth}
          value={
            moment.locale("ar") &&
            moment(props?.completeProfilepayloadobjContext.birthdate).format(
              "LL",
            )
          }
          refState={(e) => {
            var temppayload = { ...props?.completeProfilepayloadobjContext }
            temppayload.birthdate = dayjs(e.$d).locale("ar")
            props?.setCompleteProfilepayloadobjContext({ ...temppayload })
          }}
          required
        />
      </Box>
    </>
  )
}

const styles = {
  textFieldContainer: {
    marginTop: 2,
    marginLeft: { xs: 1.5, md: 8, lg: 30 },
    marginRight: { xs: 1.5, md: 8, lg: 30 },
  },
}

export default Step1
