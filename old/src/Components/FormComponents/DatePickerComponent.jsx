import { useContext, useRef } from "react"
import { InputLabel, Box } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import "dayjs/locale/ar"
import { LanguageContext } from "../../Contexts/LanguageContext"

const DatePickerComponent = ({
  name,
  refState,
  required,
  textStyle,
  value,
}) => {
  const { language } = useContext(LanguageContext)
  const placeHolder = name.replace("_", " ").toLowerCase()

  const textFieldRef = useRef()

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={language === "english" ? "en" : "ar"}>
        <InputLabel
          htmlFor={name}
          sx={[
            styles.formInputLabel,
            required && styles.formInputLabelRequired,
            textStyle,
          ]}>
          {placeHolder}
        </InputLabel>

        <Box sx={styles.fieldConatiner}>
          <MobileDatePicker
            localeText="ar"
            closeOnSelect
            inputRef={textFieldRef}
            sx={styles.formField}
            defaultValue={value}
            onChange={refState}
            helperText="Incorrect entry."
            disableFuture
            inputFormat="dd-MM-yyyy"
          />
        </Box>
      </LocalizationProvider>
    </>
  )
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  formField: {
    display: "flex",
    width: "100%",
    margin: "10px 0 20px 0",
    transition: "all 0.5s ease",
    textTransform: "capitalize",
    "& input::placeholder": {
      textTransform: "capitalize",
    },
    "& .MuiFormHelperText-root": {
      display: "none",
      color: "error.main",
      margin: "0",
      marginTop: "5px",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fafbfc",
      borderRadius: 20,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "solid 1px #e2e8ee",
      //   borderRadius: 20,
      transition: "all 0.3s ease-in-out",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "12px",
    },
    "& .MuiAlert-root": {
      width: "100%",
    },
  },

  formInputLabel: {
    display: "flex",
    alignItems: "center",
    transform: "translate(0,0) scale(1)",
    textTransform: "capitalize",
    color: "common.black",
    fontSize: "14px",
    width: "max-content",
    paddingLeft: "10px",
    paddingRight: "18px",
  },
  formInputLabelRequired: {
    "&:after": {
      content: '"*"',
      color: "common.white",
      top: "1px",
      right: "2px",
      position: "absolute",
      lineHeight: 1.2,
      fontFamily: "serif",
      fontSize: "17px",
      fontWeight: "900",
    },
    "&:before": {
      content: '" "',
      position: "absolute",
      width: "12px",
      height: "12px",
      backgroundColor: "#000",
      borderRadius: "50%",
      display: "inline-block",
      textAlign: "center",
      verticalAlign: "middle",
      top: "2px",
      right: "0",
    },
  },
  fieldConatiner: {
    position: "relative",
  },
}

export default DatePickerComponent
