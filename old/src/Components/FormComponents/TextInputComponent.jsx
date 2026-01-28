import { Button, InputLabel, TextField, Box } from "@mui/material"
import { useContext, useRef, useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { isNotEmpty } from "../Utils/helpers"

const TextInputComponent = ({
  name,
  value,
  refState,
  required,
  type,
  textStyle,
  ...props
}) => {
  const { lang, language } = useContext(LanguageContext)

  const placeHolder = name.replace("_", " ").toLowerCase()

  const textFieldRef = useRef()
  const [notvalidField, setNotValidField] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const regexText = /^([0-9a-zA-Z\u0600-\u06FF])/i
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/
  const regexNumber = /^([0-9\-+]){1,14}$/i
  const regexCode = /^([0-9\-+]){1,6}$/i
  const regexPhone = /^\d\d{10}$/g
  const regexMail = /\S+@\S+\.\w{2,}/
  const regexUrl =
    /^https?:\/\/(?:www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b[-a-zA-Z\d()@:%_+.~#?&/=]*$/g

  const [pass, setPass] = useState(true)
  const updateSecureTextEntry = () => {
    setPass(!pass)
  }

  const updateRefState = (e) => {
    const testFields = (condition) => {
      if (condition.test(textFieldRef.current.value)) {
        refState(e)
        setNotValidField(false)
      } else {
        setNotValidField(true)
      }
    }

    if (required) {
      switch (type) {
        case "text":
          testFields(regexText)
          break

        case "password":
          testFields(regexPassword)
          break

        case "number":
          testFields(regexNumber)
          break

        case "code":
          testFields(regexCode)
          break

        case "phone":
          testFields(regexPhone)
          break

        case "email":
          testFields(regexMail)
          break

        case "url":
          testFields(regexUrl)
          break

        default:
          enqueueSnackbar("wrong field type", { variant: "error" })
          break
      }
    } else {
      refState(e)
    }
  }

  useEffect(() => {
    if (isNotEmpty(value)) {
      textFieldRef.current.value = value
    }
  }, [value])

  return (
    <>
      <InputLabel
        htmlFor={name}
        sx={[
          styles.formInputLabel,
          required && language === "english" && styles.formInputLabelRequired,
          required && language === "arabic" && styles.formInputLabelRequiredAr,
          textStyle,
        ]}>
        {placeHolder}
      </InputLabel>

      <Box sx={styles.fieldConatiner}>
        <TextField
          id={name}
          sx={[styles.formField, notvalidField && styles.formFieldError]}
          placeholder={`${lang.Enter} ${placeHolder}`}
          inputRef={textFieldRef}
          onChange={updateRefState}
          helperText={props?.helperText}
          type={type === "password" && !pass ? "text" : type}
          {...props}
        />

        {type === "password" && (
          <Box
            sx={{
              ...styles.numberFieldBtns,
              ...{
                right: language === "english" && 10,
                left: language === "arabic" && 10,
              },
            }}>
            <Button onClick={updateSecureTextEntry}>
              {pass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </Button>
          </Box>
        )}
      </Box>
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
      marginTop: "7px",
      marginLeft: "5px",
      marginRight: "5px",
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
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
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
    paddingLeft: "18px",
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
  formInputLabelRequiredAr: {
    "&:after": {
      content: '"*"',
      color: "common.white",
      top: "1px",
      left: "2px",
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
      left: "0",
    },
  },

  formFieldError: {
    "& .MuiFormHelperText-root": {
      display: "flex",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "red !important",
    },
  },

  fieldConatiner: {
    position: "relative",
  },

  numberFieldBtns: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: 10,
    top: "12px",

    "& button:nth-of-type(1)": {
      borderTopRightRadius: "5px",
    },

    "& button:nth-of-type(2)": {
      borderBottomRightRadius: "5px",
    },

    "& button": {
      minWidth: "30px",
      maxHeight: "28px",
      borderRadius: 0,

      "& svg": {
        fontSize: "25px",
        color: "#333",
      },

      "&:hover": {
        "& svg": {
          color: "#333",
        },
      },
    },
  },
}

export default TextInputComponent
